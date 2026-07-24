import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Draft shipping and returns information.",
};

export default function ShippingReturnsPage() {
  return (
    <UtilityPage
      eyebrow="Customer care"
      title="Shipping & returns"
      intro="Shipping and return rules are not yet confirmed."
      notice="Public checkout must stay disabled until service regions, rates, processing times, carrier options, return windows, exchanges, final-sale rules, and made-to-order policies are approved."
    >
      <section>
        <h2>Shipping information required</h2>
        <ul>
          <li>Countries, states, or regions served</li>
          <li>Processing and fulfillment time</li>
          <li>Ready-to-ship versus made-to-order timing</li>
          <li>Rates, free-shipping threshold, and carriers</li>
          <li>Tracking, address changes, and lost packages</li>
          <li>Duties and taxes for international orders</li>
        </ul>
      </section>
      <section>
        <h2>Return information required</h2>
        <ul>
          <li>Return or exchange window</li>
          <li>Condition requirements</li>
          <li>Who pays return shipping</li>
          <li>Final-sale and custom-item exclusions</li>
          <li>Refund timing and original-shipping treatment</li>
        </ul>
      </section>
    </UtilityPage>
  );
}
