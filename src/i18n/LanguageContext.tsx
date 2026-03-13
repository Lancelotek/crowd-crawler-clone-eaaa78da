import { createContext, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import type { Lang, TranslationKey } from "./translations";
import { t as translate } from "./translations";

interface LanguageContextType {
  lang: Lang;
  t: (section: TranslationKey, key: string) => string;
  switchLang: (newLang: Lang) => void;
  langPrefix: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const lang: Lang = paramLang === "pl" ? "pl" : "en";
  const langPrefix = `/${lang}`;

  const switchLang = (newLang: Lang) => {
    const currentPath = location.pathname;
    // Remove current lang prefix and add new one
    const pathWithoutLang = currentPath.replace(/^\/(en|pl)/, "") || "/";
    navigate(`/${newLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`);
  };

  const tFn = useMemo(
    () => (section: TranslationKey, key: string) => translate(section, key, lang),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t: tFn, switchLang, langPrefix }}>
      {children}
    </LanguageContext.Provider>
  );
}
