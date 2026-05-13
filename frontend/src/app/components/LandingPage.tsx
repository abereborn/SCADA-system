import { useState, useEffect } from "react";
import { Navbar } from "./landing/Navbar";
import { HeroSection } from "./landing/HeroSection";
import { StatsSection } from "./landing/StatsSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { PlatformSection } from "./landing/PlatformSection";
import { MapSection } from "./landing/MapSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";
import { PricingSection } from "./landing/PricingSection";
import { CTASection } from "./landing/CTASection";
import { Footer } from "./landing/Footer";
import { LandingBackground } from "./landing/LandingBackground";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scanDown {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(.95); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: hsl(var(--primary)/.2); }
          50% { border-color: hsl(var(--primary)/.5); }
        }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <LandingBackground />

        <div className="relative z-10">
          <Navbar scrolled={scrolled} />
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <PlatformSection />
          <MapSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </>
  );
}
