import { Users, BarChart3, Rocket } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Pre-launch demand",
    desc: "Budujemy listę realnie zainteresowanych kupnem produktu.",
  },
  {
    icon: BarChart3,
    title: "Walidacja i dane",
    desc: "Testujemy komunikację, ceny i grupy odbiorców zanim kampania ruszy.",
  },
  {
    icon: Rocket,
    title: "Start z impetem",
    desc: "Kampania startuje z ruchem, sprzedażą i sygnałem dla algorytmu.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-16">
          Jak budujemy udane kampanie crowdfundingowe
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
