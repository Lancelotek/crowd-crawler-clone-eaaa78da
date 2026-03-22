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
  a: string; // supports HTML
}

const faqData: Record<"en" | "pl", { title: string; subtitle: string; seoTitle: string; seoDesc: string; items: FaqItem[] }> = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about the MVA Framework and working with JAY-23.",
    seoTitle: "FAQ — MVA Framework by JAY-23",
    seoDesc: "Answers to the most common questions about the MVA Framework, our 90-day program, pricing, and how we help founders build audiences before launch.",
    items: [
      { q: "What is a Minimum Viable Audience (MVA)?", a: 'MVA is the smallest group of people you need to build BEFORE launching your product. Instead of building first and hoping people show up, the <a href="/en/blog" class="text-primary hover:underline">MVA Framework</a> flips the script: audience first, product second. Use our free <a href="/en#calculator" class="text-primary hover:underline">MVA Calculator</a> to find your number.' },
      { q: "How does the MVA 90-day program work?", a: 'The program runs for 90 days in three phases: Build (Days 1-30), Drive (Days 31-60), and Launch (Days 61-90). Each phase builds on the last so nothing is wasted. <a href="/en/process" class="text-primary hover:underline">See our full process</a>.' },
      { q: "How do I calculate my Minimum Viable Audience?", a: 'Use the formula: MVA = (Target Revenue / Average Price) × Niche Multiplier × Product Multiplier. Or simply use our free <a href="/en#calculator" class="text-primary hover:underline">MVA Calculator</a> to get your number instantly.' },
      { q: "Why should I build an audience before launching?", a: "Products launched without an audience fail 70% of the time. Building an audience first lets you validate your idea, create demand, and have paying customers ready on launch day. Audience-first campaigns achieve 3-4x higher conversion rates." },
      { q: "What results can I expect from the MVA program?", a: 'Our clients typically build a list of 1,000-5,000+ engaged subscribers, achieve 20%+ waitlist-to-customer conversion rates, and raise $50K-$600K+ on launch day. Results vary based on niche and commitment. <a href="/en/book" class="text-primary hover:underline">Book a free strategy call</a> to discuss your situation.' },
      { q: "What is the difference between MVA and MVP?", a: "MVP (Minimum Viable Product) focuses on building the simplest version of your product. MVA (Minimum Viable Audience) focuses on building the smallest group of engaged people who will buy your product. We believe you should build your MVA before your MVP." },
      { q: "What is a prelaunch strategy?", a: "A prelaunch strategy includes everything you do BEFORE your product launches to build demand and an audience. It covers building a waitlist, content marketing, community building, and collecting social proof." },
      { q: "How to build a community around your product?", a: "Use the ACP framework: Attract (draw people with value — content, free resources), Connect (bring people together — Discord/Slack group), Participate (engage — regular formats, shared projects). Start with 20-30 people." },
      { q: "How to build an email list before launch?", a: "Set up a landing page with a lead magnet (free guide, calculator, template), promote through content on LinkedIn/Twitter, collect emails and nurture with email sequences. Tools: MailerLite, ConvertKit." },
    ],
  },
  pl: {
    title: "Najczęściej Zadawane Pytania",
    subtitle: "Wszystko, co musisz wiedzieć o MVA Framework i współpracy z JAY-23.",
    seoTitle: "FAQ — MVA Framework od JAY-23",
    seoDesc: "Odpowiedzi na najczęstsze pytania o MVA Framework, nasz program 90-dniowy, cennik i jak pomagamy founderom budować społeczność przed premierą.",
    items: [
      { q: "Co to jest Minimum Viable Audience (MVA)?", a: 'MVA to najmniejsza grupa osób, którą musisz zbudować ZANIM wystartujesz z produktem. Zamiast budować produkt i liczyć na to, że ludzie się pojawią, <a href="/pl/blog/co-to-jest-minimum-viable-audience-mva-przewodnik" class="text-primary hover:underline">MVA Framework</a> odwraca schemat: najpierw publiczność, potem produkt. Użyj naszego darmowego <a href="/pl#calculator" class="text-primary hover:underline">kalkulatora MVA</a> aby obliczyć swoją liczbę.' },
      { q: "Jak działa 90-dniowy program MVA?", a: 'Program trwa 90 dni, podzielonych na trzy fazy: Buduj (Dni 1-30), Napędzaj (Dni 31-60) i Startuj (Dni 61-90). Każda faza buduje na poprzedniej, więc nic nie jest zmarnowane. <a href="/pl/process" class="text-primary hover:underline">Zobacz nasz pełny proces</a>.' },
      { q: "Jak obliczyć swoje Minimum Viable Audience?", a: 'Użyj formuły: MVA = (Docelowy przychód / Średnia cena) × Mnożnik niszy × Mnożnik produktu. Albo po prostu skorzystaj z naszego darmowego <a href="/pl#calculator" class="text-primary hover:underline">kalkulatora MVA</a> aby natychmiast otrzymać wynik.' },
      { q: "Dlaczego warto zbudować publiczność przed launchem?", a: "70% produktów startujących bez publiczności ponosi porażkę. Budowanie publiczności najpierw pozwala zwalidować pomysł, stworzyć popyt i mieć płacących klientów gotowych w dniu premiery. Kampanie audience-first osiągają 3-4x wyższy wskaźnik konwersji." },
      { q: "Jakich rezultatów mogę się spodziewać po programie MVA?", a: 'Nasi klienci zazwyczaj budują listę 1000-5000+ zaangażowanych subskrybentów, osiągają 20%+ konwersję z waitlisty na klientów i zbierają $50K-$600K+ w dniu premiery. Wyniki zależą od niszy i zaangażowania. <a href="/pl/book" class="text-primary hover:underline">Umów bezpłatną konsultację</a> aby omówić Twoją sytuację.' },
      { q: "Czym różni się MVA od MVP?", a: "MVP (Minimum Viable Product) skupia się na zbudowaniu najprostszej wersji produktu. MVA (Minimum Viable Audience) skupia się na zbudowaniu najmniejszej grupy zaangażowanych osób, które kupią Twój produkt. Uważamy, że powinieneś zbudować swoje MVA przed MVP." },
      { q: "Co to jest strategia prelaunch?", a: 'Strategia prelaunch to wszystkie działania, które podejmujesz PRZED premierą produktu aby zbudować popyt i publiczność. Obejmuje budowanie waitlisty, content marketing, community building i zbieranie social proof. Więcej w naszym przewodniku: <a href="/pl/blog/strategia-prelaunch-kompletny-przewodnik" class="text-primary hover:underline">Strategia prelaunch od A do Z</a>.' },
      { q: "Jak zbudować społeczność wokół produktu?", a: 'Użyj frameworka ACP: Attract (przyciągnij wartością — content, darmowe zasoby), Connect (połącz ludzi ze sobą — grupa Discord/Slack), Participate (angażuj — regularne formaty, wspólne projekty). Zacznij od 20-30 osób. Więcej: <a href="/pl/blog/budowanie-spolecznosci-wokol-produktu" class="text-primary hover:underline">Framework ACP dla founderów</a>.' },
      { q: "Jak zbudować listę mailingową przed launchem?", a: 'Postaw landing page z lead magnetem (darmowy przewodnik, kalkulator, szablon), promuj przez content na LinkedIn/Twitter, zbieraj emaile i pielęgnuj relacje sekwencją emaili. Narzędzia: MailerLite, ConvertKit. Szczegóły: <a href="/pl/blog/jak-zbudowac-liste-mailingowa" class="text-primary hover:underline">Jak zbudować listę mailingową od zera</a>.' },
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
      acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, '') },
    })),
  };

  return (
    <>
      <SEOHead
        title={data.seoTitle}
        description={data.seoDesc}
        canonical={`${langPrefix}/faq`}
        jsonLd={jsonLd}
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
