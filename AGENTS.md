# Codex Instructions — MARNI COUTURE

This repository is the working framework for the MARNI COUTURE storefront.

## Read before editing

1. Read `README.md`.
2. Read `docs/FRAMEWORK_SPEC.md`.
3. Read `docs/CONTENT_REPLACEMENT_GUIDE.md`.
4. Check the current git diff before making changes.
5. Run the verification commands relevant to the task.

## Non-negotiable brand rules

- Public brand text is currently `MARNI COUTURE`.
- Existing TikTok handle is `@marnimarnni`.
- Never rename the brand, logo files, social handle, or campaign line without explicit approval.
- Use the supplied production logo files in `public/brand`. Do not recreate the logo with plain text.
- Primary visual foundation: black, warm cream, and couture pink.
- Secondary chapter colors may use yellow, green, purple, and blue in controlled amounts.
- The experience must feel editorial and cinematic, but shopping controls must remain stable and readable.

## Motion rules

- Use native browser scrolling. Do not hijack wheel or touch behavior.
- Use GSAP and ScrollTrigger for coordinated section motion.
- Respect `prefers-reduced-motion`.
- Disable or simplify expensive effects on narrow screens and low-power devices.
- Do not animate size selectors, prices, checkout controls, or policy text while the user is interacting with them.

## Commerce rules

- Mock products are placeholders and must never be represented as confirmed client merchandise.
- Do not invent prices, sizes, materials, inventory, shipping terms, or return policies.
- Shopify Storefront API configuration must use environment variables.
- Never commit access tokens, private keys, customer data, or production credentials.
- Checkout should ultimately use Shopify's hosted checkout URL.

## Content rules

- Do not scrape or republish TikTok media without permission.
- Use the supplied TikTok URLs as references and links until original client-owned media is available.
- Do not fabricate a designer biography.
- Keep the temporary brand statement clearly replaceable.

## Engineering rules

- TypeScript strict mode stays enabled.
- Prefer small focused components over one oversized page component.
- Preserve accessibility: keyboard operation, visible focus, semantic headings, labels, captions, and reduced-motion behavior.
- Keep third-party dependencies minimal.
- Run `npm run typecheck`, `npm run lint`, and `npm run build` before declaring launch readiness.
- At the end of every Codex task, report files changed, commands run, and anything still blocked by missing client information.
