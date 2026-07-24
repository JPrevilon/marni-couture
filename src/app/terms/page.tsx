import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Draft terms checklist for MARNI COUTURE.",
};

export default function TermsPage() {
  return (
    <UtilityPage
      eyebrow="Legal"
      title="Terms of service"
      notice="This is a drafting checklist, not final legal terms. Replace it with counsel-approved or platform-generated terms appropriate to the business."
    >
      <section>
        <h2>The final terms should cover</h2>
        <ul>
          <li>Eligibility and acceptance of terms</li>
          <li>Product descriptions, availability, and pricing</li>
          <li>Orders, payment, cancellation, and suspected fraud</li>
          <li>Made-to-order, preorder, and custom garment rules</li>
          <li>Shipping, returns, refunds, and exchanges</li>
          <li>Intellectual property and acceptable site use</li>
          <li>Warranty disclaimers, liability, and dispute process</li>
          <li>Governing law and business contact information</li>
        </ul>
      </section>
    </UtilityPage>
  );
}
