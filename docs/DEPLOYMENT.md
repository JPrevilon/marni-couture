# Deployment Guide

## Recommended ownership

The client should own:

- GitHub repository or final code archive
- Vercel team and project
- Domain registrar and DNS
- Shopify owner account
- Analytics and advertising accounts
- Recovery email and phone number

Developers should receive delegated access.

## Vercel

1. Push `02-site-framework` to a new repository.
2. Import the repository into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy a preview.
5. Confirm the preview URL.
6. Run the final QA prompt.
7. Connect the production domain only after checkout and policies are ready.

## Required production environment variables

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN
SHOPIFY_STOREFRONT_API_VERSION
NEXT_PUBLIC_TIKTOK_URL
NEXT_PUBLIC_INSTAGRAM_URL
NEXT_PUBLIC_SNAPCHAT_URL
```

Add analytics identifiers only after the privacy and consent implementation is approved.

## Link-preview testing

After the public HTTPS domain is live:

- Confirm `og:image` resolves publicly.
- Confirm the image is 1200 × 630.
- Test by sending the URL in a text message.
- Test on iMessage, WhatsApp, Facebook, and LinkedIn where relevant.
- Remember that platforms cache previews; use their official refresh/debug tools after changing metadata.

## Launch gate

Do not direct paid traffic to the site until:

- Real products replace concept products.
- Shopify checkout works.
- Shipping and returns are published.
- Customer-service contact information is live.
- Analytics events are validated.
- Consent and privacy requirements are handled.
- The final brand name and domain are approved.
