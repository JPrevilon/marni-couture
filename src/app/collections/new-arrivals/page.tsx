import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { UtilityPage } from "@/components/utility-page";
import { getProducts } from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "Explore the latest MARNI COUTURE preview collection.",
};

export default async function NewArrivalsPage() {
  const products = await getProducts(24);

  return (
    <UtilityPage
      eyebrow="Collection"
      title="New arrivals"
      intro="The framework currently displays concept products until the approved Shopify catalog is connected."
    >
      <ProductGrid products={products} />
    </UtilityPage>
  );
}
