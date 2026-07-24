import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Draft privacy notice for the storefront.",
};

export default function PrivacyPage() {
  return (
    <UtilityPage
      eyebrow="Legal"
      title="Privacy notice"
      notice="This is an implementation checklist, not a final privacy policy or legal advice. Replace it with a jurisdiction-appropriate policy before collecting production customer data."
    >
      <section>
        <h2>The final notice should explain</h2>
        <ul>
          <li>What personal information the business collects</li>
          <li>Why it is collected and the lawful basis where applicable</li>
          <li>Shopify, payment, email, analytics, and advertising providers</li>
          <li>Cookies, pixels, consent choices, and opt-out methods</li>
          <li>Retention, security, and customer rights</li>
          <li>Contact information and policy effective date</li>
        </ul>
      </section>
    </UtilityPage>
  );
}
