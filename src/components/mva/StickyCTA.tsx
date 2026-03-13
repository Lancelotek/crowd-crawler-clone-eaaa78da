import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const StickyCTA = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.3 }} className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 bg-background/95 backdrop-blur-xl border-t border-border">
          <a href="#cta" className="w-full bg-primary text-primary-foreground py-3.5 font-semibold text-sm rounded-button hover:brightness-110 transition-all flex items-center justify-center gap-2 animate-pulse-cta">
            {t("stickyCTA", "btn")} <ArrowRight size={16} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
