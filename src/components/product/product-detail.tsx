"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/content/products";
import { formatMoney } from "@/lib/money";

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const { addItem } = useCart();
  const soldOut = product.status === "sold-out";

  return (
    <div className="product-detail">
      <div className="product-detail__gallery">
        <div className="product-detail__image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
          />
        </div>
      </div>

      <div className="product-detail__info">
        <p className="eyebrow">
          {product.badge ?? "MARNI COUTURE"}
        </p>
        <h1>{product.name}</h1>
        <p className="product-detail__price">
          {formatMoney(product.price)}
        </p>
        <p className="product-detail__description">
          {product.description}
        </p>

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
          type="button"
          className="action-link action-link--solid product-detail__add"
          disabled={soldOut}
          onClick={() => addItem(product, { color, size })}
        >
          {soldOut ? "Sold out" : "Add to preview bag"}
        </button>

        <div className="product-detail__accordions">
          <details open>
            <summary>Details</summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Care</summary>
            <ul>
              {product.care.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>Shipping and returns</summary>
            <p>
              Shipping regions, rates, fulfillment timing, and return
              eligibility are not yet approved. Do not enable public
              checkout until this information is supplied.
            </p>
          </details>
        </div>

        {product.placeholder ? (
          <p className="placeholder-note">
            This is a concept product used to demonstrate the
            storefront. It is not a confirmed client product.
          </p>
        ) : null}
      </div>
    </div>
  );
}
