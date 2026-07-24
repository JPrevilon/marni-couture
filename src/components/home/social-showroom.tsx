import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { tiktokReferences } from "@/content/social";
import { siteConfig } from "@/content/site";

export function SocialShowroom() {
  return (
    <section
      className="social-showroom section-shell"
      id="social-showroom"
    >
      <div className="section-shell__inner">
        <SectionHeading
          eyebrow="@marnimarnni"
          title="The feed becomes the showroom."
          body="The supplied TikTok links are preserved as references and outbound traffic drivers. Replace the abstract poster treatment with approved original media or official embeds."
        />

        <div className="social-showroom__grid">
          {tiktokReferences.map((reference, index) => (
            <a
              key={reference.id}
              href={reference.url}
              target="_blank"
              rel="noreferrer"
              className="social-card"
              style={
                {
                  "--social-accent": reference.accent,
                } as CSSProperties
              }
              data-reveal
            >
              <div className="social-card__screen">
                <span className="social-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="social-card__signal">
                  <i />
                  <i />
                  <i />
                </div>
                <p>{reference.type}</p>
                <strong>{reference.id}</strong>
              </div>
              <div className="social-card__footer">
                <span>{reference.label}</span>
                <span aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>

        <div className="social-showroom__cta" data-reveal>
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noreferrer"
            className="action-link action-link--outline"
          >
            Follow on TikTok <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
