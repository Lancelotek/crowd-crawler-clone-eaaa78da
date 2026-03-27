import { useLanguage } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { t } = useLanguage();

  const items = [
    { q: t("faq", "q1"), a: t("faq", "a1") },
    { q: t("faq", "q2"), a: t("faq", "a2") },
    { q: t("faq", "q3"), a: t("faq", "a3") },
    { q: t("faq", "q4"), a: t("faq", "a4") },
    { q: t("faq", "q5"), a: t("faq", "a5") },
  ];

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-[720px]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">
            {t("faq", "eyebrow")}
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            {t("faq", "title")}{" "}
            <span className="text-primary">{t("faq", "titleAccent")}</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
