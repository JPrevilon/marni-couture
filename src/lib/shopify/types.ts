import type { Product } from "@/content/products";

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyOption = {
  name: string;
  optionValues?: Array<{
    name: string;
  }>;
  values?: string[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: ShopifyMoney;
};

export type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: {
    nodes: ShopifyImage[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  options: ShopifyOption[];
  variants: {
    nodes: ShopifyVariant[];
  };
  tags: string[];
};

export type ShopifyProductsResponse = {
  products: {
    nodes: ShopifyProductNode[];
  };
};

export type ShopifyProductResponse = {
  product: ShopifyProductNode | null;
};

export type CommerceProduct = Product;
