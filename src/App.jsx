import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FormulaSection from './components/FormulaSection';
import ScienceSection from './components/ScienceSection';
import MixSection from './components/MixSection';
import EnergySection from './components/EnergySection';
import AthleteSection from './components/AthleteSection';
import ProductSection from './components/ProductSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Smooth progress change handler from Hero component
  const handleHeroProgressChange = useCallback((progress) => {
    // Header reveals smoothly near end of cinematic video film (~90% progress)
    if (progress >= 0.9) {
      setIsNavVisible(true);
    } else {
      setIsNavVisible(false);
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-[#050505] text-[#E0E0E0] min-h-screen selection:bg-[#FF4D00] selection:text-black">
      {/* Header Navigation (Hidden during cinematic video opening, reveals smoothly near end) */}
      <Navbar isVisible={isNavVisible} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* 1. Fullscreen Cinematic Hero Video Sequence */}
        <Hero onProgressChange={handleHeroProgressChange} />

        {/* 2. Primary Website Content (Appears smoothly after cinematic hero finishes) */}
        <FormulaSection />
        <ScienceSection />
        <MixSection />
        <EnergySection />
        <AthleteSection />
        <ProductSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
