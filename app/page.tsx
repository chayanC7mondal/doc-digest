import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demoSection";
import HeroSection from "@/components/home/heroSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
      </div>
      <DemoSection />
      {/* <HowItWorksSection/>     */}
      {/* <PricingSection/> */}
      {/* <CTASection/> */}
    </div>
  );
}
