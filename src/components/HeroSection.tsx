import heroPeople from "@/assets/hero-people.png";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--hero-gradient)] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Startuj kampanię z popytem i sprzedażą
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Budujemy popyt, listy leadów i sprzedaż pre-launch dla projektów
              crowdfundingowych – bez zgadywania i bez przepalania budżetu.
            </p>
            <a
              href="#kontakt"
              className="mt-8 inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Zobacz jak to działa (60 sek)
            </a>
          </div>
          <div className="relative">
            {/* decorative circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[90%] h-[90%] rounded-full border-2 border-primary/20" />
            </div>
            <img
              src={heroPeople}
              alt="Zespół crowdfundingowy"
              className="relative z-10 w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
