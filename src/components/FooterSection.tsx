import logo from "@/assets/jay23-logo.png";

const FooterSection = () => {
  return (
    <footer className="px-6 py-12 border-t border-border flex flex-wrap items-center justify-between gap-4">
      <img src={logo} alt="JAY-23" className="h-12 w-auto object-contain opacity-50" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        MVA Framework v1.0 — 2025 // Build the Audience First
      </span>
    </footer>
  );
};

export default FooterSection;
