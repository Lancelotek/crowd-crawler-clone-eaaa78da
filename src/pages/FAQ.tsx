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
    seoTitle: "Kickstarter Prelaunch FAQ — Pricing, Process, Results | JAY-23",
    seoDesc: "Answers about promoting a Kickstarter campaign, MVA Framework pricing, the 90-day process, expected CPL, and working with JAY-23.",
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
    seoTitle: "FAQ Kickstarter — Cena, Proces, Wyniki Kampanii | JAY-23",
    seoDesc: "Odpowiedzi na pytania o promocję Kickstarter w Polsce: ile kosztuje agencja, jak działa framework MVA, ile trwa kampania, jakie wyniki przynosi.",
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
