"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatMoney } from "@/lib/money";

export function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeCart, isOpen]);

  return (
    <div
      className="cart-drawer-shell"
      data-open={isOpen}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="cart-drawer-shell__backdrop"
        aria-label="Close cart"
        onClick={closeCart}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <header className="cart-drawer__header">
          <div>
            <p className="eyebrow">Preview cart</p>
            <h2>Your bag</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close cart"
            onClick={closeCart}
          >
            ×
          </button>
        </header>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Your bag is waiting for a statement piece.</p>
              <button
                type="button"
                className="action-link action-link--outline"
                onClick={closeCart}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="cart-lines">
              {items.map((item) => (
                <li key={item.key} className="cart-line">
                  <div className="cart-line__image">
                    <Image
                      src={item.product.image}
                      alt=""
                      fill
                      sizes="110px"
                    />
                  </div>
                  <div className="cart-line__details">
                    <Link
                      href={`/products/${item.product.handle}`}
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>
                    <p>
                      {item.color} · {item.size}
                    </p>
                    <div className="quantity-control">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.product.name} quantity`}
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.product.name} quantity`}
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-line__aside">
                    <strong>
                      {formatMoney(
                        item.product.price * item.quantity,
                      )}
                    </strong>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="cart-drawer__footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <p className="fine-print">
            This framework uses a local preview cart. Shopify checkout
            is activated in the commerce Codex step.
          </p>
          <Link
            href="/cart"
            className="action-link action-link--solid"
            onClick={closeCart}
          >
            Review bag
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </aside>
    </div>
  );
}
