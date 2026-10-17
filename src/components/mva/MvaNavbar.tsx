import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "@/assets/jay23-logo.webp";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const MvaNavbar = () => {
  const { t, lang, langPrefix } = useLanguage();
  const { pathname } = useLocation();
  const lightTop = /\/(quiz|about|faq|process|blog(?:\/.*)?|report|thank-you|playbook-thank-you|founder-influencer)\/?$/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t("nav", "framework"), href: "#how-it-works" },
    { label: t("nav", "caseStudies"), href: "#case-studies" },
    { label: t("nav", "process"), href: `${langPrefix}/process`, isLink: true },
    { label: t("nav", "blog"), href: `${langPrefix}/blog`, isLink: true },
    { label: "LIVE", href: `${langPrefix}/live`, isLink: true },
    { label: t("nav", "faq"), href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    const lightHeader = scrolled || lightTop;

  return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${lightHeader ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/30" : "bg-transparent border-b border-transparent"}`}>
        <div className="container mx-auto max-w-[1200px] px-6 h-[64px] flex items-center justify-between">
          <Link to={langPrefix} aria-label={lang === "pl" ? "JAY-23 — strona główna" : "JAY-23 — Home"}><img src={logo} alt="JAY-23 logo" width={120} height={32} className={`h-8 w-auto object-contain transition-all duration-300 ${lightHeader ? "" : "brightness-0 invert"}`} /></Link>
          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.isLink ? (
                  <Link to={item.href} className={`text-[13px] font-medium transition-colors hover:text-primary ${lightHeader ? "text-muted-foreground" : "text-on-dark/70 hover:text-on-dark"}`}>{item.label}</Link>
                ) : (
                  <a href={item.href} className={`text-[13px] font-medium transition-colors hover:text-primary ${lightHeader ? "text-muted-foreground" : "text-on-dark/70 hover:text-on-dark"}`}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link to={`${langPrefix}/book`} onClick={() => track.bookingClick("navbar")} className={`hidden sm:inline-block border px-5 py-2 text-sm font-semibold rounded-button transition-colors ${lightHeader ? "border-border hover:border-primary hover:text-primary" : "border-on-dark/20 text-on-dark/80 hover:border-on-dark hover:text-on-dark"}`}>
              {t("nav", "bookCall")}
            </Link>
            <Button asChild size="sm" className="sm:hidden rounded-button text-xs px-3"><Link to={`${langPrefix}/book`} onClick={() => track.bookingClick("navbar_mobile")}>{t("nav", "mobileBookCall")}</Link></Button>
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className={`md:hidden ${lightHeader ? "text-foreground" : "text-on-dark"}`} aria-label={lang === "pl" ? "Otwórz menu" : "Open menu"} aria-expanded={open}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="fixed top-0 right-0 bottom-0 z-50 w-[260px] bg-card border-l border-border flex flex-col rounded-l-card">
              <div className="h-[64px] flex items-center justify-end px-6">
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} className="text-foreground" /></button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-4 flex-1">
                {navItems.map((item) =>
                  item.isLink ? (
                    <Link key={item.label} to={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border">{item.label}</Link>
                  ) : (
                    <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border">{item.label}</a>
                  )
                )}
              </nav>
              <div className="p-6 space-y-2">
                <Link to={`${langPrefix}/book`} onClick={() => { setOpen(false); track.bookingClick("navbar_mobile"); }} className="block text-center bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold rounded-button hover:brightness-110 transition-all">
                  {t("nav", "bookCall")}
                </Link>
                <Link to={`${langPrefix}/quiz`} onClick={() => { setOpen(false); track.ctaClick("navbar_mobile", "calculator"); }} className="block text-center border border-border text-foreground px-5 py-3 text-sm font-semibold rounded-button hover:border-primary hover:text-primary transition-colors">
                  {t("nav", "getStarted")}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MvaNavbar;
