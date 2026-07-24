import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { mockProducts } from "@/content/products";
import { siteConfig } from "@/content/site";
import { getProductByHandle } from "@/lib/shopify/products";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | MARNI COUTURE`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: [
      product.image.startsWith("http")
        ? product.image
        : `${siteConfig.url}${product.image}`,
    ],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.status === "sold-out"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.handle}`,
    },
  };

  return (
    <main className="product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ProductDetail product={product} />
    </main>
  );
}
