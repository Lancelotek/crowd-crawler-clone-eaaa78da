import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_COPY as faqData } from "@/content/faqCopy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string; // supports HTML
}


const FAQ = () => {
  const { lang, langPrefix } = useLanguage();
  const data = faqData[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, '') },
    })),
  };

  return (
    <>
      <SEOHead
        title={data.seoTitle}
        description={data.seoDesc}
        canonical={`${langPrefix}/faq`}
        jsonLd={[
          jsonLd,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://jay23.com/${lang}` },
              { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `https://jay23.com${langPrefix}/faq` },
            ],
          },
        ]}
        lang={lang}
      />
      <MvaNavbar />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-[720px]">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            {data.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-lg">
            {data.subtitle}
          </p>

          <section className="mb-14 space-y-5 text-[15px] leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-6">
            {lang === "en" ? (
              <>
                <h2 className="font-display text-2xl font-bold text-foreground">Why prelaunch marketing decides your launch</h2>
                <p>
                  Most founders treat marketing as something that happens after the product is ready. By then, it is already too late. The launch window is short, attention is expensive, and a cold audience converts at a fraction of a warm one. The <strong>Minimum Viable Audience (MVA) Framework</strong> exists to fix this by reversing the order: build a small, qualified audience first, then ship a product they already want.
                </p>
                <p>
                  JAY-23 has run this playbook across 46+ launches on Kickstarter, Indiegogo, and direct-to-consumer channels, helping founders raise more than $1.2M in prelaunch revenue. The pattern is consistent. Campaigns that arrive on launch day with 1,000 true fans typically convert 3–4x better than equivalent products launched cold, regardless of category, price point, or paid budget.
                </p>
                <p>
                  The questions below cover the framework itself, the 90-day program structure, pricing for both English and Polish markets, and the practical mechanics of building a list, a community, and a launch sequence that actually converts. If you are evaluating whether MVA is the right fit for your product, start with the calculator on our <a href="/en/quiz" className="text-primary hover:underline">MVA Calculator page</a>, then read through the answers below. For tactical deep-dives, the <a href="/en/blog" className="text-primary hover:underline">articles section</a> covers waitlist conversion, community building, and prelaunch analytics in detail.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-2">Who the MVA Framework is built for</h3>
                <p>
                  MVA works best for founders launching physical products on Kickstarter or Indiegogo, digital creators selling courses or templates, and B2B service providers who want a repeatable acquisition system. It is not a growth hack or a shortcut. It is a disciplined, sequential approach that trades ego metrics for revenue metrics. If you are tired of building in silence and hoping launch week delivers, the framework gives you a number to hit and a 90-day path to hit it.
                </p>
                <p>
                  Still unsure where your project sits? The fastest path is a <a href="/en/book" className="text-primary hover:underline">30-minute strategy call</a> — no pitch, just a direct read on what your launch needs.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-foreground">Dlaczego marketing prelaunch decyduje o premierze</h2>
                <p>
                  Większość founderów traktuje marketing jako coś, co dzieje się po skończeniu produktu. Wtedy jest już za późno. Okno premiery jest wąskie, uwaga jest droga, a zimna publiczność konwertuje w ułamku stawki ciepłej. <strong>Framework Minimum Viable Audience (MVA)</strong> odwraca tę kolejność: najpierw mała, jakościowa publiczność, potem produkt, którego ona już chce.
                </p>
                <p>
                  JAY-23 przeprowadził ten schemat przez 46+ premier na Kickstarterze, Indiegogo i w kanałach DTC, pomagając founderom zebrać ponad $1.2M w przychodach prelaunch. Schemat jest powtarzalny. Kampanie, które na dzień premiery mają 1000 prawdziwych fanów, konwertują zwykle 3–4x lepiej niż produkty startujące na zimno — niezależnie od kategorii, ceny czy budżetu reklamowego.
                </p>
                <p>
                  Poniższe pytania obejmują sam framework, strukturę 90-dniowego programu, ceny dla rynku anglojęzycznego i polskiego, oraz praktyczną mechanikę budowy listy, społeczności i sekwencji premiery. Jeśli zastanawiasz się, czy MVA pasuje do Twojego produktu, zacznij od <a href="/pl/quiz" className="text-primary hover:underline">kalkulatora MVA</a>, a potem przejrzyj odpowiedzi poniżej. Po taktyczne pogłębienia sięgnij do <a href="/pl/blog" className="text-primary hover:underline">sekcji artykułów</a>.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-2">Dla kogo jest framework MVA</h3>
                <p>
                  MVA sprawdza się najlepiej u founderów startujących z produktami fizycznymi na Kickstarterze lub Indiegogo, twórców cyfrowych sprzedających kursy czy szablony, oraz dostawców usług B2B, którzy chcą powtarzalny system pozyskiwania klientów. To nie jest growth hack ani skrót. To zdyscyplinowane, sekwencyjne podejście, które zamienia metryki egorystyczne na metryki przychodowe. Jeśli masz dość budowania w ciszy i liczenia na to, że tydzień premiery przyniesie odbiorców, framework daje Ci liczbę do osiągnięcia i 90-dniową ścieżkę, żeby ją zrealizować.
                </p>
                <p>
                  Nadal nie masz pewności? Najszybsza droga to <a href="/pl/book" className="text-primary hover:underline">30-minutowa konsultacja</a> — bez sprzedaży, tylko konkretna ocena tego, czego potrzebuje Twoja premiera.
                </p>
              </>
            )}
          </section>

          <h2 className="sr-only">{lang === "en" ? "Questions and answers" : "Pytania i odpowiedzi"}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {data.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-6 bg-card/50 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                  <span dangerouslySetInnerHTML={{ __html: item.a }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              {lang === "en" ? "Still have questions?" : "Nadal masz pytania?"}
            </p>
            <a
              href={`${langPrefix}/book`}
              className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-button hover:bg-[hsl(253_100%_55%)] transition-colors"
            >
              {lang === "en" ? "Book a Free Strategy Call →" : "Umów bezpłatną konsultację →"}
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
};

export default FAQ;
