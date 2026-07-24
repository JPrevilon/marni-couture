"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCart } from "@/components/cart/cart-provider";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="site-header">
      <Link
        href="/"
        className="site-header__brand"
        aria-label="MARNI COUTURE home"
        onClick={() => setMenuOpen(false)}
      >
        <BrandLogo variant="header" priority />
      </Link>

      <nav
        className="site-header__nav"
        aria-label="Primary navigation"
        data-open={menuOpen}
      >
        {siteConfig.navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a
          href={siteConfig.links.tiktok}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          TikTok ↗
        </a>
      </nav>

      <div className="site-header__actions">
        <button
          type="button"
          className="site-header__bag"
          onClick={toggleCart}
          aria-label={`Open shopping bag with ${itemCount} items`}
        >
          Bag <span>{itemCount}</span>
        </button>
        <button
          type="button"
          className="site-header__menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
