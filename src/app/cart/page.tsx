import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review selected MARNI COUTURE pieces.",
};

export default function CartRoute() {
  return (
    <main className="utility-page">
      <div className="utility-page__inner">
        <CartPage />
      </div>
    </main>
  );
}
