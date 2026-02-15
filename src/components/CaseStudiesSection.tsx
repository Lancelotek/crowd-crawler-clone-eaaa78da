const cases = [
  { name: "Woolet", amount: "$332 694", desc: "Kampania crowdfundingowa z testami A/B, strategią i stroną internetową." },
  { name: "Chernobylite", amount: "$206 671", desc: "Survival horror z nieliniową historią i unikalnym systemem crafting." },
  { name: "Swimmo", amount: "$184 305", desc: "Obsługa kampanii: social media, FB Ads, AdWords, mailing i growth hacking." },
  { name: "Gamedec", amount: "$171 163", desc: "Cyberpunkowa gra RPG osadzona w XXII wieku." },
  { name: "Sher.ly", amount: "$154 106", desc: "Pełne wypuszczenie usługi na rynek – od brandingu po optymalizację sprzedaży." },
  { name: "CityWood", amount: "$121 279", desc: "Minimalistyczne, wycinane laserowo mapy 3D miast." },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-20 md:py-28 section-dark" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-primary font-semibold mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kim jestem i co dotychczas zrobiłem
          </h2>
          <p className="text-section-dark-foreground/70 max-w-2xl mx-auto">
            Nasi klienci zebrali tysiące ciepłych leadów i pozyskali ponad <strong>14 MLN PLN</strong> w zbiórkach.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {cases.map((c, i) => (
            <div
              key={i}
              className="bg-background/5 border border-section-dark-foreground/10 rounded-2xl p-6 hover:bg-background/10 transition-colors"
            >
              <h3 className="text-lg font-bold mb-1">{c.name}</h3>
              <p className="text-3xl font-black text-primary mb-3">{c.amount}</p>
              <p className="text-sm text-section-dark-foreground/60 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
