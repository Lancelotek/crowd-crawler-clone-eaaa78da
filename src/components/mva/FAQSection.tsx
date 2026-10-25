import { useLanguage } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3, 4, 5].map((n) => ({ q: t("faq", `q${n}`), a: t("faq", `a${n}`) }));

  return (
    <section id="faq" className="px-6 py-20 md:py-28 bg-background border-t border-border">
      <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-[5fr_6fr] gap-x-20 gap-y-8">
        <h2 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-1.8px] text-[clamp(30px,4vw,48px)] self-start">
          {t("faq", "title")}
        </h2>
        <Accordion type="single" collapsible className="w-full border-t-2 border-foreground">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-[17px] font-semibold hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] text-foreground/75 leading-[1.7] pb-6">
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
