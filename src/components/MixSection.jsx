import React, { useState } from 'react';
import { Droplet, Check, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

export default function MixSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [waterAmount, setWaterAmount] = useState(300); // ml

  return (
    <section
      id="mix"
      className="relative w-full py-32 bg-[#050505] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-lines opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 w-full box-border">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl w-full min-w-0 box-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.25em]">
              03 // DAILY PROTOCOL
            </span>
            <div className="h-px w-12 bg-[#FF4D00]/40" />
          </div>

          <h2
            className="font-display font-extrabold tracking-tight leading-[0.95] text-white uppercase max-w-full min-w-0 box-border"
            style={{ fontSize: 'clamp(1.85rem, 6.5vw, 4.5rem)' }}
          >
            <span className="block sm:inline">FROM </span>
            <span className="block sm:inline">POWDER</span>
            <span className="block text-[#FF4D00]">TO PROTOCOL.</span>
          </h2>

          <p className="mt-2 sm:mt-4 font-sans text-base sm:text-lg text-[#B0B0BC] leading-relaxed">
            Instantized micro-fine solubility. Designed to integrate into any fluid medium without grit, sedimentation, or cloudiness.
          </p>
        </div>

        {/* Minimal Equation Layout: 5G + WATER = READY */}
        <div className="mt-10 sm:mt-16 p-4 sm:p-8 md:p-12 bg-[#0C0C0E] border border-white/10 w-full box-border min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 items-center text-center font-mono w-full min-w-0">
            {/* Step 1: 5G */}
            <button
              onClick={() => setActiveStep(1)}
              className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 min-w-0 w-full box-border ${
                activeStep === 1
                  ? 'bg-[#151518] border-[#FF4D00] shadow-[0_0_25px_rgba(255,77,0,0.2)]'
                  : 'bg-[#08080a] border-white/10 hover:border-white/30'
              }`}
            >
              <span className="text-[10px] text-[#FF4D00] uppercase tracking-widest">STEP 01 // DOSE</span>
              <span className="font-display font-extrabold text-3xl sm:text-5xl text-white my-1">5 G</span>
              <span className="text-xs text-[#90909A]">PRECISION SCOOP</span>
            </button>

            {/* Operator + */}
            <div className="font-display text-2xl sm:text-4xl text-[#FF4D00] font-bold py-1 md:py-0">+</div>

            {/* Step 2: WATER */}
            <button
              onClick={() => setActiveStep(2)}
              className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 min-w-0 w-full box-border ${
                activeStep === 2
                  ? 'bg-[#151518] border-[#FF4D00] shadow-[0_0_25px_rgba(255,77,0,0.2)]'
                  : 'bg-[#08080a] border-white/10 hover:border-white/30'
              }`}
            >
              <span className="text-[10px] text-[#FF4D00] uppercase tracking-widest">STEP 02 // FLUID</span>
              <span className="font-display font-extrabold text-3xl sm:text-5xl text-white my-1">WATER</span>
              <span className="text-xs text-[#90909A]">{waterAmount} ML FLUID</span>
            </button>

            {/* Operator = */}
            <div className="font-display text-2xl sm:text-4xl text-[#FF4D00] font-bold py-1 md:py-0">=</div>

            {/* Step 3: READY */}
            <button
              onClick={() => setActiveStep(3)}
              className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 min-w-0 w-full box-border ${
                activeStep === 3
                  ? 'bg-[#151518] border-[#FF4D00] shadow-[0_0_25px_rgba(255,77,0,0.2)]'
                  : 'bg-[#08080a] border-white/10 hover:border-white/30'
              }`}
            >
              <span className="text-[10px] text-[#FF4D00] uppercase tracking-widest">STEP 03 // RESULT</span>
              <span className="font-display font-extrabold text-3xl sm:text-5xl text-[#FF4D00] my-1">READY</span>
              <span className="text-xs text-[#90909A]">INSTANT DISSOLUTION</span>
            </button>
          </div>

          {/* Interactive Visual Preview Panel */}
          <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-[#070708] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 min-w-0 w-full box-border">
            <div className="flex flex-col gap-3 max-w-md w-full min-w-0">
              <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-wider">
                PROTOCOL DETAILED BREAKDOWN
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {activeStep === 1 && "Precision 5 Gram Daily Serving"}
                {activeStep === 2 && `Dissolve in ${waterAmount}ml Liquid Base`}
                {activeStep === 3 && "Rapid Intracellular Saturation Ready"}
              </h3>
              <p className="font-sans text-sm text-[#90909A] leading-relaxed">
                {activeStep === 1 && "Measure one level scoop (5g) of FORGE LABS Pure Unflavoured Creatine Monohydrate. No loading phase required."}
                {activeStep === 2 && "Combine with water, fruit juice, or your post-workout protein shake. Stir or shake for 10 to 15 seconds."}
                {activeStep === 3 && "100% micro-instantized particles dissolve cleanly. Drink immediately for efficient gastrointestinal absorption."}
              </p>
            </div>

            {/* Interactive Dissolution Simulator Bar */}
            <div className="w-full md:w-80 p-5 sm:p-6 bg-[#111114] border border-white/10 flex flex-col gap-4 font-mono text-xs box-border min-w-0">
              <div className="flex justify-between items-center text-[#90909A]">
                <span>SOLUBILITY METRIC</span>
                <span className="text-[#FF4D00] font-bold">99.9% DISSOLVED</span>
              </div>

              {/* Animated Dissolution Progress */}
              <div className="w-full h-4 bg-white/10 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-white via-[#FF7733] to-[#FF4D00] transition-all duration-700 shadow-[0_0_15px_#FF4D00]"
                  style={{
                    width: activeStep === 1 ? '33%' : activeStep === 2 ? '66%' : '100%',
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#90909A] border-t border-white/5 pt-3">
                <span>RECOVERY RATE</span>
                <span className="text-white">OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
