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
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#040404] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Intense center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] sm:h-[500px] bg-[#FF4D00]/15 blur-[120px] sm:blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 flex flex-col items-center text-center w-full box-border min-w-0">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 font-mono text-[10px] sm:text-xs text-[#FF4D00]">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span>JOIN THE FORGE PROTOCOL</span>
        </div>

        <h2
          className="font-display font-black tracking-tight leading-none text-white uppercase drop-shadow-2xl max-w-full min-w-0 box-border"
          style={{ fontSize: 'clamp(1.85rem, 7.5vw, 5.5rem)' }}
        >
          <span className="block sm:inline">FORGE </span>
          <span className="block sm:inline">YOUR </span>
          <span className="block orange-gradient-text">ROUTINE.</span>
        </h2>

        <p className="mt-4 sm:mt-8 font-mono text-[10px] sm:text-xs md:text-base text-[#B0B0BC] tracking-wider sm:tracking-widest uppercase font-medium max-w-full break-words px-2">
          CREATINE MONOHYDRATE • PURE • UNFLAVOURED • 5 G PER SERVING
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none">
          <button
            onClick={handleScrollToProduct}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-black bg-[#FF4D00] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,77,0,0.4)] cursor-pointer w-full sm:w-auto min-h-[48px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              EXPLORE FORGE
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('formula');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 sm:px-8 py-4 sm:py-5 border border-white/20 hover:border-white text-white font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase transition-colors cursor-pointer w-full sm:w-auto min-h-[48px] flex items-center justify-center"
          >
            VIEW FORMULA SPEC
          </button>
        </div>

        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3 sm:gap-8 font-mono text-[10px] sm:text-xs text-[#90909A] border-t border-white/10 pt-6 sm:pt-8 w-full max-w-xl flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4D00]" /> 100% PURITY
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
