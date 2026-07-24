import { HomeExperience } from "@/components/home/home-experience";
import { getProducts } from "@/lib/shopify/products";

export default async function HomePage() {
  const products = await getProducts(8);

  return <HomeExperience products={products} />;
}
