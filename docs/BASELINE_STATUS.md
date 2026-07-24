# Baseline Status

**Date:** July 23, 2026

## Runtime

- Node.js: `v20.19.6` (satisfies the declared `>=20.9.0` engine)
- npm: `10.8.2`
- Package manager: npm
- Deterministic lockfile: `package-lock.json`

## Commands run

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm start -- -p 3107
```

The required verification commands were run with Shopify environment variables
explicitly blank. HTTP smoke tests covered the homepage, collection, concept
product, cart, about, size guide, shipping and returns, contact, privacy, and
terms routes. The newsletter endpoint was tested with invalid and valid preview
addresses.

## Build result

Type checking, linting, and the production build pass. All required routes build
and return HTTP 200 in the production server. With Shopify unconfigured, the
server uses the clearly labeled mock catalog. The Shopify client is server-only,
and its access-token variable and request header are absent from client bundles.
The newsletter route rejects malformed email addresses and only acknowledges a
preview signup; it does not claim to subscribe users through a real provider.

## Known blockers requiring client information

- Approved product catalog, prices, variants, inventory, materials, care, fit,
  fulfillment timing, and original product media
- Client-owned Shopify store access and Storefront API configuration
- Public customer-service contact details
- Approved shipping, return, exchange, privacy, and terms policies
- Final designer biography and approved brand-story content
- Final domain plus confirmed Instagram and Snapchat URLs
- Approved email provider, analytics ownership, consent requirements, and
  marketing-platform configuration
