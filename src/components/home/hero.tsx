import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { ActionLink } from "@/components/ui/action-link";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__media" data-hero-media>
        <Image
          src="/media/hero/fabric-field.svg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__logo" data-hero-logo>
          <BrandLogo variant="primary" priority />
        </div>

        <div className="hero__copy" data-hero-copy>
          <p className="eyebrow">New arrivals · Online shopping</p>
          <h1>{siteConfig.campaign}</h1>
          <p>
            New pieces. Bold color. Built to be seen.
          </p>
        </div>

        <div className="hero__actions" data-hero-actions>
          <ActionLink href="#new-arrivals">
            Shop new arrivals
          </ActionLink>
          <ActionLink
            href={siteConfig.links.tiktok}
            variant="outline"
            external
          >
            Watch on TikTok
          </ActionLink>
        </div>
      </div>

      <aside className="hero__note" data-hero-note>
        <span>01</span>
        <p>
          A living storefront where product, image, and color move as
          one continuous runway.
        </p>
      </aside>

      <a className="hero__scroll" href="#new-arrivals">
        <span>Scroll to enter</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
