import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle2, BookOpen, Calendar } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackEvent, track } from "@/lib/tracking";

const PDF_URL = "/prelaunch-checklist.pdf";
const DISCORD_URL = "https://discord.com/invite/FqCY7yQuwV";

const copy = {
  en: {
    seoTitle: "Your Pre-Launch Checklist is on the way — JAY-23",
    seoDesc: "Your download has started. Next: book a free 30-min strategy call and turn the checklist into a real MVA plan.",
    eyebrow: "Step 2 of 3 · PDF delivered",
    title: "Your checklist is downloading.",
    subtitle: "Keep an eye on your inbox — we've also queued a copy there along with the next pre-launch playbook notes.",
    redownload: "Re-download the PDF",
    nextEyebrow: "Recommended next step",
    nextTitle: "Turn the checklist into a real plan.",
    nextBody: "30 minutes, 1:1 with the founder. We map your product to the MVA framework and walk you out with a concrete pre-launch plan — no pitch.",
    cta: "Book a free strategy call",
    secondaryTitle: "Or keep reading",
    secondaryBody: "Go back to the full playbook anytime.",
    secondary: "Back to the playbook",
    discordEyebrow: "Or join the community",
    discordBody: "Pre-launch founders sharing strategies, results, and live feedback.",
    discord: "Join Discord",
  },
  pl: {
    seoTitle: "Twoja checklista pre-launch jest w drodze — JAY-23",
    seoDesc: "Pobieranie się rozpoczęło. Następny krok: umów bezpłatną rozmowę i zamień checklistę w konkretny plan MVA.",
    eyebrow: "Krok 2 z 3 · PDF wysłany",
    title: "Twoja checklista się pobiera.",
    subtitle: "Sprawdź też skrzynkę — wysłaliśmy tam kopię razem z kolejnymi notatkami z playbooka.",
    redownload: "Pobierz PDF ponownie",
    nextEyebrow: "Rekomendowany kolejny krok",
    nextTitle: "Zamień checklistę w konkretny plan.",
    nextBody: "30 minut 1:1 z założycielem. Przekładamy Twój produkt na framework MVA i wychodzisz z konkretnym planem pre-launch — bez sprzedaży.",
    cta: "Umów bezpłatną rozmowę",
    secondaryTitle: "Albo czytaj dalej",
    secondaryBody: "Wróć do pełnego playbooka w każdej chwili.",
    secondary: "Wróć do playbooka",
    discordEyebrow: "Albo dołącz do społeczności",
    discordBody: "Founderzy w fazie pre-launch dzielą się strategiami, wynikami i feedbackiem.",
    discord: "Dołącz do Discord",
  },
};

const PlaybookThankYou = () => {
  const { lang, langPrefix } = useLanguage();
  const c = copy[lang];
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // GA4 funnel step
    trackEvent("funnel_step", {
      funnel: "prelaunch-playbook",
      step: 2,
      step_name: "lead_magnet_thank_you",
      source: "prelaunch-playbook",
    });
    trackEvent("lead_magnet_thank_you_view", {
      magnet: "prelaunch-checklist-pdf",
      source: "prelaunch-playbook",
    });
    trackEvent("page_view", {
      page_type: "thank_you",
      page_variant: "prelaunch-playbook-pdf",
    });
  }, []);

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "JAY23-Prelaunch-Checklist.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    trackEvent("file_download", {
      file_name: "JAY23-Prelaunch-Checklist.pdf",
      source: "playbook-thank-you",
    });
  };

  const bookHref = `${langPrefix}/book?source=playbook-pdf`;

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))]">
      <SEOHead
        title={c.seoTitle}
        description={c.seoDesc}
        canonical={`/${lang}/playbook-thank-you`}
        noindex
      />
      <MvaNavbar />

      <main className="px-6 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Hero card */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-[hsl(253_100%_62%/0.10)] via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute -top-24 -right-20 w-[360px] h-[360px] bg-[radial-gradient(circle,hsl(253_100%_62%/0.18)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/85 mb-4 flex items-center gap-2">
                <CheckCircle2 size={13} /> {c.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(30px,4vw,46px)] font-black uppercase leading-[1.05] tracking-tight text-white mb-4">
                {c.title}
              </h1>
              <p className="text-[15.5px] text-white/65 leading-relaxed mb-6 font-light max-w-xl">
                {c.subtitle}
              </p>
              <button
                onClick={triggerDownload}
                className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-white transition-colors underline underline-offset-4"
              >
                <Download size={15} /> {c.redownload}
              </button>
            </div>
          </div>

          {/* Next step — booking */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-8 sm:p-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 mb-3 flex items-center gap-2">
              <Calendar size={13} /> {c.nextEyebrow}
            </p>
            <h2 className="font-display text-[clamp(22px,2.4vw,30px)] font-black uppercase leading-tight tracking-tight text-white mb-3">
              {c.nextTitle}
            </h2>
            <p className="text-[15px] text-white/65 leading-relaxed mb-6 font-light max-w-2xl">
              {c.nextBody}
            </p>
            <Link
              to={bookHref}
              onClick={() => {
                trackEvent("funnel_step", {
                  funnel: "prelaunch-playbook",
                  step: 3,
                  step_name: "booking_click",
                  source: "playbook-pdf",
                });
                trackEvent("cta_click", {
                  cta: "book_call_after_pdf",
                  destination: "/book",
                  source: "playbook-thank-you",
                });
                track.bookingClick("playbook-thank-you");
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-[15px] px-7 py-3.5 rounded-lg hover:brightness-110 transition-all"
            >
              {c.cta} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Secondary actions */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Link
              to={`${langPrefix}/prelaunch-marketing-playbook`}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/40 hover:bg-white/[0.04] transition-all"
            >
              <BookOpen size={18} className="text-primary mb-3" />
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/45 mb-1.5">
                {c.secondaryTitle}
              </p>
              <p className="text-[15px] text-white font-semibold mb-1">{c.secondary}</p>
              <p className="text-[13.5px] text-white/55 font-light leading-relaxed">{c.secondaryBody}</p>
            </Link>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("outbound_click", {
                  destination: "discord",
                  source: "playbook-thank-you",
                })
              }
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/40 hover:bg-white/[0.04] transition-all"
            >
              <svg className="w-[18px] h-[18px] text-primary mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/45 mb-1.5">
                {c.discordEyebrow}
              </p>
              <p className="text-[15px] text-white font-semibold mb-1">{c.discord}</p>
              <p className="text-[13.5px] text-white/55 font-light leading-relaxed">{c.discordBody}</p>
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PlaybookThankYou;
