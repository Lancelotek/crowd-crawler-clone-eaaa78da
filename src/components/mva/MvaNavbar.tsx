import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/jay23-logo.png";

const navItems = [
  { label: "How it works", href: "#system" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Funnel", href: "#funnel" },
  { label: "Results", href: "#metrics" },
];

const MvaNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/30"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-[68px] flex items-center justify-between">
          <img src={logo} alt="JAY-23" className="h-8 w-auto object-contain" />
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a href="#cta" className="hidden sm:inline-block bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold rounded-button hover:brightness-110 transition-all">
              Build Your MVA →
            </a>
            <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1" aria-label="Toggle menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-card border-l border-border flex flex-col rounded-l-card">
              <div className="h-[68px] flex items-center justify-end px-6">
                <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} className="text-foreground" /></button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-4 flex-1">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-border">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="p-6">
                <a href="#cta" onClick={() => setOpen(false)} className="block text-center bg-primary text-primary-foreground px-5 py-3.5 text-sm font-semibold rounded-button hover:brightness-110 transition-all">
                  Build Your MVA →
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
