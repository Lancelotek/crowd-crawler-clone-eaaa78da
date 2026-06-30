import { useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";
import { initCalendlyTracking } from "@/lib/gadsConversions";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const BookCall = () => {
  const { lang, langPrefix } = useLanguage();
  const isPL = lang === "pl";

  useEffect(() => {
    window.scrollTo(0, 0);
    track.pageView?.("book");

    // Load Calendly widget
    const existing = document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
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
        guarantee: "Bez sprzedaży. Bez prezentacji. Po prostu rozmowa.",
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
        guarantee: "No sales. No deck. Just a conversation.",
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
            <div className="rounded-2xl border border-white/8 bg-white overflow-hidden">
              <div
                className="calendly-inline-widget"
                data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0B0B0F&primary_color=6C3BFF`}
                style={{ minWidth: 320, height: 760 }}
              >
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  {t.loading}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default BookCall;
