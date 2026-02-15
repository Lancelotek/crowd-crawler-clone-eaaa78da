import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoStrip from "@/components/LogoStrip";
import WhyFailSection from "@/components/WhyFailSection";
import ProcessSection from "@/components/ProcessSection";
import ForWhoSection from "@/components/ForWhoSection";
import IncludesSection from "@/components/IncludesSection";
import QuoteSection from "@/components/QuoteSection";
import ExpertSection from "@/components/ExpertSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CommunitySection from "@/components/CommunitySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoStrip />
      <WhyFailSection />
      <ProcessSection />
      <ForWhoSection />
      <IncludesSection />
      <QuoteSection />
      <ExpertSection />
      <CaseStudiesSection />
      <CommunitySection />
      <FooterSection />
    </div>
  );
};

export default Index;
