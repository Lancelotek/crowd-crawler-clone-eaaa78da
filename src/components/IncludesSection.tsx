import { CheckCircle } from "lucide-react";

const items = [
  "40 godzin konsultacji z ekspertami, w tym warsztaty – testy A/B, Marketing Automation, social media i growth hacking.",
  "Proces budowania społeczności organicznie, oparty na metodologii Minimum Viable Audience (MVA).",
  "Automatyzacja mailingów z gotowymi treściami (copy).",
  "Prace programistyczne związane z integracją narzędzi z platformą klienta.",
  "Hosting landing page'ów na 5 miesięcy za darmo oraz ustawienie społeczności Discord.",
];

const IncludesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">
          Co obejmuje?
        </h2>
        <div className="space-y-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-background rounded-xl p-5 border border-border/50">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludesSection;
