import { PAGE_COPY } from "@/content/quizCopy";
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

        title={isPolish ? "Kalkulator MVA — ilu fanów potrzebujesz na Kickstartera | JAY-23" : "MVA Calculator — How Many True Fans You Need Before Launch"}
        description={isPolish ? "Sprawdź w 60 sekund, ilu prawdziwych fanów potrzebujesz, żeby Twoja kampania Kickstarter się udała. Darmowy kalkulator MVA od JAY-23." : "Free Minimum Viable Audience calculator. Answer 6 questions and get the exact number of true fans you need before launching your product."}
        canonical={`/${lang}/quiz`}
        lang={lang}
      />
      <KickstarterBanner />
      <MvaNavbar />
      <main className="pt-20">
        <h1 className="sr-only">
          {isPolish
            ? "Kalkulator MVA — ilu fanów potrzebujesz, żeby Twój Kickstarter się udał"
            : "MVA Calculator — How Many True Fans You Need Before Launch"}
        </h1>
        <CalculatorSection />


        <section className="px-6 py-20 border-t border-border/40">
          <div className="container mx-auto max-w-[760px] space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            {isPolish ? (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{PAGE_COPY.text[0]}</h2>
                <p>{PAGE_COPY.text[1]}</p>
                <p>{PAGE_COPY.text[2]}</p>
                <p>{PAGE_COPY.text[3]}</p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">{PAGE_COPY.text[4]}</h3>
                <p>{PAGE_COPY.text[5]}</p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">{PAGE_COPY.text[6]}</h3>
                <p>{PAGE_COPY.text[7]}</p>
                <p>{PAGE_COPY.text[8]}<a href="/pl/report" className="text-primary hover:underline">{PAGE_COPY.text[9]}</a>{PAGE_COPY.text[10]}<a href="/pl/book" className="text-primary hover:underline">{PAGE_COPY.text[11]}</a>{PAGE_COPY.text[12]}<a href="/pl/blog" className="text-primary hover:underline">{PAGE_COPY.text[13]}</a>{PAGE_COPY.text[14]}<a href="/pl/process" className="text-primary hover:underline">{PAGE_COPY.text[15]}</a>{PAGE_COPY.text[16]}</p>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{PAGE_COPY.text[17]}</h2>
                <p>{PAGE_COPY.text[18]}</p>
                <p>{PAGE_COPY.text[19]}</p>
                <p>{PAGE_COPY.text[20]}</p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">{PAGE_COPY.text[21]}</h3>
                <p>{PAGE_COPY.text[22]}</p>
                <h3 className="font-display text-xl font-bold text-foreground pt-4">{PAGE_COPY.text[23]}</h3>
                <p>{PAGE_COPY.text[24]}</p>
                <p>{PAGE_COPY.text[25]}<a href="/en/process" className="text-primary hover:underline">{PAGE_COPY.text[26]}</a>{PAGE_COPY.text[27]}<a href="/en/blog" className="text-primary hover:underline">{PAGE_COPY.text[28]}</a>{PAGE_COPY.text[29]}<a href="/en/faq" className="text-primary hover:underline">{PAGE_COPY.text[30]}</a>{PAGE_COPY.text[31]}<a href="/en/book" className="text-primary hover:underline">{PAGE_COPY.text[32]}</a>{PAGE_COPY.text[33]}</p>
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
