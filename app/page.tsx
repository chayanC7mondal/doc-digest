import BgGradient from "@/components/common/bg-gradient";
import HeroSection from "@/components/home/heroSection";
import DemoSection from "@/components/home/demoSection";
import HowItWorksSection from "@/components/home/howItWorks";
import PricingSection from "@/components/home/pricingSection";
import CTASection from "@/components/home/ctaSection";
import { SliderSection } from "@/components/home/sliderSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
        <SliderSection />
      </div>
    </div>
  );
}
