import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/mva/HeroSection";
import ColdLaunchTrapSection from "@/components/mva/ColdLaunchTrapSection";
import FrameworkComparisonSection from "@/components/mva/FrameworkComparisonSection";
import CaseStudyDeepSection from "@/components/mva/CaseStudyDeepSection";
import PricingValueSection from "@/components/mva/PricingValueSection";
import { track } from "@/lib/tracking";

const RESULTS = [
  "4.5X ROAS — Real Estate Book Funnel",
  "8.6X ROAS — Real Estate VSL",
  "CPA Decreased 24% — Low Ticket",
  "Sales Increased 52% — Low Ticket",
  "$300K Raised — Evergreen Webinar",
  "27X ROAS — $47 Digital Course (buried creative)",
];

const LP = () => {
  const { t, lang, langPrefix } = useLanguage();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("ref") || "direct";
  const bookLink = `${langPrefix}/book?source=lp&ref=${source}`;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a12", color: "#fff" }}>
      <SEOHead
        title={lang === "pl" ? "MVA Framework — Zbuduj publiczność przed startem" : "MVA Framework — Build Your Audience Before Launch"}
        description={lang === "pl" ? "90-dniowy program dla founderów. 46 kampanii, $1.2M+ zebranych." : "90-day program for founders. 46 campaigns, $1.2M+ raised."}
        canonical={`/${lang}/lp`}
        lang={lang}
        noIndex

      />

      {/* Announcement bar */}
      <div style={{ background: "#673DFF", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "13px", fontWeight: 600 }}>
        <span>{t("lp", "announcementBar")}</span>
        <Link to={bookLink} onClick={() => track.bookingClick("lp-announcement")} style={{ color: "#fff", textDecoration: "underline" }}>
          {t("lp", "announcementCta")}
        </Link>
      </div>

      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link to={`${langPrefix}`} className="font-display text-lg font-extrabold tracking-tight" style={{ color: "#fff" }}>
          JAY-23
        </Link>
        <span style={{ fontSize: "13px", color: "#6e6e77" }}>hello@jay23.com</span>
      </header>

      <main>
        <HeroSection />

        <ColdLaunchTrapSection />

        <FrameworkComparisonSection />

        <CaseStudyDeepSection />

        {/* Results grid */}
        <section className="px-6" style={{ background: "#0a0a12", padding: "80px 24px" }}>
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#673DFF", textTransform: "uppercase", marginBottom: "24px", textAlign: "center" }}>
              {t("lp", "resultsLabel")}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {RESULTS.map((r, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#ededf3" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingValueSection />

        {/* Final CTA */}
        <section className="px-6 text-center" style={{ background: "#0a0a12", padding: "80px 24px" }}>
          <div className="mx-auto" style={{ maxWidth: "600px" }}>
            <h2 style={{ fontFamily: "'Rajdhani', 'Inter', sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", marginBottom: "24px" }}>
              {t("lp", "finalHeadline")}
            </h2>
            <Link
              to={bookLink}
              onClick={() => track.bookingClick("lp-final")}
              className="inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all animate-pulse-cta"
              style={{ background: "#10b981", color: "#fff", padding: "16px 40px", marginBottom: "12px" }}
            >
              {t("lp", "finalCta")}
            </Link>
            <p style={{ fontSize: "13px", color: "#6e6e77" }}>
              {t("lp", "finalTrust")}
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: "12px", color: "#6e6e77" }}>
          © 2025 JAY-23 ·{" "}
          <Link to={`${langPrefix}/privacy-policy`} style={{ color: "#6e6e77", textDecoration: "underline" }}>Privacy Policy</Link>{" "}·{" "}
          <Link to={`${langPrefix}/terms-of-service`} style={{ color: "#6e6e77", textDecoration: "underline" }}>Terms</Link>
        </p>
      </footer>
    </div>
  );
};

export default LP;
