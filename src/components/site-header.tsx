"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useCart } from "@/components/cart/cart-provider";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
        id="primary-navigation"
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
          ref={menuButton}
          type="button"
          className="site-header__menu"
          aria-controls="primary-navigation"
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
