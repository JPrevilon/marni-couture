import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/content/products";

export function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
