import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

/**
 * Google Ads message-match banner.
 * Renders only on PL pages AND only when arriving from Google Ads
 * (URL contains `gclid` or `utm_source=google`). Dismissible per session.
 */
const STORAGE_KEY = "ks_banner_dismissed";

interface Props {
  source?: string;
}

const KickstarterBanner = ({ source = "ks-banner" }: Props) => {
  const { lang, langPrefix } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lang !== "pl" || typeof window === "undefined") return;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { /* ignore */ }
    const params = new URLSearchParams(window.location.search);
    const fromAds = params.has("gclid") || params.get("utm_source") === "google";
    setVisible(fromAds && !dismissed);
  }, [lang]);

  if (lang !== "pl" || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
  };

  return (
    <div
      role="region"
      aria-label="Kickstarter — konsultacja"
      className="sticky top-0 z-[60] w-full bg-orange-500 text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-3">
        <p className="flex-1 text-sm md:text-base font-medium leading-snug">
          🚀 Ruszasz z kampanią na Kickstarterze?{" "}
          <Link
            to={`${langPrefix}/book`}
            onClick={() => track.ctaClick(source, "ks-banner")}
            className="underline font-semibold hover:text-white/90"
          >
            Zacznij od bezpłatnej konsultacji →
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zamknij baner"
          className="shrink-0 text-white/80 hover:text-white p-1"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default KickstarterBanner;
