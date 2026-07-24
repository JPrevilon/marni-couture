import {
  findMockProduct,
  mockProducts,
  type Product,
  type ProductStatus,
} from "@/content/products";
import { isShopifyConfigured, shopifyFetch } from "@/lib/shopify/client";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "@/lib/shopify/queries";
import type {
  ShopifyProductNode,
  ShopifyProductResponse,
  ShopifyProductsResponse,
} from "@/lib/shopify/types";

function optionValues(
  product: ShopifyProductNode,
  optionName: string,
): string[] {
  const option = product.options.find(
    (candidate) =>
      candidate.name.toLowerCase() === optionName.toLowerCase(),
  );

  if (!option) return [];

  const values =
    option.optionValues?.map((value) => value.name) ??
    option.values ??
    [];

  return values.filter(Boolean);
}

function statusFor(product: ShopifyProductNode): ProductStatus {
  if (!product.availableForSale) return "sold-out";
  if (product.tags.some((tag) => tag.toLowerCase() === "preorder")) {
    return "preorder";
  }
  if (product.tags.some((tag) => tag.toLowerCase() === "low-stock")) {
    return "low-stock";
  }
  return "available";
}

function toProduct(product: ShopifyProductNode): Product {
  const colors = optionValues(product, "Color");
  const sizes = optionValues(product, "Size");
  const variantIds: Record<string, string> = {};

  for (const variant of product.variants.nodes) {
    const key = variant.selectedOptions
      .map(({ name, value }) => `${name}:${value}`)
      .sort()
      .join("|");
    variantIds[key] = variant.id;
  }

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    price: Number(product.priceRange.minVariantPrice.amount),
    currency: product.priceRange.minVariantPrice.currencyCode,
    status: statusFor(product),
    badge: product.tags.find((tag) =>
      ["new", "limited", "preorder", "low-stock"].includes(
        tag.toLowerCase(),
      ),
    ),
    colors: colors.length ? colors : ["Default"],
    sizes: sizes.length ? sizes : ["One size"],
    image:
      product.featuredImage?.url ??
      product.images.nodes[0]?.url ??
      "/media/products/chromatic-sculpt-dress.svg",
    hoverImage: product.images.nodes[1]?.url,
    shortDescription:
      product.description.slice(0, 116) ||
      "A new MARNI COUTURE piece.",
    description:
      product.description ||
      "Product description is being finalized.",
    details: product.tags.length ? product.tags : ["Product details coming soon"],
    care: ["Care instructions coming soon"],
    palette: { primary: "#FF2F9A", secondary: "#824CFF" },
    featured: true,
    placeholder: false,
    shopifyProductId: product.id,
    shopifyVariantIds: variantIds,
  };
}

export async function getProducts(limit = 20): Promise<Product[]> {
  if (!isShopifyConfigured) return mockProducts;

  try {
    const data = await shopifyFetch<
      ShopifyProductsResponse,
      { first: number }
    >({
      query: PRODUCTS_QUERY,
      variables: { first: limit },
      tags: ["products"],
      revalidate: 60,
    });

    return data.products.nodes.map(toProduct);
  } catch (error) {
    console.error("Falling back to mock products:", error);
    return mockProducts;
  }
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | undefined> {
  if (!isShopifyConfigured) return findMockProduct(handle);

  try {
    const data = await shopifyFetch<
      ShopifyProductResponse,
      { handle: string }
    >({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      tags: [`product:${handle}`],
      revalidate: 60,
    });

    return data.product ? toProduct(data.product) : undefined;
  } catch (error) {
    console.error(`Falling back to mock product ${handle}:`, error);
    return findMockProduct(handle);
  }
}
