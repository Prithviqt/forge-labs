import React from 'react';
import { Shield, Zap, TrendingUp } from 'lucide-react';

export default function AthleteSection() {
  return (
    <section
      id="athlete"
      className="relative w-full py-32 bg-[#060607] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Dark gradient backdrop */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF4D00]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 w-full box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full min-w-0 box-border">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full max-w-full min-w-0 box-border">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.25em]">
                05 // ATHLETE PROTOCOL
              </span>
              <div className="h-px w-12 bg-[#FF4D00]/40" />
            </div>

            <h2
              className="font-display font-extrabold tracking-tight leading-[0.95] text-white uppercase w-full max-w-full min-w-0 box-border"
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 3.75rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              <span className="block text-white">FORGED</span>
              <span className="block text-[#FF4D00]">THROUGH</span>
              <span className="block text-white">WORK.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#B0B0BC] leading-relaxed max-w-xl">
              Performance is not inherited. It is exacted through repetitive exertion, precise physiological recovery, and absolute consistency.
            </p>

            {/* Performance Metric Callout Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-mono w-full min-w-0 box-border">
              <div className="p-5 sm:p-6 bg-[#0E0E10] border border-white/10 flex flex-col gap-2 min-w-0 box-border">
                <span className="text-[10px] text-[#FF4D00] uppercase tracking-wider">REPETITIVE HIGH INTENSITY</span>
                <span className="text-lg sm:text-xl font-bold text-white">SPRINT & LIFT CAPACITY</span>
                <span className="text-xs text-[#90909A]">Enhanced phosphocreatine re-synthesis rate between maximal sets.</span>
              </div>

              <div className="p-5 sm:p-6 bg-[#0E0E10] border border-white/10 flex flex-col gap-2 min-w-0 box-border">
                <span className="text-[10px] text-[#FF4D00] uppercase tracking-wider">LEAN TISSUE ACCRETION</span>
                <span className="text-lg sm:text-xl font-bold text-white">CELL HYDRATION</span>
                <span className="text-xs text-[#90909A]">Promotes muscle protein synthesis environment within skeletal muscle.</span>
              </div>
            </div>
          </div>

          {/* Right Card Visual Representation */}
          <div className="lg:col-span-5 relative w-full min-w-0 box-border">
            <div className="relative p-6 sm:p-8 md:p-10 bg-[#0a0a0c] border border-white/15 shadow-2xl flex flex-col justify-between min-h-[420px] w-full min-w-0 box-border">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/15 blur-3xl rounded-full pointer-events-none" />

              <div className="flex justify-between items-start gap-2 min-w-0">
                <span className="font-mono text-xs text-[#FF4D00] truncate">ATHLETE SPEC MATRIX</span>
                <span className="px-2.5 py-1 rounded bg-[#FF4D00]/20 text-[#FF4D00] font-mono text-[10px] uppercase font-bold shrink-0">
                  VERIFIED PROTOCOL
                </span>
              </div>

              <div className="my-6 min-w-0">
                <span className="font-mono text-xs text-[#90909A] block uppercase">DAILY DOSAGE CYCLE</span>
                <div
                  className="font-display font-extrabold text-white mt-1 tracking-tight leading-tight min-w-0 max-w-full"
                  style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  5.0 GRAMS
                </div>
                <div className="font-mono text-xs text-[#FF4D00] mt-2 font-semibold tracking-wider break-words max-w-full">
                  365 DAYS / CONTINUOUS SATURATION
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-6 min-w-0">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 min-w-0">
                  <span className="text-[#90909A] shrink-0">FORMULATION</span>
                  <span className="text-white font-semibold sm:text-right break-words min-w-0">PURE CREATINE MONOHYDRATE</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 min-w-0">
                  <span className="text-[#90909A] shrink-0">HPLC PURITY TEST</span>
                  <span className="text-[#FF4D00] font-semibold sm:text-right break-words min-w-0">99.9% CERTIFIED</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-2 min-w-0">
                  <span className="text-[#90909A] shrink-0">WADA COMPLIANCE</span>
                  <span className="text-white font-semibold sm:text-right break-words min-w-0">100% BANNED SUBSTANCE FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
