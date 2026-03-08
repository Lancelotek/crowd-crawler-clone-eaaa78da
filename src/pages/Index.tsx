import { lazy, Suspense } from "react";
import MvaNavbar from "@/components/mva/MvaNavbar";
import HeroSection from "@/components/mva/HeroSection";
import StickyCTA from "@/components/mva/StickyCTA";

// Lazy load below-fold sections
const SocialProofSection = lazy(() => import("@/components/mva/SocialProofSection"));
const TweetProofSection = lazy(() => import("@/components/mva/TweetProofSection"));
const ProblemSection = lazy(() => import("@/components/mva/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/mva/SolutionSection"));
const CaseStudiesSection = lazy(() => import("@/components/mva/CaseStudiesSection"));
const CalculatorSection = lazy(() => import("@/components/mva/CalculatorSection"));
const QuizFunnelSection = lazy(() => import("@/components/mva/QuizFunnelSection"));
const FounderSection = lazy(() => import("@/components/mva/FounderSection"));
const FinalCTASection = lazy(() => import("@/components/mva/FinalCTASection"));
const FooterSection = lazy(() => import("@/components/mva/FooterSection"));

const SectionFallback = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header>
        <MvaNavbar />
      </header>
      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <SocialProofSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TweetProofSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SolutionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudiesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FounderSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CalculatorSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <QuizFunnelSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FinalCTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
      <StickyCTA />
    </div>
  );
};

export default Index;
