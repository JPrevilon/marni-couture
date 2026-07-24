import type { MetadataRoute } from "next";
import { mockProducts } from "@/content/products";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collections/new-arrivals",
    "/cart",
    "/about",
    "/size-guide",
    "/shipping-returns",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.6,
    })),
    ...mockProducts.map((product) => ({
      url: `${siteConfig.url}/products/${product.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
