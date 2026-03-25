import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, Shield, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const CALENDLY_URL = "https://calendly.com/marekciesla/30min";

const TICKER_ITEMS = [
  { name: "Piotr K.", gender: "m", time: { en: "last week", pl: "w zeszłym tygodniu" } },
  { name: "Agnieszka M.", gender: "f", time: { en: "last week", pl: "w zeszłym tygodniu" } },
  { name: "Krzysztof B.", gender: "m", time: { en: "last week", pl: "w zeszłym tygodniu" } },
  { name: "Marta W.", gender: "f", time: { en: "last week", pl: "w zeszłym tygodniu" } },
  { name: "Tomasz J.", gender: "m", time: { en: "2 weeks ago", pl: "2 tygodnie temu" } },
  { name: "Karolina R.", gender: "f", time: { en: "2 weeks ago", pl: "2 tygodnie temu" } },
];

const AVATARS = [
  { initials: "JR", bg: "hsl(var(--primary))" },
  { initials: "ST", bg: "#10B981" },
  { initials: "DM", bg: "#F59E0B" },
  { initials: "EL", bg: "hsl(var(--destructive))" },
];

/* ── Video Placeholder (Loom/Vimeo-ready) ─────────────────── */
function VideoPlaceholder() {
  return (
    <div
      data-video-slot="loom"
      className="relative w-full overflow-hidden rounded-xl border border-border/30"
      style={{ paddingBottom: "56.25%", maxWidth: 560, background: "#0a0a12" }}
    >
      {/* Play icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Play className="w-7 h-7 text-primary fill-primary ml-0.5" />
        </div>
        <span className="text-[13px] text-muted-foreground/50 font-medium">
          Wideo pojawi się wkrótce
        </span>
      </div>
    </div>
  );
}

/* ── Founder Attribution ──────────────────────────────────── */
function FounderAttribution() {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
        MC
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground leading-tight">Marek Cieśla</span>
        <span className="text-[13px] text-muted-foreground leading-tight">
          Founder JAY-23 · 46 kampanii · $1.2M+ zebranych
        </span>
      </div>
    </div>
  );
}

/* ── Ticker ─────────────────────────────────────────────── */
function Ticker({ lang }: { lang: "en" | "pl" }) {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="overflow-hidden mb-8"
      style={{
        maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)",
      }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: "ticker 22s linear infinite" }}>
        {doubled.map((item, i) => {
          const verb = lang === "pl"
            ? (item.gender === "f" ? "umówiła rozmowę" : "umówił rozmowę")
            : "booked a call";
          return (
            <div key={i} className="inline-flex items-center gap-1.5 px-5 text-xs text-muted-foreground/50">
              <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-muted-foreground font-semibold">{item.name}</span>
              {" "}{verb} · {item.time[lang]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Calendly Modal ──────────────────────────────────────── */
function CalendarModal({ open, onClose, url }: { open: boolean; onClose: () => void; url: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-[720px] overflow-hidden shadow-2xl"
          >
            <div className="bg-foreground p-3.5 px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-blink" />
                <span className="text-sm font-semibold text-white">Book your free strategy call</span>
              </div>
              <button
                onClick={onClose}
                className="bg-transparent border border-white/15 text-white/60 w-7 h-7 rounded-md cursor-pointer text-base flex items-center justify-center hover:text-white/90 transition-colors"
              >
                ✕
              </button>
            </div>
            <iframe
              src={url}
              width="100%"
              height="660"
              frameBorder="0"
              title="Book a call"
              className="block"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main Page ───────────────────────────────────────────── */
const BookCall = () => {
  const { t, lang, langPrefix } = useLanguage();
  const [calOpen, setCalOpen] = useState(false);
  const [slots, setSlots] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.65) setSlots((s) => Math.max(s - 1, 1));
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const bullets = [
    { title: t("bookCall", "bullet1Title"), desc: t("bookCall", "bullet1Desc") },
    { title: t("bookCall", "bullet2Title"), desc: t("bookCall", "bullet2Desc") },
    { title: t("bookCall", "bullet3Title"), desc: t("bookCall", "bullet3Desc") },
  ];

  return (
    <>
      <SEOHead
        title={t("bookCall", "seoTitle")}
        description={t("bookCall", "seoDesc")}
        canonical={`${langPrefix}/book`}
      />

      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>

      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10 md:py-16">
          {/* Back link */}
          <Link
            to={langPrefix}
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground/50 hover:text-muted-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("bookCall", "back")}
          </Link>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-blink" />
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              {t("bookCall", "eyebrow")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5"
          >
            {t("bookCall", "h1_1")}
            <br />
            <span className="text-primary">{t("bookCall", "h1_2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8 max-w-xl"
          >
            {t("bookCall", "subtitle")}{" "}
            <strong className="text-foreground">{t("bookCall", "subtitleBold")}</strong>
            {" "}{t("bookCall", "subtitleEnd")}
          </motion.p>

          {/* ── Video ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10"
          >
            <YouTubeEmbed videoId={lang === "pl" ? YOUTUBE_VIDEO_ID_PL : YOUTUBE_VIDEO_ID_EN} />
          </motion.div>

          {/* ── Bullets ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4 mb-10"
          >
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{b.title}</strong>
                  {" — "}
                  {b.desc}
                </p>
              </div>
            ))}
          </motion.div>

          {/* ── Social proof ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="flex -space-x-2">
              {AVATARS.map((a, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: a.bg }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("bookCall", "socialProof")} ·{" "}
              <span className="text-primary font-semibold">{t("bookCall", "rating")}</span>
            </p>
          </motion.div>

          {/* ── Urgency bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-destructive/10 border border-destructive/25 rounded-[10px] p-2.5 px-4 flex items-center gap-2.5 mb-7"
          >
            <div className="w-2 h-2 rounded-full bg-destructive animate-blink shrink-0" />
            <div className="text-[13px] text-destructive/80 font-medium">
              {t("bookCall", "slotsLeft").replace("{slots}", String(slots))}
            </div>
            <div className="ml-auto text-xs font-bold text-destructive bg-destructive/15 py-0.5 px-2.5 rounded-full shrink-0">
              {slots} / 10
            </div>
          </motion.div>

          {/* ── CTA button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-6"
          >
            <button
              onClick={() => { setCalOpen(true); track.bookingClick("book_page"); }}
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-4.5 px-8 rounded-[var(--radius-button)] text-base font-bold animate-pulse-cta hover:bg-primary/90 hover:shadow-[0_8px_36px_hsl(var(--primary)/0.45)] hover:translate-y-[-1px] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-5 h-5" />
              {t("bookCall", "ctaBtn")}
              <span className="text-primary-foreground/60">→</span>
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" />
              {t("bookCall", "ctaSub")}
            </p>
          </motion.div>

          {/* ── Slots bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-3.5 px-4.5 mb-6"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs text-muted-foreground/50 font-medium">{t("bookCall", "slotsLabel")}</span>
              <span className="text-xs font-bold text-primary">{t("bookCall", "slotsOpen").replace("{slots}", String(slots))}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-600"
                style={{ width: `${Math.round(((10 - slots) / 10) * 100)}%` }}
              />
            </div>
          </motion.div>

          {/* ── Ticker ── */}
          <Ticker lang={lang} bookedLabel={t("bookCall", "bookedCall")} />

          {/* ── Guarantee ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-card border border-border rounded-[var(--radius-card)] p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-1">{t("bookCall", "guarantee")}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("bookCall", "guaranteeDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <CalendarModal
        open={calOpen}
        onClose={() => setCalOpen(false)}
        url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1`}
      />
    </>
  );
};

export default BookCall;
