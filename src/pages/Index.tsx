import { lazy, Suspense } from "react";
import MvaNavbar from "@/components/mva/MvaNavbar";
import HeroSection from "@/components/mva/HeroSection";
import StickyCTA from "@/components/mva/StickyCTA";
import CookieConsent from "@/components/CookieConsent";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { useStoreLanguagePreference } from "@/i18n/LanguageRedirect";

const SocialProofSection = lazy(() => import("@/components/mva/SocialProofSection"));
const ColdLaunchTrapSection = lazy(() => import("@/components/mva/ColdLaunchTrapSection"));
const ProblemSection = lazy(() => import("@/components/mva/ProblemSection"));
const FrameworkComparisonSection = lazy(() => import("@/components/mva/FrameworkComparisonSection"));
const HowItWorksSection = lazy(() => import("@/components/mva/HowItWorksSection"));
const CaseStudyDeepSection = lazy(() => import("@/components/mva/CaseStudyDeepSection"));
const CaseStudiesSection = lazy(() => import("@/components/mva/CaseStudiesSection"));
const WhatYouGetSection = lazy(() => import("@/components/mva/WhatYouGetSection"));
const PricingValueSection = lazy(() => import("@/components/mva/PricingValueSection"));
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
      title: "MVA Framework | 46 Campaigns. $1.2M+ Raised. Zero Cold Launches — Jay23",
      description: "The MVA Framework is a 90-day program helping founders build audiences before products. 46 campaigns, $1.2M+ raised, 98+ founders served. Book a free strategy call.",
    },
    pl: {
      title: "MVA Framework — 46 kampanii. $1.2M+ zebranych. Zero zimnych startów — Jay23",
      description: "Framework Minimum Viable Audience pomaga founderom walidować pomysły, budować popyt i startować z publicznością, która już czeka. 24 000 PLN, 90 dni, gwarancja wyników.",
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
        <Suspense fallback={<SectionFallback />}><ColdLaunchTrapSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><ProblemSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><FrameworkComparisonSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><HowItWorksSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><CaseStudyDeepSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><CaseStudiesSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><WhatYouGetSection /></Suspense>
        <Suspense fallback={<SectionFallback />}><PricingValueSection /></Suspense>
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
