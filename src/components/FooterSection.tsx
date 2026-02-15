const FooterSection = () => {
  return (
    <footer className="section-dark py-12" id="kontakt">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          <span className="text-xl font-black">Crowdfunding</span>
          <span className="text-xl font-black text-primary">.Zone</span>
        </div>
        <p className="text-section-dark-foreground/60 mb-8 max-w-md mx-auto">
          Budujemy popyt i sprzedaż pre-launch dla projektów crowdfundingowych.
        </p>
        <a
          href="https://calendly.com/marekciesla/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Umów bezpłatną konsultację
        </a>
        <p className="mt-12 text-sm text-section-dark-foreground/40">
          © {new Date().getFullYear()} Crowdfunding.Zone. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
