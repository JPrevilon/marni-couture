"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/content/products";
import { formatMoney } from "@/lib/money";

export function ShopTheLook({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const { addItem } = useCart();

  return (
    <section className="shop-look section-shell">
      <div className="shop-look__inner section-shell__inner">
        <div className="shop-look__visual" data-reveal>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className="shop-look__stamp" aria-hidden="true">
            <span>M</span>
            <small>IN MOTION</small>
          </div>
        </div>

        <div className="shop-look__panel" data-reveal>
          <p className="eyebrow">Shop the look</p>
          <h2>{product.name}</h2>
          <p className="shop-look__price">
            {formatMoney(product.price)}
          </p>
          <p>{product.shortDescription}</p>

          <fieldset className="option-group">
            <legend>Color</legend>
            <div>
              {product.colors.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={color === value}
                  onClick={() => setColor(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="option-group">
            <legend>Size</legend>
            <div>
              {product.sizes.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={size === value}
                  onClick={() => setSize(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            className="action-link action-link--solid"
            type="button"
            disabled={product.status === "sold-out"}
            onClick={() => addItem(product, { color, size })}
          >
            Add to preview bag
          </button>

          <Link
            href={`/products/${product.handle}`}
            className="text-link"
          >
            Full product details →
          </Link>
        </div>
      </div>
    </section>
  );
}
