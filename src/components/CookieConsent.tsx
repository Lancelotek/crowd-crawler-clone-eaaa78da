import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const text = {
  en: {
    title: "Help us improve JAY-23",
    message:
      "We use cookies to measure traffic and understand which content helps founders most. Accepting lets us keep improving the site for you.",
    accept: "Accept all",
    decline: "Reject all",
    privacy: "Privacy Policy",
    compactMessage: "Allow analytics and advertising cookies?",
  },
  pl: {
    title: "Pomóż nam ulepszać JAY-23",
    message:
      "Używamy plików cookie do pomiaru ruchu i sprawdzania, które treści najbardziej pomagają founderom. Akceptacja pozwala nam stale ulepszać stronę dla Ciebie.",
    accept: "Akceptuję wszystkie",
    decline: "Odrzucam wszystkie",
    privacy: "Polityka prywatności",
    compactMessage: "Zezwalasz na cookies analityczne i reklamowe?",
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
    window.setJay23Consent?.(value);
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
          <div className="mx-auto max-w-4xl bg-card border border-primary/30 rounded-[var(--radius-card)] p-4 sm:p-8 shadow-2xl shadow-primary/25">
            <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-6">
              <div className="flex gap-4 flex-1">
                <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-primary/15 items-center justify-center">
                  <Cookie className="text-primary" size={24} />
                </div>
                <div>
                  <p className="hidden sm:block text-xl font-bold text-foreground mb-2">{t.title}</p>
                  <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                    <span className="sm:hidden">{t.compactMessage}</span><span className="hidden sm:inline">{t.message}</span>{" "}
                    <a href={`/${lang}/privacy-policy`} className="text-primary underline underline-offset-2">
                      {t.privacy}
                    </a>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:w-64 shrink-0">
                <Button onClick={() => choose("accepted")} className="w-full h-auto min-h-11 px-2 py-3 text-xs sm:text-sm whitespace-normal rounded-button">{t.accept}</Button>
                <Button onClick={() => choose("declined")} className="w-full h-auto min-h-11 px-2 py-3 text-xs sm:text-sm whitespace-normal rounded-button">{t.decline}</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
