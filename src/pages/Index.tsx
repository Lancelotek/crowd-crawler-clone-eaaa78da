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
      title: "Prelaunch Marketing Agency for Kickstarter & Crowdfunding | JAY-23",
      description: "JAY-23 helps founders build 1,000 true fans before launch. 90-day MVA program with Meta Ads, email funnels & community building. 46 campaigns, $1.2M+ raised.",
    },
    pl: {
      title: "Agencja marketingu prelaunch dla Kickstarter i crowdfundingu | JAY-23",
      description: "JAY-23 pomaga founderom zbudować 1000 prawdziwych fanów przed premierą. 90-dniowy program MVA z Meta Ads, lejkami email i budowaniem społeczności. 46 kampanii, $1.2M+ zebranych.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seo[lang].title}
        description={seo[lang].description}
        canonical={`/${lang}`}
        lang={lang}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "JAY-23 | MVA Framework",
            "url": "https://jay23.com",
            "inLanguage": ["pl", "en"],
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JAY-23",
            "alternateName": "JAY23",
            "url": "https://jay23.com",
            "logo": "https://jay23.com/assets/jay23-logo-C_2EM8Im.webp",
            "description": lang === "pl"
              ? "MVA Framework — 90-dniowy program pomagający founderom zbudować 1000 prawdziwych fanów przed premierą produktu."
              : "MVA Framework — 90-day program helping founders build 1,000 true fans before product launch.",
            "sameAs": ["https://www.linkedin.com/in/marekciesla/"],
            "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "url": "https://jay23.com/en/book" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "MVA Framework — 90-Day Audience Building Program",
            "provider": { "@type": "Organization", "name": "JAY-23" },
            "url": "https://jay23.com/",
            "description": lang === "pl"
              ? "90-dniowy program budowania Minimum Viable Audience — 1000 prawdziwych fanów — za pomocą płatnych reklam, lejków email, quizów i aktywacji społeczności."
              : "A 90-day program that builds your Minimum Viable Audience — 1,000 true fans — using paid ads, email funnels, quizzes, and community activation.",
            "serviceType": "Pre-launch Audience Building",
            "areaServed": "Worldwide",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "MVA Calculator — Minimum Viable Audience Calculator",
            "description": lang === "pl"
              ? "Darmowy kalkulator szacujący ilu fanów potrzebujesz przed premierą produktu."
              : "Free calculator that estimates how many fans you need before launching your product.",
            "url": `https://jay23.com/${lang}#calculator`,
            "applicationCategory": "BusinessApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://jay23.com/${lang}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seo[lang].title,
            "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", ".speakable"] },
            "url": `https://jay23.com/${lang}`,
          },
        ]}
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
