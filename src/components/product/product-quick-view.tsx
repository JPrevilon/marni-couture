"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Modal } from "@/components/ui/modal";
import type { Product } from "@/content/products";
import { formatMoney } from "@/lib/money";

type ProductQuickViewProps = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

export function ProductQuickView({
  product,
  open,
  onClose,
}: ProductQuickViewProps) {
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const { addItem } = useCart();

  const unavailable = product.status === "sold-out";
  const statusLabel = useMemo(() => {
    if (product.status === "low-stock") return "Low stock preview";
    if (product.status === "preorder") return "Preorder preview";
    if (product.status === "sold-out") return "Sold out preview";
    return "Available preview";
  }, [product.status]);

  return (
    <Modal open={open} title={product.name} onClose={onClose}>
      <div className="quick-view">
        <div className="quick-view__image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
          />
        </div>
        <div className="quick-view__content">
          <div>
            <p className="eyebrow">{statusLabel}</p>
            <p className="quick-view__price">
              {formatMoney(product.price)}
            </p>
            <p>{product.shortDescription}</p>
          </div>

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
            className="action-link action-link--solid"
            disabled={unavailable}
            onClick={() => {
              addItem(product, { color, size });
              onClose();
            }}
          >
            {unavailable ? "Sold out" : "Add to preview bag"}
          </button>

          <Link
            href={`/products/${product.handle}`}
            className="text-link"
            onClick={onClose}
          >
            View full product details →
          </Link>

          {product.placeholder ? (
            <p className="placeholder-note">
              Concept content only. Replace with approved merchandise
              before launch.
            </p>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
