import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, ArrowRight, FileText, X } from 'lucide-react';

export default function ProductSection() {
  const [selectedSize, setSelectedSize] = useState('500g');
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <section
      id="product"
      className="relative w-full py-32 bg-[#050505] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF4D00]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.25em]">
              06 // OFFICIAL PRODUCT SPECIFICATION
            </span>
            <div className="h-px w-12 bg-[#FF4D00]/40" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5.5rem] 2xl:text-[6.5rem] tracking-tight leading-[0.95] text-white uppercase">
            <span className="block whitespace-nowrap">THE</span>
            <span className="block whitespace-nowrap">DAILY</span>
            <span className="block orange-gradient-text whitespace-nowrap">ESSENTIAL.</span>
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-[#B0B0BC] leading-relaxed">
            The foundational supplement for modern athletic performance. Uncompromised purity, instant solubility, zero additives.
          </p>
        </div>

        {/* Product Card & Interactive Spec Showcase Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Product Tub Visual Container */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-12 bg-[#0A0A0C] border border-white/15 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Orange Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D00]/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-center z-10">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-[#FF4D00] uppercase tracking-wider font-bold">
                BATCH FG-2026-X
              </span>
              <span className="font-mono text-xs text-[#90909A]">100 SERVINGS</span>
            </div>

            {/* Packaging Graphic Display Container */}
            <div className="my-8 sm:my-12 py-8 sm:py-12 px-4 sm:px-6 bg-[#0E0E12] border border-white/10 relative z-10 flex flex-col items-center text-center shadow-2xl group-hover:border-[#FF4D00]/40 transition-colors w-full max-w-full overflow-hidden">
              <div className="w-16 h-1 bg-[#FF4D00] mb-6 shadow-[0_0_12px_#FF4D00]" />
              
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-widest text-white uppercase">
                FORGE LABS
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-white tracking-tight uppercase mt-2 max-w-full text-center leading-tight">
                <span className="block">CREATINE</span>
                <span className="block text-[#FF4D00] mt-0.5">MONOHYDRATE</span>
              </h3>

              <div className="mt-6 py-2 px-4 border-y border-white/15 font-mono text-xs text-[#E0E0E0] tracking-widest uppercase font-semibold">
                PURE • UNFLAVOURED
              </div>

              <div className="mt-4 font-mono text-sm text-[#FF4D00] font-bold tracking-wider">
                5 G PER SERVING
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 w-full flex justify-between items-center text-[10px] font-mono text-[#90909A]">
                <span>NET WT 500 G</span>
                <span>HPLC TESTED</span>
              </div>
            </div>

            {/* Lower info */}
            <div className="flex justify-between items-center z-10 pt-4 border-t border-white/10 font-mono text-xs">
              <span className="text-[#90909A]">STATUS: IN STOCK</span>
              <button
                onClick={() => setShowCertModal(true)}
                className="flex items-center gap-1.5 text-[#FF4D00] hover:underline cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW CERTIFICATE OF ANALYSIS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specification & Order Selection */}
          <div className="lg:col-span-6 p-8 md:p-12 bg-[#0C0C0E] border border-white/15 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display font-bold text-3xl text-white">FORGE CREATINE</h3>
                  <span className="font-mono text-xs text-[#FF4D00] block mt-1">100% UNFLAVOURED PHARMACEUTICAL GRADE</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-3xl text-white">$42.00</span>
                  <span className="font-mono text-[10px] text-[#90909A] block">FREE EXPRESS SHIPPING</span>
                </div>
              </div>

              {/* Package Size Selector */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-[#90909A] uppercase tracking-wider">
                  SELECT TUB SIZE
                </span>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <button
                    onClick={() => setSelectedSize('500g')}
                    className={`p-4 border text-left transition-all ${
                      selectedSize === '500g'
                        ? 'bg-[#18181C] border-[#FF4D00] text-white shadow-[0_0_15px_rgba(255,77,0,0.2)]'
                        : 'bg-[#08080a] border-white/10 text-[#90909A] hover:border-white/30'
                    }`}
                  >
                    <span className="block font-bold text-sm text-white">500 G TUB</span>
                    <span className="text-[10px] text-[#FF4D00]">100 SERVINGS ($0.42 / DOSE)</span>
                  </button>

                  <button
                    onClick={() => setSelectedSize('1000g')}
                    className={`p-4 border text-left transition-all ${
                      selectedSize === '1000g'
                        ? 'bg-[#18181C] border-[#FF4D00] text-white shadow-[0_0_15px_rgba(255,77,0,0.2)]'
                        : 'bg-[#08080a] border-white/10 text-[#90909A] hover:border-white/30'
                    }`}
                  >
                    <span className="block font-bold text-sm text-white">1000 G TWIN TUB</span>
                    <span className="text-[10px] text-[#FF4D00]">200 SERVINGS (VALUE PACK)</span>
                  </button>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-3 font-mono text-xs text-[#B0B0BC] border-t border-b border-white/10 py-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF4D00]" />
                  <span>100% Pure Micronized Creatine Monohydrate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF4D00]" />
                  <span>5 Grams Active Dose per Scoop</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF4D00]" />
                  <span>Zero Artificial Flavors, Fillers, or Preservatives</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#FF4D00]" />
                  <span>Third-Party Tested for Heavy Metals & Banned Substances</span>
                </div>
              </div>
            </div>

            {/* CTA Action */}
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('cta');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-5 bg-[#FF4D00] hover:bg-[#FF661A] text-white font-mono text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,77,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CLAIM YOUR PROTOCOL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#90909A]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D00]" /> 100% SATISFACTION GUARANTEE
                </span>
                <span>•</span>
                <span>FAST DISPATCH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-[#0E0E12] border border-white/20 p-8 relative flex flex-col gap-6 font-mono">
            <button
              onClick={() => setShowCertModal(false)}
              className="absolute top-6 right-6 text-[#90909A] hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
              <span className="text-xs text-[#FF4D00] font-bold">INDEPENDENT LABORATORY CERTIFICATE</span>
              <h3 className="font-display text-2xl text-white font-bold">CERTIFICATE OF ANALYSIS</h3>
              <span className="text-[10px] text-[#90909A]">LOT # FG-CR-2026-0914 // METHOD: ISO/IEC 17025</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#90909A]">ANALYTE</span>
                <span className="text-white font-bold">CREATINE MONOHYDRATE</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#90909A]">PURITY (HPLC)</span>
                <span className="text-[#FF4D00] font-bold">99.94% PASS</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#90909A]">HEAVY METALS (ICP-MS)</span>
                <span className="text-white font-bold">&lt; 0.001 PPM PASS</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-[#90909A]">MICROBIAL SCREEN</span>
                <span className="text-white font-bold">NEGATIVE / PASS</span>
              </div>
            </div>

            <button
              onClick={() => setShowCertModal(false)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase"
            >
              CLOSE VERIFICATION
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
