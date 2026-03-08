import logo from "@/assets/jay23-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-[68px] flex items-center justify-between">
        <img src={logo} alt="JAY-23" className="h-12 w-auto object-contain" />
        <ul className="hidden md:flex items-center gap-8">
          {["Phases", "AI Prompts", "Growth", "Ads"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#phases"
          className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
        >
          Start Framework
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
