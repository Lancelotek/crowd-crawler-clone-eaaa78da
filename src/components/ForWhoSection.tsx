const ForWhoSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-16">
          Czy to jest dla Ciebie?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-xl font-bold mb-4">✔ TAK jeśli:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Masz produkt gotowy lub prawie gotowy</li>
              <li>• Myślisz o Kickstarter / Indiegogo</li>
              <li>• Chcesz dane, a nie „farta"</li>
            </ul>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">✖ NIE jeśli:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Nie masz budżetu na marketing</li>
              <li>• Chcesz „wrzucić projekt i zobaczyć"</li>
              <li>• Nie zależy Ci na długoterminowej sprzedaży</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Dla Startupów",
              desc: "Masz startup lub chcesz zrobić spin-off? Platformy jak Kickstarter, Crowdcube czy Indiegogo umożliwiają pozyskanie funduszy od społeczności i przetestowanie pomysłów na rynku.",
            },
            {
              title: "Dla Twórców",
              desc: "Chcesz sfinansować swoje dzieło? Skorzystaj z Patreon, Buy Me a Coffee lub kampanii crowdfundingowej. Pokażemy Ci, jak zbudować społeczność.",
            },
            {
              title: "Dla Firm",
              desc: "Wprowadzasz nowy produkt? Sony, Anker, Hasbro – wiele znanych firm finansowało projekty na Kickstarterze. Crowdfunding pozwala zbudować społeczność wokół produktu.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
