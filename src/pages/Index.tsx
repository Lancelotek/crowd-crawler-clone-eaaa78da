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
      title: "Kickstarter Prelaunch Marketing Agency — MVA Framework | JAY-23",
      description: "We help founders build 1,000 true fans before launch. 90-day MVA Framework for Kickstarter, Indiegogo & Gamefound campaigns. 46 campaigns, $1.2M+ raised.",
    },
    pl: {
      title: "Agencja Kickstarter Polska — 90-dniowy program MVA Framework | JAY-23",
      description: "Pomagamy polskim founderom uruchomić udane kampanie Kickstarter. MVA Framework — buduj 1000 fanów przed launchem. Case studies: Woolet, Crowder.pro.",
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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "inLanguage": lang,
            "mainEntity": [
              {
                "@type": "Question",
                "name": lang === "pl" ? "Czym jest MVA Framework?" : "What is the MVA Framework?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "pl"
                    ? "MVA to Minimum Viable Audience — zainspirowane koncepcją 1000 prawdziwych fanów Kevina Kelly'ego. To 90-dniowy program budowania odbiorców przed produktem."
                    : "MVA stands for Minimum Viable Audience — inspired by Kevin Kelly's 1,000 True Fans concept. It's a 90-day structured program to build your audience before your product.",
                },
              },
              {
                "@type": "Question",
                "name": lang === "pl" ? "Dla kogo jest ten program?" : "Who is this for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "pl"
                    ? "Founderzy na wczesnym etapie (25–45 lat) przygotowujący launch produktu, budujący odbiorców od zera lub szukający systematycznego frameworka do walidacji pomysłów."
                    : "Early-stage founders (25–45) preparing a product launch, building initial audiences from scratch, or seeking a systematic framework to validate ideas through community engagement.",
                },
              },
              {
                "@type": "Question",
                "name": lang === "pl" ? "Ile to kosztuje?" : "How much does it cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "pl"
                    ? "MVA Framework to 6 000 PLN netto miesięcznie (24 000 PLN łącznie za 4 miesiące) + VAT. Bez ukrytych kosztów. Umów bezpłatną rozmowę, by omówić szczegóły."
                    : "The MVA Framework is $1,500/month for 4 months ($6,000 total) + VAT. No hidden costs. Book a free strategy call to discuss details.",
                },
              },
              {
                "@type": "Question",
                "name": lang === "pl" ? "Co jeśli mam już produkt?" : "What if I already have a product?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "pl"
                    ? "Framework działa zarówno dla founderów przed, jak i po launchu, którzy muszą zbudować lub ożywić swoją publiczność."
                    : "The framework works for pre-launch AND post-launch founders who need to build or re-energize their audience.",
                },
              },
              {
                "@type": "Question",
                "name": lang === "pl" ? "Czym to się różni od kursu marketingu?" : "How is this different from a marketing course?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "pl"
                    ? "To nie kurs — to 90-dniowy praktyczny program z szablonami, narzędziami, coachingiem i prawdziwym launchem na końcu."
                    : "It's not a course — it's a 90-day hands-on program with templates, tools, coaching calls, and a real launch at the end.",
                },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": lang === "pl" ? "MVA Framework — 90-dniowy program" : "MVA Framework — 90-day program",
            "url": `https://jay23.com/${lang}/packages`,
            "price": lang === "pl" ? "6000" : "1500",
            "priceCurrency": lang === "pl" ? "PLN" : "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": lang === "pl" ? "6000" : "1500",
              "priceCurrency": lang === "pl" ? "PLN" : "USD",
              "unitText": "MONTH",
              "valueAddedTaxIncluded": false,
            },
            "eligibleDuration": { "@type": "QuantitativeValue", "value": 4, "unitCode": "MON" },
            "availability": "https://schema.org/InStock",
            "category": "Pre-launch marketing service",
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
