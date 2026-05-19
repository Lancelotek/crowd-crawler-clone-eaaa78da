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

const BARE_PATH_SEO: Record<string, SeoMeta> = {
  "/": {
    title: "JAY-23 — Crowdfunding Prelaunch Agency (Choose Language: EN / PL)",
    description: "Language selector for JAY-23. Pick English or Polish to explore the 90-day MVA Framework, case studies, and pricing for crowdfunding prelaunch.",
  },
  "/book": {
    title: "Book a Strategy Call with JAY-23 | Free 30-min Consultation",
    description: "Schedule a free 30-minute crowdfunding prelaunch strategy call with JAY-23. Map your MVA, audit your funnel, and plan a launch that actually converts.",
  },
  "/process": {
    title: "Our 90-Day MVA Process | Discover, Build, Launch — JAY-23",
    description: "How JAY-23 builds your Minimum Viable Audience in 90 days: Discover the niche, Build the funnel, Launch with momentum. Step-by-step crowdfunding prep.",
  },
  "/thank-you": {
    title: "Thank You — Your Request Was Received | JAY-23",
    description: "Thanks for reaching out to JAY-23. Next steps for your prelaunch crowdfunding strategy and how to join our founder community.",
  },
  "/blog": {
    title: "Articles by JAY-23 | Crowdfunding & Prelaunch Marketing Insights",
    description: "Tactics, frameworks, and case studies on crowdfunding prelaunch, audience building, and Kickstarter campaigns from the JAY-23 team.",
  },
  "/packages": {
    title: "MVA Packages & Pricing | Prelaunch Marketing by JAY-23",
    description: "Compare JAY-23 prelaunch crowdfunding packages. 90-day MVA programs with Meta Ads, email funnels, and community activation. Transparent pricing.",
  },
  "/quiz": {
    title: "MVA Calculator — How Many Fans Do You Need? | JAY-23",
    description: "Free quiz that calculates your Minimum Viable Audience for a successful crowdfunding launch. Get a personalized number in under 2 minutes.",
  },
  "/lp": {
    title: "Build 1,000 True Fans Before Launch | MVA Framework — JAY-23",
    description: "The 90-day program that gets crowdfunding founders to 1,000 true fans before they launch. Meta Ads + email funnels + community.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Data Protection & Your Rights | JAY-23 (EN & PL)",
    description: "Redirecting to the JAY-23 privacy policy in your preferred language. Learn how JAY23 LLC handles personal data and your GDPR/CCPA rights.",
  },
  "/impressum": {
    title: "Impressum / Legal Notice | JAY23 LLC",
    description: "Legal notice and company information for JAY23 LLC, the entity behind the JAY-23 MVA Framework.",
  },
  "/terms-of-service": {
    title: "Terms of Service | JAY-23 MVA Framework",
    description: "Terms governing your use of JAY-23 services, the MVA Framework program, and our website.",
  },
  "/faq": {
    title: "Frequently Asked Questions | JAY-23 MVA Framework",
    description: "Answers to common questions about JAY-23, the 90-day MVA program, pricing, deliverables, and crowdfunding prelaunch strategy.",
  },
  "/about": {
    title: "About JAY-23 — Founder-Led Prelaunch Marketing Agency",
    description: "Meet Marek Cieśla and the team behind JAY-23. 46 campaigns, $1.2M+ raised, and a founder-first approach to crowdfunding prelaunch.",
  },
};

function getBareSeo(pathname: string): SeoMeta {
  if (BARE_PATH_SEO[pathname]) return BARE_PATH_SEO[pathname];
  if (pathname.startsWith("/blog/")) {
    return {
      title: "Article | Articles by JAY-23",
      description: "Insights on crowdfunding prelaunch, audience building, and the MVA Framework from JAY-23.",
    };
  }
  return {
    title: "JAY-23 — Crowdfunding Prelaunch Marketing Agency",
    description: "JAY-23 helps founders build 1,000 true fans before launch with the 90-day MVA Framework.",
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
