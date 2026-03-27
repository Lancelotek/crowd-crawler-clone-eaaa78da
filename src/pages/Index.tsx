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
const HowItWorksSection = lazy(() => import("@/components/mva/HowItWorksSection"));
const CaseStudiesSection = lazy(() => import("@/components/mva/CaseStudiesSection"));
const WhatYouGetSection = lazy(() => import("@/components/mva/WhatYouGetSection"));
const FounderSection = lazy(() => import("@/components/mva/FounderSection"));
const FAQSection = lazy(() => import("@/components/mva/FAQSection"));
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
      title: "MVA Framework | Build 1,000 True Fans in 90 Days — Jay23",
      description: "Stop launching to silence. The MVA Framework is a 90-day program helping founders build audiences before products. Free MVA quiz + strategy calls. 98+ founders served.",
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
        lang={lang}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "JAY-23 | MVA Framework",
          "url": "https://jay23.com",
          "inLanguage": ["pl", "en"],
        }}
      />
      <header>
        <MvaNavbar />
      </header>
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}><SocialProofSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProblemSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><HowItWorksSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><CaseStudiesSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><WhatYouGetSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FounderSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FAQSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FinalCTASection /></Suspense>
      </main>
      <Suspense fallback={null}><FooterSection /></Suspense>
      <StickyCTA />
      <CookieConsent />
    </div>
  );
};

export default Index;
