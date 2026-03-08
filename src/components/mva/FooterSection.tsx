import logo from "@/assets/jay23-logo.png";

const FooterSection = () => {
  return (
    <footer className="px-6 py-12 border-t border-border flex flex-wrap items-center justify-between gap-4">
      <img src={logo} alt="JAY-23" className="h-12 w-auto object-contain opacity-50" />
      <div className="flex items-center gap-6">
        <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</a>
      </div>
      <span className="text-xs font-medium text-muted-foreground">MVA Framework — JAY-23</span>
    </footer>
  );
};

export default FooterSection;
