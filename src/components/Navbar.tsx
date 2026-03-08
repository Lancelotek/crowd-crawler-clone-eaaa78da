import { useState, useEffect } from "react";
import logo from "@/assets/jay23-logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-[68px] flex items-center justify-between">
        <img src={logo} alt="JAY-23" className="h-14 w-auto object-contain" />
        <ul className="hidden md:flex items-center gap-8">
          {["Phases", "AI Prompts", "Growth", "Results", "Ads"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#book-call"
          className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity animate-pulse-cta"
        >
          Book Free Call →
        </a>
      </div>
    </nav>
  );
};

export default Navbar;