import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Zap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FormulaSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="formula"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 md:py-32 bg-[#050505] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FF4D00]/5 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-white/5 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 w-full box-border">
        {/* Editorial Section Header */}
        <div ref={titleRef} className="flex flex-col gap-4 sm:gap-6 max-w-4xl w-full min-w-0 box-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.25em]">
              01 // FORMULA SPECIFICATION
            </span>
            <div className="h-px w-12 bg-[#FF4D00]/40" />
          </div>

          <h2
            className="font-display font-extrabold tracking-tight leading-[0.95] text-white uppercase max-w-full min-w-0 box-border"
            style={{ fontSize: 'clamp(1.75rem, 6.5vw, 4.5rem)' }}
          >
            <span className="block sm:inline">PURE BY </span>
            <span className="block sm:inline text-[#FF4D00]">DESIGN.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-2 sm:mt-4 pt-4 sm:pt-6 border-t border-white/10 w-full min-w-0">
            <p className="font-sans text-base sm:text-xl md:text-2xl font-light text-white leading-snug">
              Creatine Monohydrate.
              <br />
              <span className="text-[#90909A]">Nothing unnecessary. Nothing hidden.</span>
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#90909A] leading-relaxed">
              Synthesized to exact pharmaceutical grade standards. FORGE LABS Creatine Monohydrate delivers maximum bio-availability with zero filler agents, zero artificial flavors, and zero banned substances.
            </p>
          </div>
        </div>

        {/* Technical Specification Grid Sheet */}
        <div className="mt-8 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0 box-border">
          {/* Card 1 */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="group relative p-5 sm:p-8 bg-[#0D0D0E] border border-white/10 hover:border-[#FF4D00]/60 transition-all duration-500 rounded-none flex flex-col justify-between min-h-[260px] sm:min-h-[320px] overflow-hidden w-full box-border min-w-0"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D00]/10 rounded-full blur-2xl group-hover:bg-[#FF4D00]/20 transition-all" />
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF4D00]">SPEC 01 // PURITY</span>
              <Activity className="w-5 h-5 text-[#90909A] group-hover:text-[#FF4D00] transition-colors" />
            </div>

            <div className="my-4 sm:my-6">
              <div className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white group-hover:scale-105 transition-transform duration-300 origin-left">
                100%
              </div>
              <div className="font-mono text-xs sm:text-sm tracking-widest text-[#FF4D00] uppercase mt-2 font-semibold">
                CREATINE MONOHYDRATE
              </div>
            </div>

            <p className="font-mono text-xs text-[#90909A] border-t border-white/5 pt-4">
              Micro-refined HPLC certified pure raw powder. No binders or anti-caking additives.
            </p>
          </div>

          {/* Card 2 */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="group relative p-5 sm:p-8 bg-[#0D0D0E] border border-white/10 hover:border-[#FF4D00]/60 transition-all duration-500 rounded-none flex flex-col justify-between min-h-[260px] sm:min-h-[320px] overflow-hidden w-full box-border min-w-0"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#FF4D00]/20 transition-all pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF4D00]">SPEC 02 // DOSAGE</span>
              <Zap className="w-5 h-5 text-[#90909A] group-hover:text-[#FF4D00] transition-colors" />
            </div>

            <div className="my-4 sm:my-6">
              <div className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white group-hover:scale-105 transition-transform duration-300 origin-left">
                5 G
              </div>
              <div className="font-mono text-xs sm:text-sm tracking-widest text-white uppercase mt-2 font-semibold">
                PER SERVING
              </div>
            </div>

            <p className="font-mono text-xs text-[#90909A] border-t border-white/5 pt-4">
              Optimal clinically validated daily dosage to maintain complete muscle phosphocreatine saturation.
            </p>
          </div>

          {/* Card 3 */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="group relative p-5 sm:p-8 bg-[#0D0D0E] border border-white/10 hover:border-[#FF4D00]/60 transition-all duration-500 rounded-none flex flex-col justify-between min-h-[260px] sm:min-h-[320px] overflow-hidden w-full box-border min-w-0"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D00]/10 rounded-full blur-2xl group-hover:bg-[#FF4D00]/20 transition-all pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs text-[#FF4D00]">SPEC 03 // FORM</span>
              <Award className="w-5 h-5 text-[#90909A] group-hover:text-[#FF4D00] transition-colors" />
            </div>

            <div className="my-4 sm:my-6">
              <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white group-hover:scale-105 transition-transform duration-300 origin-left uppercase">
                PURE
              </div>
              <div className="font-mono text-xs sm:text-sm tracking-widest text-[#FF4D00] uppercase mt-2 font-semibold">
                UNFLAVOURED
              </div>
            </div>

            <p className="font-mono text-xs text-[#90909A] border-t border-white/5 pt-4">
              Seamlessly dissolves into water, coffee, or pre-workout protocols without grit or residual taste.
            </p>
          </div>
        </div>

        {/* Technical Specification Matrix */}
        <div className="mt-8 sm:mt-16 p-4 sm:p-8 bg-[#0a0a0b] border border-white/10 w-full box-border min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-2">
            <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-wider font-semibold">
              TECHNICAL ANALYTICAL DATA SHEET
            </span>
            <span className="font-mono text-[10px] text-[#90909A]">LAB ID: FG-CR-2026</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-[#90909A] text-[9px] sm:text-[10px]">MICRONIZATION</span>
              <span className="text-white font-bold">200 MESH FINE</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#90909A] text-[9px] sm:text-[10px]">MOISTURE CONTENT</span>
              <span className="text-white font-bold">&lt; 0.05%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#90909A] text-[9px] sm:text-[10px]">HEAVY METALS</span>
              <span className="text-[#FF4D00] font-bold">NOT DETECTED</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#90909A] text-[9px] sm:text-[10px]">SOLUBILITY</span>
              <span className="text-white font-bold">INSTANTIZED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
