import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

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
      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <div className="flex items-center gap-2 mb-6" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>{t("hero", "eyebrow")}</span>

            </div>
            <h1 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.018em", color: "#fff", marginBottom: "20px", textTransform: "uppercase", animation: heroVisible ? "fadeSlideUp 0.7s ease 0.2s both" : "none" }}>
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
                className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all animate-pulse-cta"
                style={{ background: "#10b981", color: "#fff", padding: "16px 32px", width: "fit-content" }}
              >
                {t("hero", "ctaPrimary")}
              </Link>
              <Link
                to={`${langPrefix}/quiz`}
                onClick={() => track.ctaClick("hero", "quiz")}
                className="transition-colors"
                style={{ fontSize: "14px", color: "#6e6e77", width: "fit-content", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.color = "#ededf3"; }}
                onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; e.currentTarget.style.color = "#6e6e77"; }}
              >
                {t("hero", "ctaSecondary")}
              </Link>
            </div>
            {/* Trust bar */}
            <p style={{ fontSize: "13px", color: "#6e6e77", fontWeight: 300, marginBottom: "40px", animation: heroVisible ? "fadeSlideUp 0.5s ease 0.45s both" : "none" }}>
              {t("hero", "trustBar")}
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-4 flex-wrap" style={{ animation: heroVisible ? "fadeSlideUp 0.6s ease 0.5s both" : "none" }}>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B"><path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77 5.06 16.3 6 10.8 2 6.9l5.53-.89L10 1z" /></svg>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{t("hero", "trustedBy")}</span>
              </div>
              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{t("hero", "raised")}</span>
              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{t("hero", "leads")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
