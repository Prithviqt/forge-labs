import React, { useState } from 'react';
import { Activity, ShieldCheck, Flame, RefreshCw, BarChart2, Layers } from 'lucide-react';

export default function ScienceSection() {
  const [activeTab, setActiveTab] = useState('atp');

  return (
    <section
      id="science"
      className="relative w-full py-16 sm:py-24 md:py-32 bg-[#08080a] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#FF4D00]/5 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 w-full box-border">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl w-full min-w-0 box-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.25em]">
              02 // PHYSIOLOGICAL MECHANISM
            </span>
            <div className="h-px w-12 bg-[#FF4D00]/40" />
          </div>

          <h2
            className="font-display font-extrabold tracking-tight leading-[0.95] text-white uppercase max-w-full min-w-0 box-border"
            style={{ fontSize: 'clamp(1.75rem, 6.5vw, 4.5rem)' }}
          >
            <span className="block sm:inline">THE SCIENCE </span>
            <span className="block sm:inline orange-gradient-text">IS SIMPLE.</span>
          </h2>

          <p className="mt-2 sm:mt-4 font-sans text-sm sm:text-lg text-[#B0B0BC] leading-relaxed">
            Creatine monohydrate is one of the most thoroughly researched dietary compounds in sports science. It is stored primarily in skeletal muscle tissue and acts as a critical donor in the phosphocreatine system to rapidly regenerate ATP (Adenosine Triphosphate) during short bursts of high-intensity muscular effort.
          </p>
        </div>

        {/* Interactive Mechanism Breakdown Tabs */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full min-w-0 box-border">
          {/* Left Tab Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3 w-full min-w-0 box-border">
            <button
              onClick={() => setActiveTab('atp')}
              className={`p-4 sm:p-6 text-left border transition-all duration-300 flex flex-col gap-1.5 sm:gap-2 w-full box-border min-w-0 cursor-pointer ${
                activeTab === 'atp'
                  ? 'bg-[#121215] border-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.15)]'
                  : 'bg-[#0a0a0c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF4D00]">01 // ENERGY REGENERATION</span>
                <RefreshCw className={`w-4 h-4 ${activeTab === 'atp' ? 'text-[#FF4D00] animate-spin' : 'text-[#90909A]'}`} />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-white">ATP Regeneration</span>
              <span className="font-mono text-xs text-[#90909A]">
                Converts ADP back into ATP during explosive muscular contractions.
              </span>
            </button>

            <button
              onClick={() => setActiveTab('saturation')}
              className={`p-4 sm:p-6 text-left border transition-all duration-300 flex flex-col gap-1.5 sm:gap-2 w-full box-border min-w-0 cursor-pointer ${
                activeTab === 'saturation'
                  ? 'bg-[#121215] border-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.15)]'
                  : 'bg-[#0a0a0c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF4D00]">02 // MUSCLE SATURATION</span>
                <BarChart2 className={`w-4 h-4 ${activeTab === 'saturation' ? 'text-[#FF4D00]' : 'text-[#90909A]'}`} />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-white">Intracellular Saturation</span>
              <span className="font-mono text-xs text-[#90909A]">
                Increases muscle phosphocreatine pools by 20%–40% over baseline.
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hydration')}
              className={`p-4 sm:p-6 text-left border transition-all duration-300 flex flex-col gap-1.5 sm:gap-2 w-full box-border min-w-0 cursor-pointer ${
                activeTab === 'hydration'
                  ? 'bg-[#121215] border-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.15)]'
                  : 'bg-[#0a0a0c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF4D00]">03 // CELLULAR VOLUMIZATION</span>
                <Layers className={`w-4 h-4 ${activeTab === 'hydration' ? 'text-[#FF4D00]' : 'text-[#90909A]'}`} />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-white">Osmotic Osmolality</span>
              <span className="font-mono text-xs text-[#90909A]">
                Draws intracellular water into muscle fibers to promote cellular fullness.
              </span>
            </button>
          </div>

          {/* Right Display Canvas / Diagram */}
          <div className="lg:col-span-8 p-5 sm:p-8 md:p-12 bg-[#0b0b0e] border border-white/10 min-h-0 sm:min-h-[420px] flex flex-col justify-between w-full box-border min-w-0">
            {activeTab === 'atp' && (
              <div className="flex flex-col gap-5 sm:gap-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs text-[#FF4D00]">THE PCr-ATP CYCLE</span>
                  <span className="font-mono text-[10px] text-[#90909A]">BIOENERGETIC PATHWAY</span>
                </div>

                <div className="my-2 sm:my-4 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="p-4 sm:p-6 bg-[#141418] border border-white/10 flex flex-col items-center justify-center">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">ADP</span>
                    <span className="font-mono text-[10px] text-[#90909A] mt-1">Adenosine Diphosphate</span>
                    <span className="font-mono text-xs text-[#FF4D00] mt-2 sm:mt-3">Depleted Energy</span>
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs text-[#FF4D00] font-bold">+ PCr (Phosphocreatine)</span>
                      <div className="w-20 sm:w-24 h-0.5 bg-[#FF4D00] relative my-1">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-[#FF4D00] transform rotate-45" />
                      </div>
                      <span className="font-mono text-[9px] text-[#90909A]">Creatine Kinase Enzyme</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 bg-[#141418] border border-[#FF4D00]/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,77,0,0.1)]">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#FF4D00]">ATP</span>
                    <span className="font-mono text-[10px] text-[#90909A] mt-1">Adenosine Triphosphate</span>
                    <span className="font-mono text-xs text-white mt-2 sm:mt-3">Raw Cellular Fuel</span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#90909A] leading-relaxed">
                  During maximal exertion (such as heavy lifting or sprinting), intramuscular ATP stores deplete within 2 to 4 seconds. Creatine Monohydrate rapidly donates a phosphate molecule to ADP, instantly resynthesizing ATP to prolong power output before fatigue sets in.
                </p>
              </div>
            )}

            {activeTab === 'saturation' && (
              <div className="flex flex-col gap-5 sm:gap-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs text-[#FF4D00]">MUSCLE PHOSPHOCREATINE POOL</span>
                  <span className="font-mono text-[10px] text-[#90909A]">SATURATION CURVE</span>
                </div>

                <div className="space-y-4 my-2 sm:my-4 font-mono text-xs">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between mb-1 gap-1 text-[#90909A] text-[11px] sm:text-xs">
                      <span>BASELINE (UNSUPPLEMENTED)</span>
                      <span>120 mmol/kg dry muscle</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-none overflow-hidden">
                      <div className="h-full bg-white/30" style={{ width: '60%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row justify-between mb-1 gap-1 text-white text-[11px] sm:text-xs">
                      <span className="text-[#FF4D00] font-bold">FORGE LABS MONOHYDRATE (5G DAILY)</span>
                      <span className="text-[#FF4D00] font-bold">160 mmol/kg dry muscle (+33%)</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-none overflow-hidden">
                      <div className="h-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00]" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#90909A] leading-relaxed">
                  Daily administration of 5 grams reaches maximal muscle creatine saturation within 21 to 28 days. Once saturated, maintenance of 5g daily keeps intramuscular phosphocreatine levels topped off indefinitely.
                </p>
              </div>
            )}

            {activeTab === 'hydration' && (
              <div className="flex flex-col gap-5 sm:gap-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs text-[#FF4D00]">INTRACELLULAR HYDRATION</span>
                  <span className="font-mono text-[10px] text-[#90909A]">CELLULAR VOLUMIZATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-2 sm:my-4 font-mono text-xs">
                  <div className="p-4 bg-[#141418] border border-white/10">
                    <span className="text-[#90909A] block text-[10px] sm:text-xs">WATER FLUID DISTRIBUTION</span>
                    <span className="text-white font-bold text-base sm:text-lg block mt-1">INTRACELLULAR</span>
                    <span className="text-[10px] text-[#90909A]">Inside muscle cell membrane</span>
                  </div>

                  <div className="p-4 bg-[#141418] border border-white/10">
                    <span className="text-[#90909A] block text-[10px] sm:text-xs">EXTRACELLULAR SUB-Q WATER</span>
                    <span className="text-[#FF4D00] font-bold text-base sm:text-lg block mt-1">ZERO BLOAT</span>
                    <span className="text-[10px] text-[#90909A]">Pure cellular hydration</span>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#90909A] leading-relaxed">
                  Creatine is an osmolytes—it draws water directly into muscle cells (intracellular fluid), not under the skin. This hyper-hydration signal enhances anabolic signaling and muscle cell swelling without subcutaneous puffiness.
                </p>
              </div>
            )}

            <div className="border-t border-white/10 pt-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#90909A]">
              <span>PEER-REVIEWED CLINICAL REFERENCE</span>
              <span className="text-white">ISSN STANDING PAPER // CREATINE MONOHYDRATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
