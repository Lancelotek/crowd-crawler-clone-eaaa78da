/**
 * Pure-data shape for the SEO service landings.
 *
 * Icons are referenced by lucide name (a string) instead of a component so this
 * module — and every landing copy file — stays importable from Node (the Vite
 * config prerenders heads AND no-JS body fallbacks from the same objects the
 * React template renders).
 */
export interface SeoLandingContent {
  // SEO
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbName: string;
  serviceType: string;
  // Hero
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  heroSub: string;
  bookSource: string;
  // Problem
  problemEyebrow: string;
  problemTitle: string;
  problemParas: string[];
  // Reasons (4)
  reasonsEyebrow: string;
  reasonsTitle: string;
  reasons: { icon: string; label: string; title: string; body: string }[];
  // Phases (3)
  phasesTitle: string;
  phases: { n: string; title: string; body: string }[];
  // Deliverables
  deliverablesTitle: string;
  deliverables: string[];
  // Comparison
  comparisonEyebrow: string;
  comparisonTitle: string;
  comparisonRightLabel: string;
  comparison: { row: string; mva: boolean | string; cold: boolean | string }[];
  /** Optional long-form sections rendered before the FAQ. */
  extraSections?: { h2: string; paras: string[] }[];
  // FAQ
  faqs: { q: string; a: string }[];
  // Final CTA
  ctaLead: string;
  ctaAccent: string;
  ctaSub: string;
  /** When set, enables hreflang alternates pointing to EN + PL counterparts. */
  hreflangOverrides?: { en: string; pl: string };
}
