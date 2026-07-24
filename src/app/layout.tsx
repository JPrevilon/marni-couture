import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MARNI COUTURE — In Motion",
    template: "%s | MARNI COUTURE",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/brand/favicons/favicon.ico",
        sizes: "any",
      },
      {
        url: "/brand/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: "/brand/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "MARNI COUTURE — In Motion",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/brand/social/og-default-1200x630.png",
        width: 1200,
        height: 630,
        alt: "MARNI COUTURE — Bold color. Sculpted form. Made to move.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MARNI COUTURE — In Motion",
    description: siteConfig.description,
    images: ["/brand/social/twitter-card-1200x630.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07070A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
