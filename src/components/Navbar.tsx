const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black tracking-tight">Crowdfunding</span>
          <span className="text-xl font-black text-primary">.Zone</span>
        </div>
        <a
          href="#kontakt"
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Umów bezpłatną konsultację
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
