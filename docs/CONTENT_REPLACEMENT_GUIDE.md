# Content Replacement Guide

## Replace before public launch

### Product catalog

Edit or replace `src/content/products.ts` only for preview work. Production products should come from Shopify.

Required per product:

- Confirmed title and handle
- SKU
- Price and currency
- Sizes and colors
- Inventory or preorder status
- Original product images
- Original product video
- Materials
- Care instructions
- Fit notes and garment measurements
- Weight and shipping data
- Return eligibility
- Ready-to-ship, preorder, or made-to-order timing

### Hero media

Replace:

```text
public/media/hero/fabric-field.svg
```

with an optimized campaign poster image, silent loop, or layered original product media. Retain a lightweight fallback and a poster frame.

### Product placeholder art

Replace files under:

```text
public/media/products/
```

The included art is abstract concept imagery and must not be represented as actual merchandise.

### Detail Lab

Replace:

```text
public/media/details/
```

with close-up photography or short video showing real fabric, seams, finishes, closures, embellishment, and movement.

### TikTok

The URL manifest is:

```text
public/social/tiktok-content-manifest.json
```

Use the URLs to select posts and drive traffic. For the website:

1. Prefer original client-owned files.
2. Use official TikTok embeds only where useful.
3. Do not scrape or remove watermarks.
4. Do not autoplay several social videos at once.
5. Pause video when off screen.
6. Obtain permission for customer or creator content.

### Brand story

Replace the temporary statement in:

```text
src/components/home/brand-story.tsx
src/app/about/page.tsx
```

Do not invent biography details.

### Social URLs

Add Instagram and Snapchat URLs in `.env.local` after the client-owned accounts are created.

### Shipping and returns

Replace all draft content in:

```text
src/app/shipping-returns/page.tsx
```

before enabling checkout.

### Customer-service contact

Replace the placeholder in:

```text
src/app/contact/page.tsx
```

with a client-owned public contact channel. The private asset-transfer email should not be exposed unless the client explicitly approves it.

### Legal content

The privacy and terms pages are checklists, not final legal documents. Replace them with appropriate policies before collecting production data or accepting orders.
