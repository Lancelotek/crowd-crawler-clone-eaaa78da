import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const text = {
  en: {
    title: "Help us improve JAY-23",
    message:
      "We use cookies to measure traffic and understand which content helps founders most. Accepting lets us keep improving the site for you.",
    accept: "Accept all cookies",
    decline: "Only necessary",
    privacy: "Privacy Policy",
  },
  pl: {
    title: "Pomóż nam ulepszać JAY-23",
    message:
      "Używamy plików cookie do pomiaru ruchu i sprawdzania, które treści najbardziej pomagają founderom. Akceptacja pozwala nam stale ulepszać stronę dla Ciebie.",
    accept: "Akceptuję wszystkie",
    decline: "Tylko niezbędne",
    privacy: "Polityka prywatności",
  },
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const lang: "en" | "pl" = pathname === "/pl" || pathname.startsWith("/pl/") ? "pl" : "en";
  const t = text[lang];

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t.title}
          lang={lang}
          initial={{ y: 160, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 160, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-card border border-primary/30 rounded-[var(--radius-card)] p-6 sm:p-8 shadow-2xl shadow-primary/25">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex gap-4 flex-1">
                <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-primary/15 items-center justify-center">
                  <Cookie className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground mb-2">{t.title}</p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t.message}{" "}
                    <a href={`/${lang}/privacy-policy`} className="text-primary underline underline-offset-2">
                      {t.privacy}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:w-64 shrink-0">
                <button
                  onClick={() => choose("accepted")}
                  className="w-full bg-primary text-primary-foreground text-base font-bold py-4 px-6 rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                  {t.accept}
                </button>
                <button
                  onClick={() => choose("declined")}
                  className="w-full text-muted-foreground text-sm py-2 hover:text-foreground transition-colors"
                >
                  {t.decline}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
