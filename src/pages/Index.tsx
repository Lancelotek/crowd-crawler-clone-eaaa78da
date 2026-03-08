import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainSection from "@/components/PainSection";
import PhasesSection from "@/components/PhasesSection";
import FunnelSection from "@/components/FunnelSection";
import PromptsSection from "@/components/PromptsSection";
import GrowthSection from "@/components/GrowthSection";
import SocialProofSection from "@/components/SocialProofSection";
import QuizSection from "@/components/QuizSection";
import AdsSection from "@/components/AdsSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PainSection />
      <PhasesSection />
      <FunnelSection />
      <PromptsSection />
      <GrowthSection />
      <SocialProofSection />
      <QuizSection />
      <AdsSection />
      <FinalCTASection />
      <FooterSection />
      <FloatingCTA />
    </div>
  );
};

export default Index;