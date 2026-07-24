# Shopify Setup

The framework can display mock products without Shopify. Complete the following steps to connect the production catalog.

## 1. Create the client-owned store

The client should own the Shopify organization, store, billing, recovery email, domain settings, and primary administrator account. Development access should be delegated.

## 2. Configure products

Create products, variants, images, prices, inventory, weights, tags, and policies in Shopify.

Useful tags recognized by the current mapper:

```text
new
limited
preorder
low-stock
```

## 3. Create a Storefront API token

Create the appropriate Storefront API access and copy the public storefront access token into `.env.local`.

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=replace_me
SHOPIFY_STOREFRONT_API_VERSION=2026-07
```

Do not prefix the token variable with `NEXT_PUBLIC_`.

## 4. Test product queries

The files involved are:

```text
src/lib/shopify/client.ts
src/lib/shopify/queries.ts
src/lib/shopify/products.ts
src/lib/shopify/types.ts
```

Run the product-integration Codex prompt. Confirm that:

- Real products replace concept products.
- Remote Shopify images render.
- Size and color values map correctly.
- Sold-out and preorder states are accurate.
- Product URLs resolve by handle.
- No token appears in the browser bundle.

## 5. Upgrade the preview cart

The included cart uses local state and localStorage. The Shopify cart Codex prompt should add:

- `cartCreate`
- `cartLinesAdd`
- `cartLinesUpdate`
- `cartLinesRemove`
- Cart retrieval
- Checkout URL
- Error and stale-cart handling
- Variant mapping based on selected options

## 6. Configure checkout

In Shopify, confirm:

- Payments
- Taxes
- Shipping zones and rates
- Fulfillment locations
- Notification templates
- Refund permissions
- Customer contact details
- Domain and checkout branding

## 7. Test

Use Shopify test mode and complete full test orders on mobile and desktop before public launch.
