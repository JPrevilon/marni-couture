# MARNI COUTURE Storefront Framework

A responsive Next.js storefront framework for an immersive, one-page fashion experience with supporting product, collection, cart, and policy routes.

The included build runs with mock products. Shopify integration files are already scaffolded and become active after the required environment variables and Codex integration steps are completed.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- GSAP + ScrollTrigger
- Native CSS with design tokens
- Shopify Storefront API scaffold
- Vercel-ready deployment structure

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run typecheck
npm run lint
npm run build
```

## Important folders

```text
public/brand/                  Production logo, favicon, profile, and social-preview assets
public/media/                  Abstract placeholder art; replace with approved product media
public/social/                 TikTok URL manifest
src/app/                       App Router pages and metadata
src/components/home/           One-page homepage sections
src/components/cart/           Local preview cart and drawer
src/components/product/        Product cards, quick view, and detail UI
src/content/                   Mock products, runway looks, social links, and site configuration
src/lib/shopify/               Storefront API client, queries, types, and mapping
docs/                          Framework, content, Shopify, and deployment instructions
```

## Current preview behavior

- The homepage is fully navigable and responsive.
- Scroll-driven effects use GSAP and disable themselves for reduced-motion users.
- Products come from `src/content/products.ts` unless Shopify is configured.
- The cart is a local preview cart. A later Codex prompt upgrades it to a Shopify cart.
- Newsletter submission uses a safe stub route and does not subscribe anyone to an external service.
- Instagram and Snapchat links remain hidden until URLs are supplied.
- Shipping, returns, privacy, and terms pages are clearly marked as drafts where information is missing.

## Brand assets

The default text-message and social-link preview image is:

```text
public/brand/social/og-default-1200x630.png
```

The default favicon is:

```text
public/brand/favicons/favicon.ico
```

The navigation logo is:

```text
public/brand/wordmarks/marni-couture-header-transparent.png
```

## Before public launch

Do not enable public sales until product data, original media, inventory, shipping, returns, customer-service contact information, taxes, and account ownership are confirmed.

Use the sequential prompts in the launch kit's `03-codex-prompts` folder. Run one prompt at a time.
