import { CheckCircle } from "lucide-react";
import expertImg from "@/assets/expert-portrait.png";

const ExpertSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <img
              src={expertImg}
              alt="Marek Cieśla"
              className="rounded-2xl w-full max-w-sm mx-auto"
            />
          </div>
          <div>
            <p className="text-primary font-semibold mb-2">Ekspert w Dziedzinie</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
              Marek Cieśla
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Doświadczony ekspert w crowdfundingu oraz przedsprzedaży:
            </p>
            <div className="space-y-4">
              {[
                "Od 20 lat skutecznie wprowadza produkty i usługi na rynek",
                "Przeprowadził ponad 49 zbiórek, generując łącznie 7 milionów złotych",
                "Specjalizuje się w crowdfundingu, self-crowdfundingu i equity crowdfundingu",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
