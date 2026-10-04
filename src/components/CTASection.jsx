import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  const handleScrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      className="relative w-full py-36 bg-[#040404] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Intense center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF4D00]/15 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 font-mono text-xs text-[#FF4D00]">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span>JOIN THE FORGE PROTOCOL</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none text-white uppercase drop-shadow-2xl">
          <span className="block whitespace-nowrap">FORGE YOUR</span>
          <span className="block orange-gradient-text whitespace-nowrap">ROUTINE.</span>
        </h2>

        <p className="mt-8 font-mono text-sm md:text-base text-[#B0B0BC] tracking-widest uppercase font-medium">
          CREATINE MONOHYDRATE • PURE • UNFLAVOURED • 5 G PER SERVING
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={handleScrollToProduct}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-mono text-sm font-bold tracking-widest uppercase text-black bg-[#FF4D00] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,77,0,0.4)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              EXPLORE FORGE
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('formula');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-5 border border-white/20 hover:border-white text-white font-mono text-sm font-semibold tracking-widest uppercase transition-colors"
          >
            VIEW FORMULA SPEC
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 font-mono text-xs text-[#90909A] border-t border-white/10 pt-8 w-full max-w-xl">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FF4D00]" /> 100% PURITY
          </span>
          <span>•</span>
          <span>NO FILLERS</span>
          <span>•</span>
          <span>FAST SHIPPING</span>
        </div>
      </div>
    </section>
  );
}
