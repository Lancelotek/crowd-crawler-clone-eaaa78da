/**
 * Per-route no-JS body fallback.
 *
 * Every prerendered file gets a short, faithful summary of what a human sees on
 * that same URL — derived from the SAME copy the React page renders (landing
 * copy objects, the i18n dictionary, liveCopy, About/FAQ/Process copy, or the
 * blog row from the database). Never marketing copy written just for crawlers:
 * that would be cloaking.
 *
 * React replaces this markup on hydration, exactly as it replaces the static
 * fallback in index.html today.
 *
 * Keep this file dependency-free (relative imports, pure data) — it is imported
 * from vite.config.ts in a Node context.
 */
import type { RouteMeta } from "./routeMeta";
import { LANDING_CONTENT } from "../content/landings";
import { translations } from "../i18n/translations";
import { liveEn, livePl } from "../content/liveCopy";
import { ABOUT_COPY } from "../content/aboutCopy";
import { FAQ_COPY } from "../content/faqCopy";
import { PHASES, OUTCOMES } from "../content/processCopy";
import { playbookCopy as playbook, PLAYBOOK_PRODUCTS, ADD_ON_IDS, checkoutPayLabel } from "../content/mvaPlaybook";
import { sharedPageBody } from "./sharedPageBody";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Copy stored with inline links/markdown → plain text. */
const plain = (v: string) =>
  v
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const clamp = (v: string, maxWords: number) => {
  const words = plain(v).split(" ");
  return words.length <= maxWords ? words.join(" ") : `${words.slice(0, maxWords).join(" ")}…`;
};

const h1 = (v: string) => `<h1>${esc(plain(v))}</h1>`;
const h2 = (v: string) => `<h2>${esc(plain(v))}</h2>`;
const p = (v: string) => `<p>${esc(plain(v))}</p>`;
const ul = (items: string[]) =>
  `<ul>${items.map((i) => `<li>${esc(plain(i))}</li>`).join("")}</ul>`;
const link = (href: string, label: string) => `<p><a href="${href}">${esc(label)}</a></p>`;


/* ─── Site-wide navigation (real <a href> on every prerendered page) ── */
type NavItem = [href: string, en: string, pl: string];

const MAIN_NAV: Record<"en" | "pl", NavItem[]> = {
  en: [
    ["/en", "Home", "Start"],
    ["/en/process", "Process", "Proces"],
    ["/en/packages", "Pricing", "Cennik"],
    ["/en/about", "About", "O nas"],
    ["/en/faq", "FAQ", "FAQ"],
    ["/en/blog", "Blog", "Blog"],
    ["/en/quiz", "MVA Calculator", "Kalkulator MVA"],
    ["/en/book", "Book a call", "Umów rozmowę"],
  ],
  pl: [
    ["/pl", "Home", "Start"],
    ["/pl/process", "Process", "Proces"],
    ["/pl/packages", "Pricing", "Cennik"],
    ["/pl/about", "About", "O nas"],
    ["/pl/faq", "FAQ", "FAQ"],
    ["/pl/blog", "Blog", "Blog"],
    ["/pl/quiz", "MVA Calculator", "Kalkulator MVA"],
    ["/pl/book", "Book a call", "Umów rozmowę"],
  ],
};

const SERVICES: Record<"en" | "pl", NavItem[]> = {
  en: [
    ["/en/kickstarter-agency", "Kickstarter agency", "Agencja Kickstarter"],
    ["/en/kickstarter-marketing-agency", "Kickstarter marketing agency", "Marketing Kickstarter"],
    ["/en/crowdfunding-agency", "Crowdfunding agency", "Agencja crowdfunding"],
    ["/en/product-launch-agency", "Product launch agency", "Agencja product launch"],
    ["/en/gamefound", "Gamefound agency", "Agencja Gamefound"],
    ["/en/tiktok-shop-agency", "TikTok Shop agency", "Agencja TikTok Shop"],
    ["/en/live", "Live selling", "Sprzedaż na żywo"],
    ["/en/click2pack", "click2pack", "click2pack"],
    ["/en/ecommerce-prelaunch-agency", "eCommerce pre-launch", "Prelaunch eCommerce"],
    ["/en/saas-prelaunch-marketing-agency", "SaaS pre-launch", "Prelaunch SaaS"],
    ["/en/founder-influencer", "Founder influencer", "Founder influencer"],
  ],
  pl: [
    ["/pl/tiktok-shop-agency", "TikTok Shop agency", "Agencja TikTok Shop"],
    ["/pl/gamefound", "Gamefound agency", "Agencja Gamefound"],
    ["/pl/live", "Live selling", "Sprzedaż na żywo"],
    ["/pl/click2pack", "click2pack", "click2pack"],
    ["/pl/agencja-prelaunch-ecommerce", "eCommerce pre-launch", "Agencja prelaunch eCommerce"],
    ["/pl/agencja-prelaunch-saas", "SaaS pre-launch", "Agencja prelaunch SaaS"],
    ["/pl/founder-influencer", "Founder influencer", "Founder influencer"],
    ["/en/kickstarter-agency", "Kickstarter agency (EN)", "Agencja Kickstarter (EN)"],
    ["/en/crowdfunding-agency", "Crowdfunding agency (EN)", "Agencja crowdfunding (EN)"],
  ],
};

const COMPARISONS: NavItem[] = [
  ["/en/launchboom-alternative", "LaunchBoom alternative", "Alternatywa dla LaunchBoom"],
  ["/en/jellop-alternative", "Jellop alternative", "Alternatywa dla Jellop"],
  ["/en/agency-2-0-alternative", "Agency 2.0 alternative", "Alternatywa dla Agency 2.0"],
];

const GUIDES: NavItem[] = [
  ["/en/prelaunch-marketing-playbook", "Pre-launch marketing playbook", "Playbook marketingu prelaunch"],
];

const legalNav = (lang: "en" | "pl"): NavItem[] => [
  [`/${lang}/privacy-policy`, "Privacy policy", "Polityka prywatności"],
  [`/${lang}/terms-of-service`, "Terms of service", "Regulamin"],
  [`/${lang}/impressum`, "Impressum", "Impressum"],
];

const navList = (lang: "en" | "pl", items: NavItem[]) =>
  `<ul>${items
    .map(([href, en, pl]) => `<li><a href="${href}">${esc(lang === "pl" ? pl : en)}</a></li>`)
    .join("")}</ul>`;

const siteNav = (lang: "en" | "pl") =>
  `<nav aria-label="${label(lang, "Main navigation", "Nawigacja główna")}">${navList(lang, MAIN_NAV[lang])}</nav>`;

const siteFooter = (lang: "en" | "pl") =>
  [
    `<footer>`,
    `<h2>${esc(label(lang, "Services", "Usługi"))}</h2>`,
    navList(lang, SERVICES[lang]),
    `<h2>${esc(label(lang, "Comparisons", "Porównania"))}</h2>`,
    navList(lang, COMPARISONS),
    `<h2>${esc(label(lang, "Guides", "Przewodniki"))}</h2>`,
    navList(lang, GUIDES),
    `<h2>${esc(label(lang, "Company", "Firma"))}</h2>`,
    navList(lang, legalNav(lang)),
    navList(lang, [
      lang === "en"
        ? ["/pl", "Polska wersja", "Polska wersja"]
        : ["/en", "English version", "English version"],
    ]),
    `<p>JAY23 LLC — MVA Framework</p>`,
    `</footer>`,
  ].join("");

const wrap = (lang: "en" | "pl", blocks: string[]) =>
  `${siteNav(lang)}\n      <main>\n      ${blocks.filter(Boolean).join("\n      ")}\n    </main>\n      ${siteFooter(lang)}`;

const t = translations as unknown as Record<string, Record<string, { en: string; pl: string }>>;
const label = (lang: "en" | "pl", en: string, pl: string) => (lang === "pl" ? pl : en);

const bookCta = (lang: "en" | "pl", source?: string) =>
  link(
    `/${lang}/book${source ? `?source=${source}` : ""}`,
    label(lang, "Book a free 30-minute strategy call", "Umów bezpłatną 30-minutową konsultację"),
  );

/* ─── Service landings ──────────────────────────────────────── */
const landingFallback = (meta: RouteMeta) => {
  const c = LANDING_CONTENT[meta.path];
  if (!c) return null;
  const lang = meta.lang;
  return wrap(lang, [
    h1(`${c.h1Lead} ${c.h1Accent}`),
    p(c.heroSub),
    h2(c.problemTitle),
    p(clamp(c.problemParas[0] ?? "", 60)),
    h2(c.reasonsTitle),
    ul(c.reasons.map((r) => `${r.title} — ${clamp(r.body, 18)}`)),
    h2(c.phasesTitle),
    ul(c.phases.map((ph) => `${ph.n} ${ph.title} — ${clamp(ph.body, 16)}`)),
    h2(c.deliverablesTitle),
    ul(c.deliverables.slice(0, 8)),
    h2(label(lang, "Frequently asked questions", "Najczęściej zadawane pytania")),
    c.faqs
      .slice(0, 3)
      .map((f) => `<h3>${esc(plain(f.q))}</h3>${p(clamp(f.a, 45))}`)
      .join(""),
    p(`${c.ctaLead} ${c.ctaAccent}`),
    bookCta(lang, c.bookSource),
  ]);
};

/* ─── Homepages ─────────────────────────────────────────────── */
const homeFallback = (lang: "en" | "pl") =>
  wrap(lang, [
    h1(`${t.hero.h1_line1[lang]}${t.hero.h1_line2[lang]}`),
    p(`${t.hero.hook[lang]} ${t.hero.hookBold[lang]}`),
    h2(`${t.problem.title[lang]} ${t.problem.titleAccent[lang]}`),
    ul([
      `${t.problem.p1Title[lang]} — ${t.problem.p1Desc[lang]}`,
      `${t.problem.p2Title[lang]} — ${t.problem.p2Desc[lang]}`,
      `${t.problem.p3Title[lang]} — ${t.problem.p3Desc[lang]}`,
    ]),
    p(t.problem.transition[lang]),
    h2(`${t.howItWorks.title[lang]} ${t.howItWorks.titleAccent[lang]}`),
    ul([
      `${t.howItWorks.phase1Label[lang]} · ${t.howItWorks.phase1Title[lang]} — ${t.howItWorks.phase1Desc[lang]}`,
      `${t.howItWorks.phase2Label[lang]} · ${t.howItWorks.phase2Title[lang]} — ${t.howItWorks.phase2Desc[lang]}`,
      `${t.howItWorks.phase3Label[lang]} · ${t.howItWorks.phase3Title[lang]} — ${t.howItWorks.phase3Desc[lang]}`,
    ]),
    h2(`${t.whatYouGet.title[lang]} ${t.whatYouGet.titleAccent[lang]}`),
    ul([
      `${t.whatYouGet.f1Title[lang]} — ${t.whatYouGet.f1Desc[lang]}`,
      `${t.whatYouGet.f2Title[lang]} — ${t.whatYouGet.f2Desc[lang]}`,
      `${t.whatYouGet.f3Title[lang]} — ${t.whatYouGet.f3Desc[lang]}`,
      `${t.whatYouGet.f4Title[lang]} — ${t.whatYouGet.f4Desc[lang]}`,
    ]),
    bookCta(lang),
    ...FAQ_COPY[lang].items.map(item => h2(item.q) + p(item.a)),
  ]);

/* ─── Core pages ────────────────────────────────────────────── */
const aboutFallback = (lang: "en" | "pl") => {
  const c = ABOUT_COPY[lang];
  return wrap(lang, [
    h1(c.heroTitle),
    p(c.heroSub),
    h2(`${c.founderName} — ${c.founderTitle}`),
    p(c.bio1),
    p(c.bio2),
    p(c.bio3),
    h2(c.whatWeDoTitle),
    ul([
      `${c.card1Title} — ${c.card1Desc}`,
      `${c.card2Title} — ${c.card2Desc}`,
      `${c.card3Title} — ${c.card3Desc}`,
    ]),
    ul([c.stat1, c.stat2, c.stat3, c.stat4]),
    h2(c.ctaTitle),
    link(`/${lang}/quiz`, c.ctaCalc),
    link(`/${lang}/book`, c.ctaBook),
    bookCta(lang),
  ]);
};

const faqFallback = (lang: "en" | "pl") => {
  const c = FAQ_COPY[lang];
  return wrap(lang, [
    h1(c.title),
    p(c.subtitle),
    c.items
      .slice(0, 6)
      .map((item) => `<h2>${esc(plain(item.q))}</h2>${p(clamp(item.a, 50))}`)
      .join(""),
    bookCta(lang),
  ]);
};

const processFallback = (lang: "en" | "pl") =>
  wrap(lang, [
    h1(`${t.process.h1_1[lang]} ${t.process.h1_2[lang]} ${t.process.h1_3[lang]}`),
    p(t.process.desc[lang]),
    ...PHASES.map((phase) =>
      [
        h2(`${phase.number} · ${phase.label} — ${phase.sub}`),
        ul(phase.steps.map((s) => `${s.title} — ${clamp(s.desc, 18)}`)),
      ].join(""),
    ),
    h2(label(lang, "What you walk away with", "Co dostajesz na koniec")),
    ul(OUTCOMES.map((o) => `${o.value} — ${o.label}`)),
    bookCta(lang),
  ]);

const bookFallback = (lang: "en" | "pl") =>
  wrap(lang, [
    h1(`${t.bookCall.h1_1[lang]} ${t.bookCall.h1_2[lang]}`),
    p(`${t.bookCall.subtitle[lang]} ${t.bookCall.subtitleBold[lang]} ${t.bookCall.subtitleEnd[lang]}`),
    ul([
      `${t.bookCall.bullet1Title[lang]} — ${t.bookCall.bullet1Desc[lang]}`,
      `${t.bookCall.bullet2Title[lang]} — ${t.bookCall.bullet2Desc[lang]}`,
      `${t.bookCall.bullet3Title[lang]} — ${t.bookCall.bullet3Desc[lang]}`,
    ]),
    p(`${t.bookCall.guarantee[lang]} — ${t.bookCall.guaranteeDesc[lang]}`),
    p(t.bookCall.ctaSub[lang]),
    link("https://calendly.com/marekciesla/30min", t.bookCall.ctaBtn[lang]),
  ]);

const liveFallback = (lang: "en" | "pl") => {
  const c = lang === "pl" ? livePl : liveEn;
  return wrap(lang, [
    h1(c.hero.h1),
    p(c.hero.lead),
    ul(c.stats.map((s) => `${s.value} — ${s.label}`)),
    h2(c.problem.heading),
    p(clamp(c.problem.paragraphs[0] ?? "", 60)),
    h2(c.how.heading),
    ul(c.how.steps.map((s) => `${s.title} — ${clamp(s.body, 18)}`)),
    h2(c.pricing.heading),
    p(c.pricing.quote),
    ul(c.pricing.cards.map((card) => `${card.title} — ${clamp(card.body, 16)}`)),
    h2(c.fit.heading),
    ul([...c.fit.yes.slice(0, 3), ...c.fit.no.slice(0, 2)]),
    bookCta(lang, "live"),
  ]);
};

/* ─── Blog posts ────────────────────────────────────────────── */
export type BlogFallbackRow = {
  title: string;
  excerpt?: string | null;
  content?: string | null;
};

export const blogFallbackBody = (row: BlogFallbackRow, lang: "en" | "pl") => {
  return wrap(lang, [
    h1(row.title),
    row.excerpt ? p(row.excerpt) : "",
    markdownToHtml(row.content ?? ""),
    link(`/${lang}/blog`, label(lang, "All articles by JAY-23", "Wszystkie artykuły JAY-23")),
    bookCta(lang, "blog"),
  ]);
};

export const blogIndexBody = (rows: (BlogFallbackRow & { slug: string; published_at?: string | null })[], lang: "en" | "pl") =>
  wrap(lang, [
    h1(`${t.blog.title[lang]} ${t.blog.titleAccent[lang]}`),
    ...[...rows].sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? "")).map(row =>
      `<article><h2><a href="/${lang}/blog/${esc(row.slug)}">${esc(row.title)}</a></h2>${row.excerpt ? p(row.excerpt) : ""}</article>`),
  ]);

/* ─── Generic ───────────────────────────────────────────────── */
const genericFallback = (meta: RouteMeta) =>
  wrap(meta.lang, [
    h1(meta.title),
    p(meta.description),
    meta.faqs?.length
      ? meta.faqs
          .slice(0, 4)
          .map((f) => `<h2>${esc(plain(f.q))}</h2>${p(clamp(f.a, 45))}`)
          .join("")
      : "",
    bookCta(meta.lang),
  ]);

/** Route → its own no-JS summary. */
export const buildFallbackBody = (meta: RouteMeta): string => {
  const path = meta.path;
  const lang = meta.lang;

  // Paid-traffic pages never inherit global navigation or footer links.
  if (path === "/en/mva-playbook/thank-you") {
    return `<header><a href="/en" aria-label="JAY-23 — Home">JAY-23</a></header><main>${h1(playbook.thankTitle)}${p(playbook.thankBody)}${h2(playbook.upsellTitle)}${p(playbook.upsellBody)}<button type="button" disabled>${esc(playbook.upsellCta)}</button>${link("/en", playbook.decline)}</main>`;
  }
  if (path === "/en/mva-playbook") {
    const section = (title: string, body: string) => `<section>${h2(title)}${body}</section>`;
    return `<header><a href="/en" aria-label="JAY-23 — Home">JAY-23</a></header><main>${p(playbook.proof)}${h1(playbook.title)}${p(playbook.sub)}${link("#checkout", playbook.cta)}${p(playbook.micro)}${ul(playbook.results)}${p(playbook.resultsNote)}${section(playbook.problemTitle, ul(playbook.problems))}${section(playbook.mechanismTitle, p(playbook.mechanismIntro) + ul(playbook.commitments) + `<h3>${esc(playbook.systemTitle)}</h3>` + playbook.steps.map((step) => `<h4>${esc(step.title)}</h4>${p(step.body)}`).join(""))}${section(playbook.insideTitle, ul(playbook.inside))}${section(playbook.objectionTitle, p(playbook.objectionBody))}${section(playbook.categoryTitle, playbook.categories.map((category) => `<h3>${esc(category.title)}</h3>${p(category.body)}`).join(""))}${section(playbook.guaranteeTitle, p(playbook.guaranteeBody))}<section id="checkout">${h2("Yours today for $7")}${p("MVA Playbook (PDF) - $7")}${ul(ADD_ON_IDS.map((id) => { const product = PLAYBOOK_PRODUCTS[id]; return `${product.name} - $${product.price} - ${product.description}`; }))}${p("Total: $7")}${p(playbook.withdrawalConsent)}<button type="button" disabled>${esc(checkoutPayLabel(7, false))}</button>${p("Card, Apple Pay, Google Pay · Secure checkout · 30-day money-back guarantee")}</section>${section("FAQ", playbook.faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary>${p(faq.a)}</details>`).join(""))}</main>`;
  }

  if (meta.homepage) return homeFallback(lang);

  const landing = landingFallback(meta);
  if (landing) return landing;

  const slug = (meta.alias && meta.canonical ? new URL(meta.canonical).pathname : path).replace(/^\/(en|pl)/, "");
  const shared = sharedPageBody(slug, lang);
  if (shared) return wrap(lang, [/<h1\b/.test(shared) ? "" : h1(meta.title), shared]);
  switch (slug) {
    case "/about":
      return aboutFallback(lang);
    case "/faq":
      return faqFallback(lang);
    case "/process":
      return processFallback(lang);
    case "/book":
      return bookFallback(lang);
    case "/live":
      return liveFallback(lang);
    default:
      return genericFallback(meta);
  }
};

/**
 * Minimal markdown → HTML for the prerendered article body: headings, lists,
 * paragraphs. Enough for a crawler to read the whole article without JS.
 */
export const markdownToHtml = (md: string): string => {
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(`<ul>${list.map((i) => `<li>${esc(plain(i))}</li>`).join("")}</ul>`);
      list = [];
    }
  };
  for (const raw of md.split(/\n/)) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^!\[/.test(line)) continue;
    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      const level = Math.min(heading[1].length, 4);
      out.push(`<h${level}>${esc(plain(heading[2]))}</h${level}>`);
      continue;
    }
    if (/^([-*+]|\d+\.)\s+/.test(line)) {
      list.push(line.replace(/^([-*+]|\d+\.)\s+/, ""));
      continue;
    }
    const text = plain(line);
    if (text) {
      flush();
      out.push(`<p>${esc(text)}</p>`);
    }
  }
  flush();
  return out.join("");
};

/** Readable plain text of a prerendered body — used to build llms-full.txt. */
export const bodyToPlainText = (html: string) =>
  html
    .replace(/<\/(h1|h2|h3|h4|p|li|ul|nav|footer|main)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*/g, "\n\n")
    .trim();

/** The SPA shell body: a real 404 view, not a homepage impersonation. */
export const notFoundBody = () =>
  wrap("en", [
    "<h1>Page not found (404)</h1>",
    p("This URL does not exist. Use the links below to find what you were looking for."),
    link("/en", "JAY-23 home"),
    link("/en/blog", "Blog"),
    bookCta("en"),
  ]);
