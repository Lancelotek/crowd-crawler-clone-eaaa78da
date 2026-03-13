import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/jay23-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const MvaNavbar = () => {
  const { t, langPrefix } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t("nav", "framework"), href: "#solution" },
    { label: t("nav", "caseStudies"), href: "#case-studies" },
    { label: t("nav", "blog"), href: `${langPrefix}/blog` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/30" : "bg-transparent border-b border-transparent"}`}>
        <div className="container mx-auto max-w-[1200px] px-6 h-[64px] flex items-center justify-between">
          <Link to={langPrefix}><img src={logo} alt="JAY-23" className={`h-8 w-auto object-contain transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} /></Link>
          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={`text-[13px] font-medium transition-colors hover:text-primary ${scrolled ? "text-muted-foreground" : "text-white/70 hover:text-white"}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={`${langPrefix}/book`} onClick={() => track.bookingClick("navbar")} className={`hidden sm:inline-block border px-5 py-2 text-sm font-semibold rounded-button transition-colors ${scrolled ? "border-border hover:border-primary hover:text-primary" : "border-white/20 text-white/80 hover:border-white hover:text-white"}`}>
              {t("nav", "bookCall")}
            </a>
            <a href="#cta" onClick={() => track.ctaClick("navbar", "calculator")} className="hidden sm:inline-block bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold rounded-button hover:brightness-110 transition-all">
              {t("nav", "getStarted")}
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1" aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="fixed top-0 right-0 bottom-0 z-50 w-[260px] bg-card border-l border-border flex flex-col rounded-l-card">
              <div className="h-[64px] flex items-center justify-end px-6">
                <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} className="text-foreground" /></button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-4 flex-1">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border">{item.label}</a>
                ))}
              </nav>
              <div className="p-6">
                <a href="#cta" onClick={() => setOpen(false)} className="block text-center bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold rounded-button hover:brightness-110 transition-all">
                  {t("nav", "getStarted")}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MvaNavbar;
