import { useEffect } from "react";
import MvaNavbar from "@/components/mva/MvaNavbar";
import KickstarterBanner from "@/components/mva/KickstarterBanner";

import FooterSection from "@/components/mva/FooterSection";
import CalculatorSection from "@/components/mva/CalculatorSection";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { track } from "@/lib/tracking";

const Quiz = () => {
  const { lang } = useLanguage();
  const isPolish = lang === "pl";

  useEffect(() => {
    track.calcOpen();
  }, []);

  return (
    <>
      <SEOHead

        title={isPolish ? "Kalkulator MVA — ilu fanów potrzebujesz na Kickstartera | JAY-23" : "Kickstarter Calculator — How Many Fans Do You Need? | JAY-23"}
        description={isPolish ? "Sprawdź w 60 sekund, ilu prawdziwych fanów potrzebujesz, żeby Twoja kampania Kickstarter się udała. Darmowy kalkulator MVA od JAY-23." : "Free MVA calculator. Find out how many true fans you need to hit your Kickstarter or Indiegogo goal. Personalized result in 2 minutes."}
        canonical={`/${lang}/quiz`}
        lang={lang}
      />
      <MvaNavbar />
      <main className="pt-20">
        <h1 className="sr-only">
          {isPolish
            ? "Kalkulator MVA — ilu fanów potrzebujesz, żeby Twój Kickstarter się udał"
            : "MVA Calculator – Find Your Minimum Viable Audience"}
        </h1>
        <CalculatorSection />


        <section className="px-6 py-20 border-t border-border/40">
          <div className="container mx-auto max-w-[760px] space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            {isPolish ? (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  Czym właściwie jest Minimum Viable Audience?
                </h2>
                <p>
                  MVA to najmniejsza liczba zaangażowanych odbiorców, jakiej potrzebujesz, żeby premiera produktu zakończyła się sukcesem komercyjnym — nie wirusowym wybuchem, tylko realnym przychodem na koncie. Większość founderów strzela na ślepo: budują produkt miesiącami, a potem desperacko szukają klientów w tygodniu premiery. Framework MVA odwraca tę logikę. Najpierw liczba, potem strategia, potem premiera.
                </p>
                <p>
                  Kalkulator powyżej bierze pod uwagę cztery zmienne, które realnie decydują o sukcesie kampanii: typ produktu (cyfrowy konwertuje inaczej niż fizyczny), docelowy przychód, średnią cenę i specyfikę niszy. Wynik nie jest życzeniem — to konkretny target, który możesz rozłożyć na działania w 90-dniowym programie: budowanie listy mailowej, content, społeczność i sekwencja prelaunch.
                </p>
                <p>
                  Zbudowaliśmy to narzędzie po tym, jak obserwowaliśmy founderów zarabiających sześciocyfrowe kwoty w dniu premiery z listą poniżej 2000 osób, podczas gdy inni z 50 000 followersów mieli problem ze sprzedażą pięćdziesięciu sztuk. Różnica nigdy nie leżała w zasięgu. Leżała w gotowości.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">Jak czytać swój wynik</h3>
                <p>
                  Jeśli kalkulator pokazuje 800–1500 osób, jesteś w przedziale klasycznego MVA dla produktu cyfrowego lub kampanii Kickstarter / Gamefound w średniej półce cenowej. Powyżej 3000 — celujesz w premiery hardware lub produktów premium, gdzie potrzebujesz większego buforu konwersji. Poniżej 500 — zwykle oznacza usługę 1:1 lub bardzo wąską niszę B2B, gdzie liczy się jakość kontaktów, nie skala listy.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">Najczęstsze błędy founderów</h3>
                <p>
                  Największy błąd to traktowanie MVA jako metryki egorystycznej. To nie liczba obserwujących. Ciepła lista 800 osób, które otworzyły trzy ostatnie emaile, jest warta więcej niż 10 000 followersów na Instagramie, którzy nigdy nie kliknęli linku. Kolejna pułapka to odkładanie budowy publiczności na moment, gdy produkt będzie "skończony." Wtedy nie masz czasu na testowanie przekazu, nie masz pętli zwrotnej dla cen i nie masz social proof dla potencjalnych backerów. Trzeci błąd to ignorowanie mnożników niszy. Szeroki produkt konsumencki potrzebuje znacznie większego buforu niż specjalistyczne narzędzie dla profesjonalnej grupy odbiorców, bo intencja i zaufanie są już wyższe w ciasnych społecznościach.
                </p>
                <p>
                  Po wyliczeniu MVA nie zostawiamy Cię z liczbą. Każdy wynik kończy się <a href="/pl/report" className="text-primary hover:underline">spersonalizowanym raportem</a> z analizą TAM, kanałów dystrybucji i 90-dniowym harmonogramem. Jeśli chcesz omówić wynik z człowiekiem — <a href="/pl/book" className="text-primary hover:underline">umów bezpłatną 30-minutową konsultację</a>. Po szerszy kontekst sięgnij do naszych <a href="/pl/blog" className="text-primary hover:underline">artykułów o prelaunch</a> lub zobacz, jak wygląda <a href="/pl/process" className="text-primary hover:underline">cały 90-dniowy proces</a>.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  What a Minimum Viable Audience actually is
                </h2>
                <p>
                  Your MVA is the smallest number of engaged followers you need to make your launch commercially successful — not viral, just profitable. Most founders skip this number entirely. They build for months, then scramble for customers in launch week. The MVA Framework inverts that order: number first, strategy second, launch third.
                </p>
                <p>
                  The calculator above weighs the four variables that actually move launch outcomes: product type (digital converts differently than physical), target revenue, average price point, and niche-specific dynamics. The output is not aspirational — it is a concrete target you can break down into 90 days of list building, content, community, and prelaunch sequencing.
                </p>
                <p>
                  We built this tool after watching dozens of founders raise six figures on launch day with lists smaller than 2,000 people, while others with 50,000 social followers struggled to sell fifty units. The difference was never reach. It was readiness.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">How to read your result</h3>
                <p>
                  If the calculator returns 800–1,500, you are in the classic MVA range for a digital product or a mid-tier crowdfunding campaign. Above 3,000 typically means hardware or premium products that need a larger conversion buffer. Below 500 usually points to a 1:1 service or a tight B2B niche where lead quality matters more than list size.
                </p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">Common mistakes founders make</h3>
                <p>
                  The biggest mistake is treating your MVA as a vanity metric. It is not a follower count. A warm list of 800 people who opened your last three emails is worth more than 10,000 Instagram followers who have never clicked a link. Another trap is delaying audience building until the product is "done." By then you have no time to test messaging, no feedback loop for pricing, and no social proof to show prospective backers. The third mistake is ignoring niche multipliers. A broad consumer gadget needs a much larger buffer than a specialized tool for a professional audience, because intent and trust are already higher in tight communities.
                </p>
                <p>
                  Your number is the start, not the end. Pair it with the <a href="/en/process" className="text-primary hover:underline">90-day MVA process</a> to see how the program is sequenced week by week, browse <a href="/en/blog" className="text-primary hover:underline">tactical articles on prelaunch, waitlists, and community</a>, or read the <a href="/en/faq" className="text-primary hover:underline">frequently asked questions</a> to understand the framework end-to-end. When you are ready to put it into motion, <a href="/en/book" className="text-primary hover:underline">book a free 30-minute strategy call</a> and we will pressure-test your number against your category, channel mix, and timeline.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Quiz;
