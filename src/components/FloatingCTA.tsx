import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPct > 0.4);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary px-6 py-3 flex items-center justify-center gap-4"
        >
          <a
            href="#book-call"
            className="text-primary-foreground font-bold text-sm uppercase tracking-wide"
          >
            <span className="animate-blink inline-block text-destructive mr-1">🔴</span>
            2 strategy call slots left this month — Book Now →
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-lg leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;