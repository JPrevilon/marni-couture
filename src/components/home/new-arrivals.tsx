import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/content/products";

export function NewArrivals({
  products,
}: {
  products: Product[];
}) {
  return (
    <section
      className="new-arrivals section-shell"
      id="new-arrivals"
    >
      <div className="section-shell__inner">
        <SectionHeading
          eyebrow="New products"
          title="Shop before the feed catches up."
          body="The current catalog entries are structured preview products. Replace them with the confirmed Shopify catalog and original garment media before launch."
        />

        <div className="new-arrivals__rail">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
