import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
  return <Navigate to={`/${lang}${path}`} replace />;
}

/** Store language preference when user explicitly switches */
export function useStoreLanguagePreference(lang: Lang) {
  useEffect(() => {
    localStorage.setItem("preferred-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
}
