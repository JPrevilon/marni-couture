import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const socialLinks = [
    { label: "TikTok", href: siteConfig.links.tiktok },
    { label: "Instagram", href: siteConfig.links.instagram },
    { label: "Snapchat", href: siteConfig.links.snapchat },
  ].filter((link) => Boolean(link.href));

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <BrandLogo variant="header" />
        <p>{siteConfig.tagline}</p>
      </div>

      <div className="site-footer__links">
        <div>
          <p>Shop</p>
          <Link href="/collections/new-arrivals">
            New arrivals
          </Link>
          <Link href="/size-guide">Size guide</Link>
          <Link href="/shipping-returns">
            Shipping & returns
          </Link>
        </div>
        <div>
          <p>Brand</p>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <div>
          <p>Legal</p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} MARNI COUTURE</span>
        <span>Storefront framework · Preview content</span>
      </div>
    </footer>
  );
}
