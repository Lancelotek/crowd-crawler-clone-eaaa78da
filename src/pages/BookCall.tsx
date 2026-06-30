import { useEffect, useState } from "react";
import { ArrowLeft, Check, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { initCalendlyTracking } from "@/lib/gadsConversions";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";


const BookCall = () => {
  const { lang, langPrefix } = useLanguage();
  const isPL = lang === "pl";
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
    const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

    // Preload CSS so Calendly's first paint is faster
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    const existing = document.querySelector(`script[src*="assets.calendly.com/assets/external/widget.js"]`) as HTMLScriptElement | null;

    const markLoaded = () => {
      const tryDetect = () => {
        const iframe = document.querySelector(".calendly-inline-widget iframe");
        if (iframe) {
          setLoaded(true);
          return true;
        }
        return false;
      };
      if (tryDetect()) return;
      const interval = window.setInterval(() => {
        if (tryDetect()) window.clearInterval(interval);
      }, 120);
      window.setTimeout(() => {
        window.clearInterval(interval);
        if (!document.querySelector(".calendly-inline-widget iframe")) {
          setFailed(true);
        }
      }, 10000);
    };

    if (!existing) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = markLoaded;
      s.onerror = () => setFailed(true);
      document.head.appendChild(s);
    } else {
      markLoaded();
    }

    initCalendlyTracking();
  }, []);



  const t = isPL
    ? {
        eyebrow: "Bezpłatna rozmowa · 30 minut",
        h1Lead: "Umów discovery call",
        h1Accent: "z JAY-23",
        sub: "30 minut, bez zobowiązań, bez pitchu. Opowiadasz, co budujesz — wychodzisz z konkretnym pomysłem na pierwszy krok.",
        bullets: [
          "Krótka analiza Twojego pomysłu lub etapu",
          "Konkretne wskazówki dopasowane do Twojego rynku",
          "Jasna odpowiedź, czy i jak możemy pomóc",
        ],
        back: "Wróć na stronę główną",
        loading: "Ładowanie kalendarza…",
        loadingHint: "Łączymy się z Calendly. Może to chwilę potrwać przy wolniejszym połączeniu.",
        guarantee: "Bez sprzedaży. Bez prezentacji. Po prostu rozmowa.",
        fallbackTitle: "Kalendarz nie chce się załadować?",
        fallbackHint: "Otwórz Calendly w nowej karcie — wszystkie wolne terminy znajdziesz tam.",
        openExternal: "Otwórz Calendly",
      }
    : {
        eyebrow: "Free call · 30 minutes",
        h1Lead: "Book a discovery call",
        h1Accent: "with JAY-23",
        sub: "30 minutes, no commitment, no pitch. You tell us what you're building — you leave with a concrete first step.",
        bullets: [
          "Quick read on your idea or current stage",
          "Concrete advice tailored to your market",
          "Clear answer on whether and how we can help",
        ],
        back: "Back to homepage",
        loading: "Loading calendar…",
        loadingHint: "Connecting to Calendly. This can take a moment on slower connections.",
        guarantee: "No sales. No deck. Just a conversation.",
        fallbackTitle: "Calendar not loading?",
        fallbackHint: "Open Calendly in a new tab — all available slots are there.",
        openExternal: "Open Calendly",
      };

  return (
    <>
      <SEOHead
        title={isPL ? "Umów discovery call — JAY-23" : "Book a discovery call — JAY-23"}
        description={t.sub}
        canonical={`/${lang}/book`}
        lang={lang}
        hreflangOverrides={{ en: "/en/book", pl: "/pl/book" }}
      />
      <MvaNavbar />

      <main className="bg-[hsl(var(--dark-bg))] min-h-screen pt-28 pb-20">
        <div className="container mx-auto max-w-[1100px] px-6">
          <Link
            to={langPrefix || "/"}
            className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft size={14} /> {t.back}
          </Link>

          <div className="grid lg:grid-cols-[1fr,1.4fr] gap-12 items-start">
            {/* LEFT — copy */}
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-primary/80 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(34px,4.4vw,56px)] font-black uppercase leading-[1.02] tracking-tight text-white mb-6">
                {t.h1Lead} <span className="text-primary">{t.h1Accent}</span>.
              </h1>
              <p className="text-[16px] text-white/60 font-light leading-relaxed mb-8 max-w-[440px]">
                {t.sub}
              </p>

              <ul className="space-y-3 mb-10">
                {t.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-white/75 font-light leading-relaxed">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[13px] text-white/40 font-light border-t border-white/8 pt-5 max-w-[380px]">
                {t.guarantee}
              </p>
            </div>

            {/* RIGHT — Calendly embed */}
            <div className="relative rounded-2xl border border-white/8 bg-white overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[720px]">
              {/* Calendly inline widget begin */}
              <div
                className="calendly-inline-widget w-full h-[560px] sm:h-[640px] lg:h-[720px]"
                data-url={CALENDLY_URL}
                style={{ minWidth: 280 }}
              />
              {/* Calendly inline widget end */}

              {/* Loading placeholder — sits underneath; Calendly's iframe covers it once ready */}
              {!loaded && !failed && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Loader2 size={22} className="text-primary animate-spin" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[15px] font-medium text-[hsl(var(--dark-bg))]">{t.loading}</p>
                    <p className="text-[13px] text-black/50 max-w-[280px] leading-relaxed">{t.loadingHint}</p>
                  </div>
                  {/* Skeleton grid */}
                  <div className="mt-2 grid grid-cols-7 gap-1.5 opacity-60">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded bg-black/5 animate-pulse" />
                    ))}
                  </div>
                </div>
              )}

              {/* Failure fallback */}
              {failed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center bg-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Calendar size={22} className="text-primary" />
                  </div>
                  <div className="space-y-1.5 max-w-[320px]">
                    <p className="text-[15px] font-semibold text-[hsl(var(--dark-bg))]">{t.fallbackTitle}</p>
                    <p className="text-[13px] text-black/55 leading-relaxed">{t.fallbackHint}</p>
                  </div>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                  >
                    {t.openExternal} <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BookCall;
