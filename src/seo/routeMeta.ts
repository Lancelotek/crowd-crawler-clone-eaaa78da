/**
 * SINGLE SOURCE OF TRUTH for per-route head metadata.
 *
 * Both consumers read from here, so the prerendered head and the hydrated head
 * can never drift:
 *   - runtime: page components pass these values into <SEOHead />
 *   - build time: src/seo/prerenderRoutes.ts derives PRERENDER_ROUTES from it
 *     and the vite plugin writes dist/<path>/index.html
 *
 * Keep this file dependency-free (pure data only) — it is imported from the app,
 * from vite.config.ts (Node) and from the sitemap generator.
 */
import { translations } from "../i18n/translations";
import { liveEn, livePl } from "../content/liveCopy";
import { LANDING_FAQS } from "./landingFaqs";

export const BASE_URL = "https://jay23.com";
export const DEFAULT_OG = `${BASE_URL}/og-default.jpg`;

export type Lang = "en" | "pl";

export interface RouteMeta {
  /** URL path, no trailing slash. */
  path: string;
  lang: Lang;
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  /**
   * Absolute EN + PL counterpart URLs. Omit for pages that exist in one
   * language only — then no hreflang is emitted at all.
   */
  alternates?: { en: string; pl: string };
  noIndex?: true;
  /** Homepages skip the BreadcrumbList. */
  homepage?: true;
  /** Trailing crumb label; falls back to a humanized slug. */
  breadcrumbName?: string;
  /** Present on service landings → Service JSON-LD. */
  serviceType?: string;
  /** Present → FAQPage JSON-LD. */
  faqs?: { q: string; a: string }[];
  publishedAt?: string;
  author?: string;
}

const BRAND_SUFFIX = " | MVA Framework by JAY-23";

/** Identical rule used by SEOHead at runtime and by the prerenderer. */
export const withBrandSuffix = (title: string) =>
  title.includes("MVA") || title.includes("JAY-23") || title.length + BRAND_SUFFIX.length > 60
    ? title
    : `${title}${BRAND_SUFFIX}`;

const pair = (en: string, pl: string) => ({ en: `${BASE_URL}${en}`, pl: `${BASE_URL}${pl}` });
const same = (p: string) => pair(`/en${p}`, `/pl${p}`);

const t = translations as Record<string, Record<string, { en: string; pl: string }>>;

export const ROUTE_META: RouteMeta[] = [
  // ─── Homepages ────────────────────────────────────────────
  {
    path: "/en",
    lang: "en",
    homepage: true,
    title: "JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency | MVA Framework",
    description:
      "The 90-day MVA Framework for Kickstarter, TikTok Shop, SaaS and sales-led launches: Meta Ads, creator commerce, email funnels and community activation that took 46 campaigns past $1.2M raised.",
    alternates: pair("/en", "/pl"),
  },
  {
    path: "/pl",
    lang: "pl",
    homepage: true,
    title: "JAY-23 — Agencja Kickstarter, TikTok Shop, SaaS i Sales Growth | MVA Framework",
    description:
      "90-dniowy MVA Framework dla Kickstarter, TikTok Shop, SaaS i sales-led launchy: Meta Ads, creator commerce, lejki email i aktywacja społeczności, które pomogły 46 kampaniom zebrać ponad $1.2M.",
    alternates: pair("/en", "/pl"),
  },

  // ─── Core pages (copy lives in the i18n dictionary) ───────
  {
    path: "/en/blog",
    lang: "en",
    title: t.blog.seoTitle.en,
    description: t.blog.seoDesc.en,
    breadcrumbName: "Blog",
    alternates: same("/blog"),
  },
  {
    path: "/pl/blog",
    lang: "pl",
    title: t.blog.seoTitle.pl,
    description: t.blog.seoDesc.pl,
    breadcrumbName: "Blog",
    alternates: same("/blog"),
  },
  {
    path: "/en/process",
    lang: "en",
    title: t.process.seoTitle.en,
    description: t.process.seoDesc.en,
    breadcrumbName: "Process",
    alternates: same("/process"),
  },
  {
    path: "/pl/process",
    lang: "pl",
    title: t.process.seoTitle.pl,
    description: t.process.seoDesc.pl,
    breadcrumbName: "Proces",
    alternates: same("/process"),
  },
  {
    path: "/en/book",
    lang: "en",
    title: "Book a discovery call — 30 minutes, no commitment",
    description:
      "30 minutes, no commitment, no pitch. You tell us what you're building — you leave with a concrete first step.",
    breadcrumbName: "Book a call",
    alternates: same("/book"),
  },
  {
    path: "/pl/book",
    lang: "pl",
    title: "Umów discovery call — 30 minut bez zobowiązań | JAY-23",
    description:
      "30 minut, bez zobowiązań, bez pitchu. Opowiadasz, co budujesz — wychodzisz z konkretnym pomysłem na pierwszy krok.",
    breadcrumbName: "Umów rozmowę",
    alternates: same("/book"),
  },
  {
    path: "/en/faq",
    lang: "en",
    title: "Kickstarter Prelaunch FAQ — Pricing & Process | JAY-23",
    description:
      "Answers about promoting a Kickstarter campaign, MVA Framework pricing, the 90-day process, expected CPL, and working with JAY-23.",
    breadcrumbName: "FAQ",
    alternates: same("/faq"),
  },
  {
    path: "/pl/faq",
    lang: "pl",
    title: "FAQ Kickstarter — Cena, Proces, Wyniki Kampanii | JAY-23",
    description:
      "Odpowiedzi na pytania o promocję Kickstarter w Polsce: ile kosztuje agencja, jak działa framework MVA, ile trwa kampania, jakie wyniki przynosi.",
    breadcrumbName: "FAQ",
    alternates: same("/faq"),
  },
  {
    path: "/en/about",
    lang: "en",
    title: "About JAY-23 — Prelaunch Growth Agency by Marek Cieśla",
    description:
      "JAY-23 is a prelaunch growth agency founded by Marek Cieśla. Kickstarter, TikTok Shop, SaaS and sales-led launches — 46 campaigns managed, $1.2M+ raised.",
    breadcrumbName: "About",
    alternates: same("/about"),
  },
  {
    path: "/pl/about",
    lang: "pl",
    title: "O JAY-23 — agencja Kickstarter Marka Cieśli",
    description:
      "JAY-23 to agencja wzrostu prelaunch założona przez Marka Cieślę. Kickstarter, TikTok Shop, SaaS i sales-led launchy — 46 kampanii, ponad $1.2M zebranych.",
    breadcrumbName: "O nas",
    alternates: same("/about"),
  },
  {
    path: "/en/quiz",
    lang: "en",
    title: "MVA Calculator — How Many True Fans You Need Before Launch",
    description:
      "Free Minimum Viable Audience calculator. Answer 6 questions and get the exact number of true fans you need before launching your product.",
    breadcrumbName: "MVA Calculator",
    alternates: same("/quiz"),
  },
  {
    path: "/pl/quiz",
    lang: "pl",
    title: "Kalkulator MVA — ilu fanów potrzebujesz | JAY-23",
    description:
      "Sprawdź w 60 sekund, ilu prawdziwych fanów potrzebujesz, żeby Twoja kampania Kickstarter się udała. Darmowy kalkulator MVA od JAY-23.",
    breadcrumbName: "Kalkulator MVA",
    alternates: same("/quiz"),
  },
  {
    path: "/en/packages",
    lang: "en",
    title: "MVA Pricing — Kickstarter, TikTok Shop, SaaS | JAY-23",
    description:
      "Transparent pricing for Kickstarter, TikTok Shop and sales-led prelaunch. MVA packages from $1,500/mo — 90 days, Meta Ads, email funnel, community activation.",
    breadcrumbName: "Packages",
    alternates: same("/packages"),
  },
  {
    path: "/pl/packages",
    lang: "pl",
    title: "Cennik MVA — Kickstarter, TikTok Shop, SaaS | JAY-23",
    description:
      "Cennik programu MVA dla Kickstarter, TikTok Shop, SaaS i sales-led launchy. Pakiety od 6000 PLN/mies. — 90 dni, Meta Ads, lejek email, społeczność.",
    breadcrumbName: "Pakiety",
    alternates: same("/packages"),
  },

  // ─── Service landings ─────────────────────────────────────
  {
    path: "/en/ecommerce-prelaunch-agency",
    lang: "en",
    title: "eCommerce Pre-Launch Agency for DTC and Crowdfunding",
    description:
      "Pre-launch agency for eCommerce and DTC founders. The 90-day MVA Framework validates demand and builds 1,000+ buyers before launch. $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    ogImageAlt: "eCommerce Pre-Launch Marketing Agency — JAY-23",
    breadcrumbName: "eCommerce Pre-Launch Agency",
    serviceType: "eCommerce pre-launch marketing agency",
    alternates: pair("/en/ecommerce-prelaunch-agency", "/pl/agencja-prelaunch-ecommerce"),
  },
  {
    path: "/pl/agencja-prelaunch-ecommerce",
    lang: "pl",
    title: "Agencja prelaunch eCommerce — MVA Framework | JAY-23",
    description:
      "Agencja prelaunch dla founderów eCommerce i DTC. 90-dniowy MVA Framework waliduje popyt i buduje 1000+ kupujących przed startem sprzedaży.",
    ogImage: DEFAULT_OG,
    ogImageAlt: "Agencja ecommerce dla założycieli przed startem — JAY-23",
    breadcrumbName: "Agencja prelaunch eCommerce",
    serviceType: "Agencja prelaunch eCommerce",
    alternates: pair("/en/ecommerce-prelaunch-agency", "/pl/agencja-prelaunch-ecommerce"),
  },
  {
    path: "/en/saas-prelaunch-marketing-agency",
    lang: "en",
    title: "SaaS Go-to-Market & Pre-Launch Marketing Agency | JAY-23",
    description:
      "SaaS go-to-market strategy that ships: the 90-day MVA Framework validates demand and lands day-one paying users. 46 campaigns, $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    ogImageAlt: "SaaS Pre-Launch Marketing Agency — JAY-23",
    breadcrumbName: "SaaS Pre-Launch Agency",
    serviceType: "SaaS pre-launch marketing agency",
    alternates: pair("/en/saas-prelaunch-marketing-agency", "/pl/agencja-prelaunch-saas"),
  },
  {
    path: "/pl/agencja-prelaunch-saas",
    lang: "pl",
    title: "Agencja prelaunch SaaS — marketing przed startem | JAY-23",
    description:
      "Agencja prelaunch dla SaaS: 90-dniowy MVA Framework, walidacja popytu, 1000+ leadów i launch z płacącymi użytkownikami od dnia pierwszego.",
    ogImage: DEFAULT_OG,
    ogImageAlt: "Agencja prelaunch SaaS — JAY-23",
    breadcrumbName: "Agencja prelaunch SaaS",
    serviceType: "Agencja prelaunch SaaS",
    alternates: pair("/en/saas-prelaunch-marketing-agency", "/pl/agencja-prelaunch-saas"),
  },
  {
    path: "/en/kickstarter-agency",
    lang: "en",
    title: "Kickstarter Agency for Day-One Fully Funded Campaigns",
    description:
      "Kickstarter agency that builds 1,000+ true fans before launch day. 90-day MVA Framework, fixed fee, no revenue share. 46 campaigns, $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Kickstarter Agency",
    serviceType: "Kickstarter marketing agency",
    faqs: LANDING_FAQS["/en/kickstarter-agency"],
  },
  {
    path: "/en/kickstarter-marketing-agency",
    lang: "en",
    title: "Kickstarter Marketing Agency — Fixed Fee, No Revenue Share",
    description:
      "Kickstarter marketing agency: paid ads, pre-launch funnels and email sequences. Fixed monthly fee, no revenue share. 46 campaigns, $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Kickstarter Marketing Agency",
    serviceType: "Kickstarter marketing and paid ads agency",
    faqs: LANDING_FAQS["/en/kickstarter-marketing-agency"],
  },
  {
    path: "/en/crowdfunding-agency",
    lang: "en",
    title: "Crowdfunding Agency for Kickstarter, Indiegogo & Gamefound",
    description:
      "Crowdfunding agency for Kickstarter, Indiegogo and Gamefound. 90-day MVA Framework, 1,000+ pre-qualified backers, $1.2M+ raised across 46 campaigns.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Crowdfunding Agency",
    serviceType: "Crowdfunding marketing agency",
    faqs: LANDING_FAQS["/en/crowdfunding-agency"],
  },
  {
    path: "/en/product-launch-agency",
    lang: "en",
    title: "Product Launch Agency — Demand Before Launch Day | JAY-23",
    description:
      "Product launch agency that builds demand before launch day. 90-day MVA Framework: 1,000+ pre-qualified buyers and day-one revenue, not day-one silence.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Product Launch Agency",
    serviceType: "Product launch marketing agency",
    faqs: LANDING_FAQS["/en/product-launch-agency"],
  },
  {
    path: "/en/launchboom-alternative",
    lang: "en",
    title: "LaunchBoom Alternative: Pricing, Reviews & Fixed Fee",
    description:
      "LaunchBoom alternative compared: revenue share vs fixed monthly fee, what LaunchBoom actually costs, and when a founder-led team fits better.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "LaunchBoom Alternative",
    serviceType: "Kickstarter pre-launch agency (LaunchBoom alternative)",
    faqs: LANDING_FAQS["/en/launchboom-alternative"],
  },
  {
    path: "/en/jellop-alternative",
    lang: "en",
    title: "Jellop Alternative: Reviews, Pricing & Full-Funnel Option",
    description:
      "Jellop alternative compared: 25% performance cut vs fixed monthly fee, and why pre-launch beats live-campaign-only ads. 46 campaigns, $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Jellop Alternative",
    serviceType: "Kickstarter ad agency (Jellop alternative)",
    faqs: LANDING_FAQS["/en/jellop-alternative"],
  },
  {
    path: "/en/agency-2-0-alternative",
    lang: "en",
    title: "Agency 2.0 Alternative — No 7-Figure Minimum | JAY-23",
    description:
      "Looking for an Agency 2.0 alternative? JAY-23 runs the 90-day MVA Framework: fixed monthly fee, no minimum raise, founder-led. 46 campaigns, $1.2M+ raised.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Agency 2.0 Alternative",
    serviceType: "Crowdfunding agency (Agency 2.0 alternative)",
    faqs: LANDING_FAQS["/en/agency-2-0-alternative"],
  },
  {
    path: "/en/tiktok-shop-agency",
    lang: "en",
    title: "TikTok Shop Agency — Creator Video & Live Selling | JAY-23",
    description:
      "TikTok Shop agency for brands selling through creators, shoppable video and live. Two months free, then performance fee on revenue. No retainer risk.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "TikTok Shop Agency",
    serviceType: "TikTok Shop agency",
    alternates: same("/tiktok-shop-agency"),
  },
  {
    path: "/pl/tiktok-shop-agency",
    lang: "pl",
    title: "Agencja TikTok Shop — video, live i influencerzy | JAY-23",
    description:
      "Agencja TikTok Shop dla marek sprzedających przez twórców, shoppable video i live. Dwa miesiące za darmo, potem prowizja od revenue. Bez retainera.",
    ogImage: DEFAULT_OG,
    breadcrumbName: "Agencja TikTok Shop",
    serviceType: "Agencja TikTok Shop",
    alternates: same("/tiktok-shop-agency"),
  },
  {
    path: "/en/gamefound",
    lang: "en",
    title: "Gamefound Agency — Pre-Launch Campaigns That Fund | JAY-23",
    description:
      "Gamefound agency running full campaigns: 1,000+ Early Birds before launch, launch-day support and Late Pledge. 46 campaigns, $1.2M+ raised.",
    ogImage: `${BASE_URL}/og/gamefound-pl.jpg`,
    ogImageAlt: "Gamefound agency — JAY-23",
    breadcrumbName: "Gamefound Agency",
    serviceType: "Gamefound campaign agency",
    alternates: same("/gamefound"),
  },
  {
    path: "/pl/gamefound",
    lang: "pl",
    title: "Agencja Gamefound — kampanie na polskiej platformie | JAY-23",
    description:
      "Prowadzimy kampanie Gamefound: lista 1000+ Early Birds przed startem, launch day support i Late Pledge. 46 kampanii, $1.2M+ zebranych.",
    ogImage: `${BASE_URL}/og/gamefound-pl.jpg`,
    ogImageAlt: "Agencja Gamefound — JAY-23",
    breadcrumbName: "Agencja Gamefound",
    serviceType: "Agencja kampanii Gamefound",
    alternates: same("/gamefound"),
  },
  {
    path: "/en/live",
    lang: "en",
    title: liveEn.meta.title,
    description: liveEn.meta.description,
    ogImage: `${BASE_URL}/og/live.jpg`,
    ogImageAlt: liveEn.meta.title,
    breadcrumbName: "Live Selling",
    serviceType: "Live selling agency",
    alternates: same("/live"),
  },
  {
    path: "/pl/live",
    lang: "pl",
    title: livePl.meta.title,
    description: livePl.meta.description,
    ogImage: `${BASE_URL}/og/live.jpg`,
    ogImageAlt: livePl.meta.title,
    breadcrumbName: "Sprzedaż na żywo",
    serviceType: "Agencja sprzedaży na żywo",
    alternates: same("/live"),
  },
  {
    path: "/en/click2pack",
    lang: "en",
    title: "click2pack — creator commerce catalogue & storefronts",
    description:
      "A multi-supplier product catalogue, a network of creators and one system handling orders from streams, videos and creator storefronts. Starting with beauty.",
    ogImage: `${BASE_URL}/og/click2pack.jpg`,
    ogImageAlt: "click2pack — creator commerce",
    breadcrumbName: "click2pack",
    alternates: same("/click2pack"),
  },
  {
    path: "/pl/click2pack",
    lang: "pl",
    title: "click2pack — commerce dla twórców | katalog i sklepy",
    description:
      "Katalog produktów wielu dostawców, sieć twórców i system, który obsługuje zamówienia z transmisji, filmów i sklepów twórców. Beauty na start.",
    ogImage: `${BASE_URL}/og/click2pack.jpg`,
    ogImageAlt: "click2pack — commerce dla twórców",
    breadcrumbName: "click2pack",
    alternates: same("/click2pack"),
  },
  {
    path: "/en/founder-influencer",
    lang: "en",
    title: "HeyGen Alternative for Founders — AI Avatar | JAY-23",
    description:
      "AI avatar (HeyGen, Synthesia, Argil) + 90-day personal branding plan for founders. Zero hours on camera. 1,000 true fans. Free 47-page Playbook.",
    breadcrumbName: "Founder Influencer",
    alternates: same("/founder-influencer"),
  },
  {
    path: "/pl/founder-influencer",
    lang: "pl",
    title: "HeyGen po polsku dla founderów — AI avatar | JAY-23",
    description:
      "AI avatar (HeyGen, Synthesia, Argil) + 90-dniowy plan budowy marki osobistej foundera. Zero godzin przed kamerą. 1000 prawdziwych fanów. Bezpłatny Playbook.",
    breadcrumbName: "Founder Influencer",
    alternates: same("/founder-influencer"),
  },
  {
    path: "/en/prelaunch-marketing-playbook",
    lang: "en",
    type: "article",
    title: "The Complete Pre-Launch Marketing Playbook (2026)",
    description:
      "A 3,500-word operator's playbook for pre-launch marketing. Validate demand, build 1,000+ true fans, ship a launch day that produces real revenue. By JAY-23.",
    ogImage: DEFAULT_OG,
    ogImageAlt: "The Complete Pre-Launch Marketing Playbook — JAY-23",
    breadcrumbName: "Pre-Launch Marketing Playbook",
    publishedAt: "2026-06-24",
    author: "Marek Cieśla",
  },

  // ─── Legal ────────────────────────────────────────────────
  {
    path: "/en/privacy-policy",
    lang: "en",
    title: "Privacy Policy — Data, Cookies & GDPR Rights | JAY-23",
    description:
      "How JAY23 LLC collects, processes and stores personal data from forms, cookies and email — your GDPR and CCPA rights, retention periods and contact details.",
    breadcrumbName: "Privacy Policy",
    alternates: same("/privacy-policy"),
  },
  {
    path: "/pl/privacy-policy",
    lang: "pl",
    title: "Polityka prywatności — RODO i cookies | JAY-23",
    description:
      "Polityka prywatności JAY23 LLC: jakie dane zbieramy, na jakiej podstawie RODO, jak długo je przechowujemy i jak skorzystać z praw użytkownika.",
    breadcrumbName: "Polityka prywatności",
    alternates: same("/privacy-policy"),
  },
  {
    path: "/en/terms-of-service",
    lang: "en",
    title: "Terms of Service — JAY-23 Website Terms of Use",
    description:
      "Terms of use for the JAY-23 website and JAY23 LLC services: scope of work, payments, liability and intellectual property.",
    breadcrumbName: "Terms of Service",
    alternates: same("/terms-of-service"),
  },
  {
    path: "/pl/terms-of-service",
    lang: "pl",
    title: "Regulamin serwisu JAY-23 | Warunki korzystania",
    description:
      "Regulamin korzystania ze strony JAY-23 i usług JAY23 LLC: zakres usług, płatności, odpowiedzialność i prawa autorskie.",
    breadcrumbName: "Regulamin",
    alternates: same("/terms-of-service"),
  },
  {
    path: "/en/impressum",
    lang: "en",
    title: "Impressum — JAY23 LLC Company Details | JAY-23",
    description:
      "Registered details for JAY23 LLC (Wyoming, USA), operator of the JAY-23 site and the MVA Framework. Address, contact and legal information.",
    breadcrumbName: "Impressum",
    alternates: same("/impressum"),
  },
  {
    path: "/pl/impressum",
    lang: "pl",
    title: "Impressum — dane firmy JAY23 LLC | JAY-23",
    description:
      "Dane rejestrowe JAY23 LLC (Wyoming, USA), operatora strony JAY-23 i frameworku MVA. Adres, kontakt i informacje prawne.",
    breadcrumbName: "Impressum",
    alternates: same("/impressum"),
  },

  // ─── noindex utility pages ────────────────────────────────
  {
    path: "/en/lp",
    lang: "en",
    noIndex: true,
    title: "MVA Framework — Build Your Audience Before Launch",
    description: "90-day program for founders. 46 campaigns, $1.2M+ raised.",
  },
  {
    path: "/pl/lp",
    lang: "pl",
    noIndex: true,
    title: "MVA Framework — Zbuduj publiczność przed startem",
    description: "90-dniowy program dla founderów. 46 kampanii, $1.2M+ zebranych.",
  },
  {
    path: "/en/thank-you",
    lang: "en",
    noIndex: true,
    title: "You're in! — MVA Framework",
    description: "Thank you for signing up. Check your inbox and join our Discord community.",
  },
  {
    path: "/pl/thank-you",
    lang: "pl",
    noIndex: true,
    title: "Dziękujemy! — MVA Framework",
    description: "Dziękujemy za zapisanie się. Sprawdź skrzynkę i dołącz do społeczności na Discord.",
  },
  {
    path: "/en/playbook-thank-you",
    lang: "en",
    noIndex: true,
    title: "Your Pre-Launch Checklist is on the way — JAY-23",
    description:
      "Your download has started. Next: book a free 30-min strategy call and turn the checklist into a real MVA plan.",
  },
  {
    path: "/pl/playbook-thank-you",
    lang: "pl",
    noIndex: true,
    title: "Twoja checklista pre-launch jest w drodze — JAY-23",
    description:
      "Pobieranie się rozpoczęło. Następny krok: umów bezpłatną rozmowę i zamień checklistę w konkretny plan MVA.",
  },
  {
    path: "/en/report",
    lang: "en",
    noIndex: true,
    title: "MVA Report — launch readiness audit | JAY-23",
    description:
      "Free MVA report: we check whether your product has an audience ready to buy on launch day. Result within 48 hours.",
  },
  {
    path: "/pl/report",
    lang: "pl",
    noIndex: true,
    title: "Raport MVA — audyt gotowości do launchu | JAY-23",
    description:
      "Bezpłatny raport MVA: sprawdzamy, czy Twój produkt ma zbudowaną publiczność gotową kupić w dniu startu. Wynik w 48 godzin.",
  },
];

const BY_PATH = new Map(ROUTE_META.map((r) => [r.path, r]));

export const getRouteMeta = (path: string) => BY_PATH.get(path.replace(/\/+$/, "") || "/");

/** Every route flagged noIndex — consumed by the sitemap generator too. */
export const NOINDEX_PATHS = new Set(
  ROUTE_META.filter((r) => r.noIndex).map((r) => r.path),
);
