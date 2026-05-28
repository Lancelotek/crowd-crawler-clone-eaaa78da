import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

/**
 * Ad-copy bridge banner — message-match between paid ad creative and landing page.
 * Only renders for Polish audience. Dismissible per session.
 */
const STORAGE_KEY = "adBridgeDismissed_v1";

interface Props {
  ctaTo?: string;
  ctaLabel?: string;
  source?: string;
}

const AdBridgeBanner = ({ ctaTo, ctaLabel, source = "ad-bridge" }: Props) => {
  const { lang, langPrefix } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lang !== "pl") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) !== "1") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [lang]);

  if (lang !== "pl" || !open) return null;

  const dismiss = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
  };

  const href = ctaTo ?? `${langPrefix}/book`;
  const label = ctaLabel ?? "Umów rozmowę";

  return (
    <div
      role="region"
      aria-label="Kampania Kickstarter — bridge"
      className="relative w-full"
      style={{
        background: "linear-gradient(90deg, #0a0a12 0%, #14102b 50%, #0a0a12 100%)",
        borderBottom: "1px solid rgba(103,61,255,0.25)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="container mx-auto max-w-[1200px] px-6 py-3 md:py-3.5 flex items-center gap-4">
        {/* Accent dot */}
        <span
          aria-hidden
          className="hidden sm:inline-block shrink-0"
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#673DFF",
            boxShadow: "0 0 0 4px rgba(103,61,255,0.18)",
          }}
        />

        {/* Headline */}
        <p
          className="flex-1 text-[13.5px] md:text-[15px] leading-snug"
          style={{ color: "#ededf3", letterSpacing: "-0.005em" }}
        >
          <span style={{ fontWeight: 700, color: "#fff" }}>
            Ruszasz z kampanią na Kickstarterze?
          </span>{" "}
          <span style={{ color: "rgba(237,237,243,0.78)" }}>
            Pomagamy zbudować{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>1000 fanów</span>{" "}
            <span style={{ color: "#673DFF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              przed
            </span>{" "}
            launchem.
          </span>
        </p>

        {/* CTA */}
        <Link
          to={href}
          onClick={() => track.ctaClick(source, "ad-bridge")}
          className="hidden sm:inline-flex items-center gap-1.5 shrink-0 rounded-lg transition-all hover:opacity-90"
          style={{
            background: "#10b981",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            padding: "8px 14px",
          }}
        >
          {label}
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>

        {/* Dismiss */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zamknij baner"
          className="shrink-0 rounded-md transition-colors"
          style={{
            color: "rgba(255,255,255,0.5)",
            padding: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        >
          <X size={16} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
};

export default AdBridgeBanner;
