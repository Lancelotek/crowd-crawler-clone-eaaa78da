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

const wrap = (blocks: string[]) => `<main>\n      ${blocks.filter(Boolean).join("\n      ")}\n    </main>`;

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
  return wrap([
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
  wrap([
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
      `${t.howItWorks.phase1Label[lang]} · ${t.howItWorks.phase1Title[lang]} — ${clamp(t.howItWorks.phase1Desc[lang], 20)}`,
      `${t.howItWorks.phase2Label[lang]} · ${t.howItWorks.phase2Title[lang]} — ${clamp(t.howItWorks.phase2Desc[lang], 20)}`,
      `${t.howItWorks.phase3Label[lang]} · ${t.howItWorks.phase3Title[lang]} — ${clamp(t.howItWorks.phase3Desc[lang], 20)}`,
    ]),
    h2(`${t.whatYouGet.title[lang]} ${t.whatYouGet.titleAccent[lang]}`),
    ul([
      `${t.whatYouGet.f1Title[lang]} — ${t.whatYouGet.f1Desc[lang]}`,
      `${t.whatYouGet.f2Title[lang]} — ${t.whatYouGet.f2Desc[lang]}`,
      `${t.whatYouGet.f3Title[lang]} — ${t.whatYouGet.f3Desc[lang]}`,
      `${t.whatYouGet.f4Title[lang]} — ${t.whatYouGet.f4Desc[lang]}`,
    ]),
    bookCta(lang),
  ]);

/* ─── Core pages ────────────────────────────────────────────── */
const aboutFallback = (lang: "en" | "pl") => {
  const c = ABOUT_COPY[lang];
  return wrap([
    h1(c.heroTitle),
    p(c.heroSub),
    h2(`${c.founderName} — ${c.founderTitle}`),
    p(c.bio1),
    p(c.bio2),
    h2(c.whatWeDoTitle),
    ul([
      `${c.card1Title} — ${c.card1Desc}`,
      `${c.card2Title} — ${c.card2Desc}`,
      `${c.card3Title} — ${c.card3Desc}`,
    ]),
    ul([c.stat1, c.stat2, c.stat3, c.stat4]),
    h2(c.ctaTitle),
    bookCta(lang),
  ]);
};

const faqFallback = (lang: "en" | "pl") => {
  const c = FAQ_COPY[lang];
  return wrap([
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
  wrap([
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
  wrap([
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
  return wrap([
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
  const paras = (row.content ?? "")
    .split(/\n{2,}/)
    .map((block) => plain(block))
    .filter((block) => block.length > 80)
    .slice(0, 4)
    .map((block) => p(clamp(block, 90)));

  return wrap([
    h1(row.title),
    row.excerpt ? p(row.excerpt) : "",
    ...paras,
    link(`/${lang}/blog`, label(lang, "All articles by JAY-23", "Wszystkie artykuły JAY-23")),
    bookCta(lang, "blog"),
  ]);
};

/* ─── Generic ───────────────────────────────────────────────── */
const genericFallback = (meta: RouteMeta) =>
  wrap([
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

  if (meta.homepage) return homeFallback(lang);

  const landing = landingFallback(meta);
  if (landing) return landing;

  const slug = path.replace(/^\/(en|pl)/, "");
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
