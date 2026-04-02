import { useEffect } from "react";
import MvaNavbar from "@/components/mva/MvaNavbar";
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
        title={isPolish ? "Kalkulator MVA – Oblicz swoje Minimum Viable Audience | JAY-23" : "MVA Calculator – Find Your Minimum Viable Audience | JAY-23"}
        description={isPolish ? "Sprawdź, jak dużą publiczność potrzebujesz zanim wystartujesz. Darmowy kalkulator MVA od JAY-23." : "Calculate exactly how many engaged followers you need before launching. Free MVA calculator by JAY-23."}
      />
      <MvaNavbar />
      <main className="pt-20">
        <CalculatorSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Quiz;
