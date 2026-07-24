import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MARNI COUTURE.",
};

export default function ContactPage() {
  return (
    <UtilityPage
      eyebrow="Customer care"
      title="Contact"
      intro="A public customer-service channel must be confirmed before launch."
      notice="The private asset-transfer email supplied during discovery is intentionally not published here."
    >
      <section>
        <h2>Public contact placeholder</h2>
        <p>
          Replace this block with a client-owned customer-service email,
          contact form, expected response time, and business mailing
          information where legally required.
        </p>
      </section>
      <section>
        <h2>Social</h2>
        <p>
          TikTok:{" "}
          <a
            href="https://www.tiktok.com/@marnimarnni"
            target="_blank"
            rel="noreferrer"
          >
            @marnimarnni
          </a>
        </p>
      </section>
    </UtilityPage>
  );
}
