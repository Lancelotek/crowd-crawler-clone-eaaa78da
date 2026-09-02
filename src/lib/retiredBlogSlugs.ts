/**
 * Retired blog slugs whose content now lives on a dedicated page.
 * Single map so redirects never get scattered across the router.
 * Keys are slugs (without the /:lang/blog/ prefix); values are paths
 * relative to the language prefix.
 */
export const RETIRED_BLOG_SLUGS: Record<string, string> = {
  "heygen-alternatives-for-founders": "/founder-influencer",
  "heygen-alternative-for-founders": "/founder-influencer",
};
