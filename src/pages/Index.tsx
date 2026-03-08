import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhasesSection from "@/components/PhasesSection";
import FunnelSection from "@/components/FunnelSection";
import PromptsSection from "@/components/PromptsSection";
import GrowthSection from "@/components/GrowthSection";
import AdsSection from "@/components/AdsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PhasesSection />
      <FunnelSection />
      <PromptsSection />
      <GrowthSection />
      <AdsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
