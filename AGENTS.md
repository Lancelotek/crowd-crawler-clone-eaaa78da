# Architecture rules
- Keep per-route metadata in `src/seo/routeMeta.ts`; runtime and prerendering consume it to avoid SEO drift.
- Generate root and 404 entry documents separately from the shared prerender renderer; the host uses index.html for root and SPA fallback navigations.
- Keep legacy service, offer, guide and legal prose in pure content modules consumed by both the page and static body renderer; never add crawler-only padding to satisfy length checks.
- Generate blog-index bodies from the same fetched and ordered rows as article prerenders so crawlers see the current archive.
- Standalone paid-traffic pages bypass shared navigation and footer in both React and prerendered bodies to preserve their checkout-only journey.
- Keep MVA Playbook copy and the product catalog in a shared pure-data module so checkout, static content and tests agree.
- Isolate Playbook visual tokens under its page wrapper so offer styling does not alter existing pages.
- Route Playbook orders through one checkout adapter; emit purchases only from server-verified paid orders, never URL totals or page visits, to prevent false revenue reporting.- Scope single-page visual systems (e.g. Wirtualna Recepcja) to a wrapper class in src/styles so their light theme never leaks into other pages.
