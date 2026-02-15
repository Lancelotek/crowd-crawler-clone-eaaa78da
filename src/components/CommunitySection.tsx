const benefits = [
  "Grupę pierwszych, pewnych backerów - kluczowe dla mocnego startu",
  "Walidację produktu przed premierą",
  "Lepszą widoczność na platformie dzięki szybkiemu wsparciu",
  "Naturalnych ambasadorów promujących kampanię",
  "Większą wiarygodność projektu dla nowych backerów",
];

const CommunitySection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-4">
          W cenie: warsztaty z organicznego budowania społeczności
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Budowanie społeczności przed Kickstarterem zapewnia:
        </p>
        <div className="grid gap-3 max-w-xl mx-auto">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-background rounded-xl px-5 py-4 border border-border/50">
              <span className="text-primary font-bold">—</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
