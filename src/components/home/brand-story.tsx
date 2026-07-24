import { BrandLogo } from "@/components/brand-logo";
import { Marquee } from "@/components/ui/marquee";

export function BrandStory() {
  return (
    <section className="brand-story" id="about">
      <Marquee
        items={[
          "Bold color",
          "Sculpted form",
          "Made to move",
          "New arrivals",
        ]}
      />

      <div className="brand-story__inner">
        <div className="brand-story__mark" data-reveal>
          <BrandLogo variant="monogram" />
        </div>

        <div className="brand-story__copy" data-reveal>
          <p className="eyebrow">Made by Marni</p>
          <h2>
            Statement pieces for people who do not dress to disappear.
          </h2>
          <p>
            This temporary brand statement holds the space for the
            designer&apos;s approved story. The final section can pair
            studio footage, fabric selection, fittings, styling, and
            packing with a concise biography when supplied.
          </p>
        </div>
      </div>
    </section>
  );
}
