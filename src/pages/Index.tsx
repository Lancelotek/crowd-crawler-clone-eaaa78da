import { lazy, Suspense } from "react";
import MvaNavbar from "@/components/mva/MvaNavbar";
import HeroSection from "@/components/mva/HeroSection";
import StickyCTA from "@/components/mva/StickyCTA";
import CookieConsent from "@/components/CookieConsent";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { useStoreLanguagePreference } from "@/i18n/LanguageRedirect";

const SocialProofSection = lazy(() => import("@/components/mva/SocialProofSection"));
const ProblemSection = lazy(() => import("@/components/mva/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/mva/SolutionSection"));
const CaseStudiesSection = lazy(() => import("@/components/mva/CaseStudiesSection"));
const FounderSection = lazy(() => import("@/components/mva/FounderSection"));
const FinalCTASection = lazy(() => import("@/components/mva/FinalCTASection"));
const FooterSection = lazy(() => import("@/components/mva/FooterSection"));

const SectionFallback = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const { lang } = useLanguage();
  useStoreLanguagePreference(lang);

  const seo = {
    en: {
      title: "MVA Framework — Build Your First 1,000 True Fans Before You Launch",
      description: "The Minimum Viable Audience framework helps founders validate ideas, build demand, and launch with an audience already waiting. Free MVA calculator & strategy quiz.",
    },
    pl: {
      title: "MVA Framework — Zbuduj 1 000 prawdziwych fanów zanim zastartujesz",
      description: "Framework Minimum Viable Audience pomaga founderom walidować pomysły, budować popyt i startować z publicznością, która już czeka. Darmowy kalkulator MVA.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo[lang].title}
        description={seo[lang].description}
        canonical={`/${lang}`}
      />
      <header>
        <MvaNavbar />
      </header>
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}><SocialProofSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProblemSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><SolutionSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><CaseStudiesSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FounderSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FinalCTASection /></Suspense>
      </main>
      <Suspense fallback={null}><FooterSection /></Suspense>
      <StickyCTA />
    </div>
  );
};

export default Index;
