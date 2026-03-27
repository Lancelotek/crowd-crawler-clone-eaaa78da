import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import MvaNavbar from "@/components/mva/MvaNavbar";
import marekPortrait from "@/assets/marek-portrait.png";
import { trackPurchaseConversion } from "@/lib/gadsConversions";

const DISCORD_URL = "https://discord.com/invite/FqCY7yQuwV";

const t = {
  en: {
    title: "You're in!",
    seoTitle: "You're in! — MVA Framework",
    seoDesc: "Thank you for signing up. Check your inbox and join our Discord community.",
    subtitle: "Check your inbox — we've sent you a confirmation email.",
    subtitleBold: "Also check Spam and Promotions.",
    step1Title: "Confirm your email",
    step1Desc: "Click the link in the message. If you use Gmail — drag it to Primary so you don't miss anything.",
    step2Title: "Wait up to 10 minutes",
    step2Desc: "After confirmation the system will automatically deliver materials. Nothing arrived? Check spam again.",
    nextStep: "NEXT STEP",
    discord: "Join the community of founders building pre-launch audiences — strategies, results, live feedback.",
    discordBtn: "Join Discord",
    back: "← Back to homepage",
  },
  pl: {
    title: "You're in!",
    seoTitle: "Dziękujemy! — MVA Framework",
    seoDesc: "Dziękujemy za zapisanie się. Sprawdź skrzynkę i dołącz do społeczności na Discord.",
    subtitle: "Sprawdź skrzynkę odbiorczą — wysłaliśmy Ci e-mail z potwierdzeniem.",
    subtitleBold: "Zajrzyj też do Spam i Promocje.",
    step1Title: "Potwierdź adres e-mail",
    step1Desc: "Kliknij link w wiadomości. Jeśli używasz Gmaila — przeciągnij ją do zakładki Główne, żeby nic Cię nie ominęło.",
    step2Title: "Poczekaj do 10 minut",
    step2Desc: "Po potwierdzeniu system automatycznie dostarczy materiał. Nic nie dotarło? Sprawdź ponownie spam.",
    nextStep: "NASTĘPNY KROK",
    discord: "Dołącz do społeczności founderów budujących pre-launch audience — strategie, wyniki, feedback na żywo.",
    discordBtn: "Dołącz do Discord",
    back: "← Wróć na stronę główną",
  },
};

const ThankYou = () => {
  const { lang } = useLanguage();
  const c = t[lang];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={c.seoTitle} description={c.seoDesc} canonical={`/${lang}/thank-you`} />
      <MvaNavbar />
      <main className="flex items-center justify-center px-6 py-24 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <div className="bg-card border border-border rounded-card p-8 md:p-10">
            {/* Avatar */}
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                  <img
                    src={marekPortrait}
                    alt="Marek — Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-center">
              {c.title}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 text-center">
              {c.subtitle} <strong className="text-foreground">{c.subtitleBold}</strong>
            </p>

            {/* Steps */}
            <div className="space-y-5 mb-8">
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{c.step1Title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{c.step1Desc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  <Clock size={14} />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{c.step2Title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{c.step2Desc}</p>
                </div>
              </div>
            </div>

            {/* Discord CTA */}
            <div className="bg-secondary rounded-card p-5 mb-6 text-center">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest mb-2">
                {c.nextStep}
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-4 max-w-xs mx-auto">
                {c.discord}
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-6 py-3 font-semibold text-sm rounded-button hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                {c.discordBtn}
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="text-center">
              <Link
                to={`/${lang}`}
                className="text-xs text-muted-foreground underline hover:text-primary transition-colors"
              >
                {c.back}
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6 opacity-60">
            jay23.com · Pre-launch audience building
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default ThankYou;
