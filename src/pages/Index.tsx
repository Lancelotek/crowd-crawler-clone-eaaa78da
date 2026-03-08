import MvaNavbar from "@/components/mva/MvaNavbar";
import HeroSection from "@/components/mva/HeroSection";
import SocialProofSection from "@/components/mva/SocialProofSection";
import ProblemSection from "@/components/mva/ProblemSection";
import SolutionSection from "@/components/mva/SolutionSection";
import CaseStudiesSection from "@/components/mva/CaseStudiesSection";
import CalculatorSection from "@/components/mva/CalculatorSection";
import QuizFunnelSection from "@/components/mva/QuizFunnelSection";
import FinalCTASection from "@/components/mva/FinalCTASection";
import FooterSection from "@/components/mva/FooterSection";
import StickyCTA from "@/components/mva/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header>
        <MvaNavbar />
      </header>
      <main>
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <SolutionSection />
        <CaseStudiesSection />
        <CalculatorSection />
        <QuizFunnelSection />
        <FinalCTASection />
      </main>
      <FooterSection />
      <StickyCTA />
    </div>
  );
};

export default Index;
