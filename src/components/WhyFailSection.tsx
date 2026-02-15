const reasons = [
  "Start kampanii bez listy zainteresowanych",
  "Reklamy puszczane na zimno",
  "Brak danych, kto naprawdę chce kupić",
  "Algorytm platformy nie łapie trakcji",
];

const WhyFailSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">
          Dlaczego większość kampanii crowdfundingowych nie dowozi celu
        </h2>
        <div className="grid gap-4 text-left max-w-md mx-auto">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-destructive text-xl leading-none mt-0.5">❌</span>
              <span className="font-semibold text-lg">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFailSection;
