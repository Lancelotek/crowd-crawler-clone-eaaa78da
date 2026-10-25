import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";
import caseWoolet from "@/assets/case-woolet.webp";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

const HeroSection = () => {
  const [heroRef, heroVisible] = useInView(0.1);
  const { t, langPrefix } = useLanguage();

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ background: "#0a0a12", padding: "140px 24px 100px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-30%", right: "-15%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>
      <div className="container mx-auto max-w-[1200px] relative z-10 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:items-center">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <div className="flex items-center gap-2 mb-6" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>{t("hero", "eyebrow")}</span>

            </div>
            <h1 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-1.8px", color: "#fff", marginBottom: "20px", textTransform: "uppercase", animation: heroVisible ? "fadeSlideUp 0.7s ease 0.2s both" : "none" }}>
              <span dangerouslySetInnerHTML={{ __html: t("hero", "h1_line1").replace(/SaaS &amp; eCommerce|SaaS & eCommerce|46|(\$1\.2M\+)/g, '<span style="color:#673DFF">$&</span>') }} />
              <br />
              {t("hero", "h1_line2")}
            </h1>
            <p style={{ fontSize: "18px", lineHeight: 1.65, color: "#ededf3", maxWidth: "460px", marginBottom: "32px", animation: heroVisible ? "fadeSlideUp 0.7s ease 0.3s both" : "none" }}>
              {t("hero", "hook")}{" "}
              <span style={{ fontWeight: 600 }}>{t("hero", "hookBold")}</span>
              {t("hero", "hookEnd") ? ` ${t("hero", "hookEnd")}` : ""}
            </p>
            {/* CTAs */}
            <div className="flex flex-col gap-3" style={{ marginBottom: "16px", animation: heroVisible ? "fadeSlideUp 0.6s ease 0.4s both" : "none" }}>
              <Link
                to={`${langPrefix}/book`}
                onClick={() => track.bookingClick("hero")}
                className="cta-green inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 font-bold text-sm transition-all"
                style={{ width: "fit-content" }}
              >
                {t("hero", "ctaPrimary")}
              </Link>
              <Link
                to={`${langPrefix}/quiz`}
                onClick={() => track.ctaClick("hero", "quiz")}
                className="inline-flex items-center min-h-[44px] text-[15px] text-[#c4c4cc] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                style={{ width: "fit-content" }}
              >
                {t("hero", "ctaSecondary")}
              </Link>
            </div>
            {/* Trust bar */}
            <p style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 400, marginBottom: "40px", animation: heroVisible ? "fadeSlideUp 0.5s ease 0.45s both" : "none" }}>
              {t("hero", "trustBar")}
            </p>
            {/* Social proof - the strongest claim on the page, so it gets real contrast */}
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-1.5" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.5s both" : "none" }}>
              {(["trustedBy", "raised", "leads"] as const).map((k) => (
                <li key={k} className="flex items-center gap-2 text-[13px] font-medium text-[#d4d4dc] whitespace-nowrap">
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#10b981]" />
                  {t("hero", k)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Proof the visitor can check: one real campaign, desktop only (mobile gets the same story further down) */}
        <figure className="hidden lg:block" style={{ animation: heroVisible ? "fadeSlideUp 0.7s ease 0.35s both" : "none" }}>
          <div className="rounded-card overflow-hidden border border-white/10 bg-white/[0.03]">
            <img src={caseWoolet} alt="Woolet smart wallet" width={800} height={600} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            <div className="p-6">
              <p className="eyebrow eyebrow-dark mb-3">Case study · Woolet</p>
              <p className="font-display font-extrabold text-white leading-none" style={{ fontSize: "56px", letterSpacing: "-1.8px" }}>
                {t("caseStudyDeep", "result1Value")}
              </p>
              <p className="text-[14px] text-white/70 mt-1 mb-5">{t("caseStudyDeep", "result1Label")}</p>
              <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <dt className="sr-only">{t("caseStudyDeep", "result2Label")}</dt>
                  <dd className="font-display text-2xl font-extrabold text-white leading-none">{t("caseStudyDeep", "result2Value")}</dd>
                  <dd className="text-[13px] text-white/65 mt-1">{t("caseStudyDeep", "result2Label")}</dd>
                </div>
                <div>
                  <dt className="sr-only">{t("caseStudyDeep", "result3Label")}</dt>
                  <dd className="font-display text-2xl font-extrabold text-[#10b981] leading-none">{t("caseStudyDeep", "result3Value")}</dd>
                  <dd className="text-[13px] text-white/65 mt-1">{t("caseStudyDeep", "result3Label")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;
