/**
 * Blog SEO titles. Shared by BlogPost (runtime) and the build-time prerenderer
 * so the two can never disagree. Keep dependency-free (Node imports this).
 */
const SEO_TITLE_OVERRIDES: Record<string, string> = {
  "go-to-market-strategy-template-saas": "Go-to-Market Strategy Template for SaaS Founders (2026)",
  "product-launch-strategy-90-day-framework": "Product Launch Strategy: The 90-Day Framework",
};

export function buildSeoTitle(title: string, slug?: string): string {
  const override = slug ? SEO_TITLE_OVERRIDES[slug] : undefined;
  if (override) return override;
  const suffix = " | JAY-23";
  const max = 60;
  if (title.length + suffix.length <= max) return `${title}${suffix}`;
  if (title.length <= max) return title;
  const cut = title.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[\s—–\-–(,:;]+$/, "");
}
