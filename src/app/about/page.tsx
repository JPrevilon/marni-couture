import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "About",
  description: "The working MARNI COUTURE brand statement.",
};

export default function AboutPage() {
  return (
    <UtilityPage
      eyebrow="About the brand"
      title="Made to move."
      intro="A temporary brand statement is in place until the designer supplies and approves a biography."
      notice="Do not invent personal history, credentials, locations, or milestones. Replace this page with approved first-person or third-person biography content."
    >
      <section>
        <h2>Working statement</h2>
        <p>
          MARNI COUTURE creates statement pieces for people who do not
          dress to disappear. This space follows the work from
          mannequin to motion, from first detail to final look.
        </p>
      </section>
      <section>
        <h2>What to add later</h2>
        <ul>
          <li>Designer name and approved biography</li>
          <li>Studio location or service region</li>
          <li>Design process and material philosophy</li>
          <li>Founder portrait and studio photography</li>
          <li>Press, events, or milestones with verified dates</li>
        </ul>
      </section>
    </UtilityPage>
  );
}
