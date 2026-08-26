import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import type { Lang } from "./translations";

function detectLanguage(): Lang {
  // Check localStorage first
  const stored = localStorage.getItem("preferred-lang");
  if (stored === "pl" || stored === "en") return stored;

  // Check browser language
  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  if (browserLang.startsWith("pl")) return "pl";

  return "en";
}

type SeoMeta = { title: string; description: string };

const BASE_TITLE = "JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency | MVA Framework";
const BASE_DESCRIPTION = "The 90-day MVA Framework for Kickstarter, TikTok Shop, SaaS and sales-led launches: Meta Ads, creator commerce, email funnels and community activation that took 46 campaigns past $1.2M raised.";

const BARE_PATH_SEO: Record<string, SeoMeta> = {
  "/": {
    title: "JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency (EN / PL)",
    description: BASE_DESCRIPTION,
  },
  "/book": {
    title: "Book a Free Kickstarter Strategy Call | JAY-23",
    description: "30-minute free call with a prelaunch growth expert. We'll audit your funnel, estimate your CPL, and map a 90-day plan to 1,000 fans before Kickstarter, TikTok Shop, SaaS or sales-led launch.",
  },
  "/process": {
    title: "How to Promote a Kickstarter — 90-Day Process | JAY-23",
    description: "The 90-day process to promote a Kickstarter campaign: persona research, Meta Ads, email funnel, and launch-day push. Step-by-step.",
  },
  "/thank-you": {
    title: "Thank You — Request Received | JAY-23",
    description: "Thanks for reaching out to JAY-23. Next steps for your Kickstarter, TikTok Shop, SaaS or sales-led prelaunch strategy and how to join the founder community.",
  },
  "/blog": {
    title: "Kickstarter & Crowdfunding Marketing Blog | JAY-23",
    description: "Tactics for promoting Kickstarter campaigns, audience building, and crowdfunding marketing. Lessons from 46 campaigns and $1.2M+ raised.",
  },
  "/packages": {
    title: "Kickstarter Agency Pricing — MVA Packages | JAY-23",
    description: "Transparent pricing for prelaunch growth. MVA packages from $1,500/mo — 90 days, Meta Ads, email funnel, community activation for Kickstarter, TikTok Shop, SaaS and sales-led launches.",
  },
  "/quiz": {
    title: "Kickstarter Calculator — How Many Fans Do You Need? | JAY-23",
    description: "Free MVA calculator. Find out how many true fans you need to hit your Kickstarter or Indiegogo goal. Personalized result in 2 minutes.",
  },
  "/lp": {
    title: "Build 1,000 Kickstarter Fans Before Launch | MVA — JAY-23",
    description: "The 90-day program that gets Kickstarter founders to 1,000 true fans before launch day. Meta Ads + email funnels + community.",
  },
  "/privacy-policy": {
    title: "Privacy Policy (EN / PL) — JAY23 LLC",
    description: "Pick your language for the JAY23 LLC privacy policy: data collection, GDPR & CCPA rights, retention, and contact details.",
  },
  "/impressum": {
    title: "Impressum / Legal Notice — JAY23 LLC",
    description: "Legal notice and company information for JAY23 LLC, the entity behind JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency.",
  },
  "/terms-of-service": {
    title: "Terms of Service — JAY-23",
    description: "Terms governing your use of JAY-23 services, the MVA Framework program, and the jay23.com website.",
  },
  "/faq": {
    title: "Kickstarter Prelaunch FAQ — Pricing, Process, Results | JAY-23",
    description: "Answers about promoting a Kickstarter campaign, MVA pricing, the 90-day process, expected CPL, and working with JAY-23.",
  },
  "/about": {
    title: "About JAY-23 — Kickstarter, TikTok Shop, SaaS & Sales Growth Agency by Marek Cieśla",
    description: "JAY-23 is a prelaunch growth agency founded by Marek Cieśla. Kickstarter, TikTok Shop, SaaS and sales-led launches — 46 campaigns, $1.2M+ raised.",
  },
};

function getBareSeo(pathname: string): SeoMeta {
  if (BARE_PATH_SEO[pathname]) return BARE_PATH_SEO[pathname];
  if (pathname.startsWith("/blog/")) {
    return {
      title: "Article | Articles by JAY-23",
      description: "Insights on prelaunch growth, audience building, and the MVA Framework from JAY-23.",
    };
  }
  return {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
  };
}

/** Redirects bare paths (e.g. "/" or "/blog") to the language-prefixed version */
export function LanguageRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = detectLanguage();
  const path = location.pathname === "/" ? "" : location.pathname;
  const enTarget = `/en${path}`;
  const plTarget = `/pl${path}`;
  const seo = getBareSeo(location.pathname);

  // Defer navigation to next tick so Helmet has a chance to inject canonical/hreflang
  // tags into <head>. JS-executing crawlers will see the canonical pointing to /en
  // before the client-side redirect fires, consolidating duplicate-content signals.
  useEffect(() => {
    const id = window.setTimeout(() => {
      navigate(`/${lang}${path}`, { replace: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [lang, path, navigate]);

  return (
    <SEOHead
      title={seo.title}
      description={seo.description}
      canonical={enTarget || "/en"}
      hreflangOverrides={{ en: enTarget || "/en", pl: plTarget || "/pl" }}
    />
  );
}


/** Store language preference when user explicitly switches */
export function useStoreLanguagePreference(lang: Lang) {
  useEffect(() => {
    localStorage.setItem("preferred-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
}
