import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { lang, langPrefix } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  const text = {
    en: {
      message: "We use cookies to improve your experience and analyze site traffic.",
      accept: "Accept",
      decline: "Decline",
      privacy: "Privacy Policy",
    },
    pl: {
      message: "Używamy plików cookie, aby poprawić Twoje doświadczenia i analizować ruch na stronie.",
      accept: "Akceptuję",
      decline: "Odrzucam",
      privacy: "Polityka prywatności",
    },
  };

  const t = text[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[60] bg-card border border-border rounded-[var(--radius-card)] p-5 shadow-xl shadow-primary/10"
        >
          <p className="text-sm text-foreground leading-relaxed mb-1">
            🍪 {t.message}
          </p>
          <a
            href={`${langPrefix}/privacy-policy`}
            className="text-xs text-primary hover:underline"
          >
            {t.privacy}
          </a>
          <div className="flex gap-3 mt-4">
            <button
              onClick={accept}
              className="flex-1 bg-primary text-primary-foreground text-sm font-semibold py-2.5 px-4 rounded-[var(--radius-button)] hover:bg-primary/90 transition-colors"
            >
              {t.accept}
            </button>
            <button
              onClick={decline}
              className="flex-1 border border-border text-muted-foreground text-sm font-semibold py-2.5 px-4 rounded-[var(--radius-button)] hover:bg-muted transition-colors"
            >
              {t.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
