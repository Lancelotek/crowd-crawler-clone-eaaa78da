import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
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

/** Redirects bare paths (e.g. "/" or "/blog") to the language-prefixed version */
export function LanguageRedirect() {
  const location = useLocation();
  const lang = detectLanguage();
  const path = location.pathname === "/" ? "" : location.pathname;
  const isRoot = location.pathname === "/";
  const enTarget = `/en${path}`;
  const plTarget = `/pl${path}`;
  return (
    <>
      <SEOHead
        title={isRoot
          ? "Crowdfunding Prelaunch Marketing Agency | JAY-23"
          : "JAY-23 — MVA Framework"}
        description="JAY-23 helps founders build 1,000 true fans before launch. 90-day MVA program with Meta Ads, email funnels & community building. 46 campaigns, $1.2M+ raised."
        canonical={location.pathname}
        hreflangOverrides={{ en: enTarget, pl: plTarget }}
      />
      <Navigate to={`/${lang}${path}`} replace />
    </>
  );
}

/** Store language preference when user explicitly switches */
export function useStoreLanguagePreference(lang: Lang) {
  useEffect(() => {
    localStorage.setItem("preferred-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
}
