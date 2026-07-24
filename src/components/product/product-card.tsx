"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ProductQuickView } from "@/components/product/product-quick-view";
import type { Product } from "@/content/products";
import { formatMoney } from "@/lib/money";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <article
        className="product-card"
        data-product-card
        style={
          {
            "--product-primary": product.palette.primary,
            "--product-secondary": product.palette.secondary,
          } as CSSProperties
        }
      >
        <Link
          href={`/products/${product.handle}`}
          className="product-card__image"
          aria-label={`View ${product.name}`}
          data-product-image
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 700px) 82vw, (max-width: 1100px) 44vw, 28vw"
          />
          <span className="product-card__badge">
            {product.badge ?? "New"}
          </span>
        </Link>

        <div className="product-card__body">
          <div>
            <h3>
              <Link href={`/products/${product.handle}`}>
                {product.name}
              </Link>
            </h3>
            <p>{product.shortDescription}</p>
          </div>
          <strong>{formatMoney(product.price)}</strong>
        </div>

        <div className="product-card__actions">
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
          >
            Quick view
          </button>
          <Link href={`/products/${product.handle}`}>
            Details <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>

      <ProductQuickView
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
