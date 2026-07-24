"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatMoney } from "@/lib/money";

export function CartPage() {
  const {
    items,
    subtotal,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!items.length) {
    return (
      <div className="utility-card utility-card--center">
        <p className="eyebrow">Shopping bag</p>
        <h1>Your bag is empty.</h1>
        <p>
          Explore the preview collection and add a look to test the
          storefront flow.
        </p>
        <Link href="/#new-arrivals" className="action-link action-link--solid">
          Shop new arrivals
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-layout">
      <section>
        <div className="utility-page__heading">
          <p className="eyebrow">Shopping bag</p>
          <h1>Your selected looks</h1>
        </div>
        <ul className="cart-page-lines">
          {items.map((item) => (
            <li key={item.key}>
              <div className="cart-page-line__image">
                <Image
                  src={item.product.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100px, 180px"
                />
              </div>
              <div className="cart-page-line__body">
                <Link href={`/products/${item.product.handle}`}>
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
                      updateQuantity(item.key, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.product.name} quantity`}
                    onClick={() =>
                      updateQuantity(item.key, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-page-line__aside">
                <strong>
                  {formatMoney(item.product.price * item.quantity)}
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
      </section>

      <aside className="order-summary">
        <p className="eyebrow">Summary</p>
        <div>
          <span>Subtotal</span>
          <strong>{formatMoney(subtotal)}</strong>
        </div>
        <p>
          Taxes, shipping, and final checkout are configured through
          Shopify during the commerce integration step.
        </p>
        <button
          className="action-link action-link--solid"
          type="button"
          disabled
        >
          Shopify checkout pending
        </button>
        <button
          className="text-button"
          type="button"
          onClick={clearCart}
        >
          Clear preview cart
        </button>
      </aside>
    </div>
  );
}
