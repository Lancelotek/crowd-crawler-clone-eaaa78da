import MvaNavbar from "@/components/mva/MvaNavbar";
import FooterSection from "@/components/mva/FooterSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

const faqData: Record<"en" | "pl", { title: string; subtitle: string; seoTitle: string; seoDesc: string; items: FaqItem[] }> = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about the MVA Framework and working with JAY-23.",
    seoTitle: "FAQ — MVA Framework by JAY-23",
    seoDesc: "Answers to the most common questions about the MVA Framework, our 90-day program, pricing, and how we help founders build audiences before launch.",
    items: [
      { q: "What is the MVA Framework?", a: "The MVA (Minimum Viable Audience) Framework is a 90-day system that helps founders build a paying audience before they launch. Instead of building a product and hoping people show up, we flip the script: audience first, product second." },
      { q: "Who is this program for?", a: "It's built for founders, creators, and startups planning a product launch, crowdfunding campaign (Kickstarter, Indiegogo), or any business that needs early traction. If you're tired of launching to silence, this is for you." },
      { q: "How long does the program take?", a: "The core program runs for 90 days, split into three phases: Build (Days 1-30), Drive (Days 31-60), and Launch (Days 61-90). Each phase builds on the last so nothing is wasted." },
      { q: "Do I need a finished product to start?", a: "No. In fact, it's better if you don't. The MVA Framework helps you validate your idea and build demand before you invest heavily in product development. Your audience tells you what to build." },
      { q: "What results can I expect?", a: "Our clients typically build a list of 1,000-5,000+ engaged subscribers, achieve 20%+ waitlist-to-customer conversion rates, and raise $50K-$600K+ on launch day. Results vary based on niche and commitment." },
      { q: "How much does it cost?", a: "We offer different tiers depending on your needs. The best way to find out is to book a free strategy call where we assess your situation and recommend the right plan. There's no obligation." },
      { q: "What if I already have an audience?", a: "Great — we'll help you activate and monetize them. The framework works whether you're starting from zero or already have followers. We optimize your existing assets and add proven growth systems." },
      { q: "Do you run my ads for me?", a: "Yes. Our team handles ad strategy, creative, targeting, and optimization across Meta, Google, and other platforms. You focus on your product while we drive qualified leads to your funnel." },
      { q: "What's included in the free strategy call?", a: "A 30-minute session where we analyze your current situation, identify your ideal audience, estimate your MVA number, and map out a 90-day action plan. You walk away with a clear roadmap whether you work with us or not." },
      { q: "How is this different from a marketing agency?", a: "Agencies sell you impressions and clicks. We build you an asset — a community of people who trust you and are ready to buy. We focus on long-term audience ownership, not short-term vanity metrics." },
    ],
  },
  pl: {
    title: "Najczęściej Zadawane Pytania",
    subtitle: "Wszystko, co musisz wiedzieć o MVA Framework i współpracy z JAY-23.",
    seoTitle: "FAQ — MVA Framework od JAY-23",
    seoDesc: "Odpowiedzi na najczęstsze pytania o MVA Framework, nasz program 90-dniowy, cennik i jak pomagamy founderom budować społeczność przed premierą.",
    items: [
      { q: "Czym jest MVA Framework?", a: "MVA (Minimum Viable Audience) Framework to 90-dniowy system, który pomaga founderom zbudować płacącą publiczność przed premierą produktu. Zamiast budować produkt i liczyć na to, że ludzie się pojawią, odwracamy schemat: najpierw publiczność, potem produkt." },
      { q: "Dla kogo jest ten program?", a: "Dla founderów, twórców i startupów planujących premierę produktu, kampanię crowdfundingową (Kickstarter, Indiegogo) lub dowolny biznes potrzebujący wczesnej trakcji. Jeśli masz dość startowania w ciszę — to jest dla Ciebie." },
      { q: "Jak długo trwa program?", a: "Główny program trwa 90 dni, podzielonych na trzy fazy: Buduj (Dni 1-30), Napędzaj (Dni 31-60) i Startuj (Dni 61-90). Każda faza buduje na poprzedniej, więc nic nie jest zmarnowane." },
      { q: "Czy muszę mieć gotowy produkt, żeby zacząć?", a: "Nie. Właściwie lepiej, jeśli go nie masz. MVA Framework pomoże Ci zwalidować pomysł i zbudować popyt, zanim zainwestujesz w rozwój produktu. Twoja publiczność powie Ci, co zbudować." },
      { q: "Jakich rezultatów mogę się spodziewać?", a: "Nasi klienci zazwyczaj budują listę 1000-5000+ zaangażowanych subskrybentów, osiągają 20%+ konwersję z waitlisty na klientów i zbierają $50K-$600K+ w dniu premiery. Wyniki zależą od niszy i zaangażowania." },
      { q: "Ile to kosztuje?", a: "Oferujemy różne pakiety w zależności od potrzeb. Najlepiej umówić się na bezpłatną konsultację strategiczną, gdzie ocenimy Twoją sytuację i zaproponujemy odpowiedni plan. Bez zobowiązań." },
      { q: "Co jeśli już mam publiczność?", a: "Świetnie — pomożemy Ci ją aktywować i zmonetyzować. Framework działa niezależnie od tego, czy zaczynasz od zera, czy masz już obserwujących. Optymalizujemy Twoje istniejące zasoby i dodajemy sprawdzone systemy wzrostu." },
      { q: "Czy prowadzicie reklamy za mnie?", a: "Tak. Nasz zespół zajmuje się strategią reklamową, kreatywnością, targetowaniem i optymalizacją na Meta, Google i innych platformach. Ty skupiasz się na produkcie, a my kierujemy kwalifikowane leady do Twojego funnela." },
      { q: "Co obejmuje bezpłatna konsultacja?", a: "30-minutową sesję, podczas której analizujemy Twoją obecną sytuację, identyfikujemy idealną grupę docelową, szacujemy Twoje MVA i tworzymy plan działania na 90 dni. Odchodzisz z jasną mapą drogową — niezależnie od tego, czy zdecydujesz się z nami współpracować." },
      { q: "Czym to się różni od agencji marketingowej?", a: "Agencje sprzedają Ci wyświetlenia i kliknięcia. My budujemy Ci aktywo — społeczność ludzi, którzy Ci ufają i są gotowi kupić. Skupiamy się na długoterminowym posiadaniu publiczności, a nie krótkoterminowych metrykach próżności." },
    ],
  },
};

const FAQ = () => {
  const { lang, langPrefix } = useLanguage();
  const data = faqData[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <SEOHead
        title={data.seoTitle}
        description={data.seoDesc}
        canonical={`${langPrefix}/faq`}
        jsonLd={jsonLd}
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
                  {item.a}
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
