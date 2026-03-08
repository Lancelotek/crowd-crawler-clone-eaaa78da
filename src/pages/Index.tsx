import MvaNavbar from "@/components/mva/MvaNavbar";
import HeroSection from "@/components/mva/HeroSection";
import SocialProofSection from "@/components/mva/SocialProofSection";
import WhoSection from "@/components/mva/WhoSection";
import SystemSection from "@/components/mva/SystemSection";
import FunnelSection from "@/components/mva/FunnelSection";
import BeforeAfterSection from "@/components/mva/BeforeAfterSection";
import InfrastructureSection from "@/components/mva/InfrastructureSection";
import UseCasesSection from "@/components/mva/UseCasesSection";
import MetricSection from "@/components/mva/MetricSection";
import FinalCTASection from "@/components/mva/FinalCTASection";
import FooterSection from "@/components/mva/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MvaNavbar />
      <HeroSection />
      <SocialProofSection />
      <WhoSection />
      <SystemSection />
      <FunnelSection />
      <BeforeAfterSection />
      <InfrastructureSection />
      <UseCasesSection />
      <MetricSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
