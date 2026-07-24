# MARNI COUTURE Framework Specification

## Experience goal

The homepage behaves like a continuous digital runway rather than a standard catalog. Scroll progress coordinates image depth, typography, chapter color, and product reveal while preserving normal browser scrolling and stable shopping controls.

## Page architecture

```text
Global header
├── Hero — MARNI IN MOTION
├── New Arrivals
├── Living Runway
├── Shop the Look
├── Detail Lab
├── Brand Story
├── Social Showroom
└── Drop Club
Global footer
```

Supporting routes:

```text
/products/[handle]
/collections/new-arrivals
/cart
/about
/size-guide
/shipping-returns
/contact
/privacy
/terms
```

## Component map

| Experience | Main component |
|---|---|
| Motion coordination | `src/components/home/home-experience.tsx` |
| Hero | `src/components/home/hero.tsx` |
| Product rail | `src/components/home/new-arrivals.tsx` |
| Pinned runway | `src/components/home/living-runway.tsx` |
| Featured commerce panel | `src/components/home/shop-the-look.tsx` |
| Macro media | `src/components/home/detail-lab.tsx` |
| Temporary brand story | `src/components/home/brand-story.tsx` |
| TikTok references | `src/components/home/social-showroom.tsx` |
| Email capture | `src/components/home/drop-club.tsx` |
| Product UI | `src/components/product/*` |
| Preview cart | `src/components/cart/*` |
| Shopify adapter | `src/lib/shopify/*` |

## Motion model

The base implementation uses GSAP and ScrollTrigger for:

- Hero entrance and depth movement.
- Section reveal animations.
- Three chromatic background trails.
- Desktop pinned runway transitions.
- Mobile reveal fallbacks.

Rules:

- Do not add wheel or touch interception.
- Do not use a custom smooth-scroll library without a demonstrated need.
- Do not animate essential form controls during interaction.
- Keep all content available when JavaScript or animation is unavailable.
- Respect `prefers-reduced-motion`.

## Design tokens

Core tokens are defined at the top of `src/app/globals.css`.

```css
--void: #07070a;
--cream: #fdfaf7;
--soft-white: #f7f4f7;
--pink: #e97e9a;
--pink-hot: #ff2f9a;
--pink-dark: #e05b80;
--yellow: #f1ff3d;
--green: #4cff78;
--violet: #824cff;
--blue: #2779ff;
```

The logo itself should come from `public/brand`; do not recreate it as styled text.

## Product source strategy

`getProducts()` and `getProductByHandle()` in `src/lib/shopify/products.ts` automatically return mock products when Shopify environment variables are blank. Once Shopify is configured, they query the Storefront API and fall back to mocks if an error occurs.

Mock products are clearly marked as placeholders in `src/content/products.ts`.

## Link preview and favicon

Root metadata in `src/app/layout.tsx` uses:

```text
/brand/social/og-default-1200x630.png
/brand/favicons/favicon.ico
/brand/favicons/apple-touch-icon.png
```

After deployment, `NEXT_PUBLIC_SITE_URL` must be the final HTTPS domain so messaging and social platforms can resolve an absolute preview image URL.

## Accessibility baseline

- Semantic headings and landmarks.
- Skip link.
- Visible focus styles.
- Native buttons and links.
- Keyboard-closeable modal and cart drawer.
- Reduced-motion fallback.
- Form labels and status messages.
- Draft policy content remains readable without animation.

The final QA prompt expands focus management, testing, contrast review, and assistive-technology checks.
