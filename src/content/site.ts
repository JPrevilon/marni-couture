export const siteConfig = {
  name: "MARNI COUTURE",
  shortName: "MARNI",
  campaign: "MARNI IN MOTION",
  tagline: "Bold color. Sculpted form. Made to move.",
  description:
    "A social-first fashion storefront for statement pieces, bold color, and new arrivals in motion.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL ??
      "https://www.tiktok.com/@marnimarnni",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    snapchat: process.env.NEXT_PUBLIC_SNAPCHAT_URL ?? "",
  },
  navigation: [
    { label: "New Arrivals", href: "/#new-arrivals" },
    { label: "Runway", href: "/#runway" },
    { label: "Details", href: "/#detail-lab" },
    { label: "Social", href: "/#social-showroom" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
