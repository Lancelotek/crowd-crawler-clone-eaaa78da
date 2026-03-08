import logo from "@/assets/jay23-logo.png";

const FooterSection = () => {
  return (
    <footer className="px-6 py-16 border-t border-border">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="JAY-23" className="h-8 w-auto object-contain mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
              JAY-23 helps founders build their Minimum Viable Audience using growth hacking, precision ads, and AI content systems.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Crowdfunding zone by JAY23 LLC</p>
              <p>412 N. Main Street, STE 100</p>
              <p>Buffalo, Wyoming 82834</p>
              <p>+1 (628) 241-7366</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4 tracking-wide">FRAMEWORK</h4>
            <ul className="space-y-2.5">
              <li><a href="#system" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">MVA Calculator</a></li>
              <li><a href="#quiz" className="text-sm text-muted-foreground hover:text-primary transition-colors">Strategy Quiz</a></li>
              <li><a href="#cta" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book a Call</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4 tracking-wide">RESOURCES</h4>
            <ul className="space-y-2.5">
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} JAY-23 Sp. z o.o. All rights reserved.</span>
          <span className="text-xs text-muted-foreground">MVA Framework — Build demand before you build product.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
