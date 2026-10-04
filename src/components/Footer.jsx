import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#030303] text-[#90909A] border-t border-white/10 py-16 px-6 md:px-16 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-2">
            <span className="font-display font-extrabold text-2xl text-white tracking-widest">
              FORGE LABS
            </span>
            <span className="text-xs text-[#FF4D00] tracking-wider uppercase font-semibold">
              CREATINE MONOHYDRATE • PURE • UNFLAVOURED
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs text-white">
            <a
              href="#formula"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('formula')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FF4D00] transition-colors"
            >
              Formula
            </a>
            <a
              href="#science"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FF4D00] transition-colors"
            >
              Science
            </a>
            <a
              href="#mix"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('mix')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FF4D00] transition-colors"
            >
              The Mix
            </a>
            <a
              href="#product"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FF4D00] transition-colors"
            >
              Product
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[11px] text-[#575760]">
          <p className="max-w-xl leading-relaxed">
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before starting any supplement protocol.
          </p>

          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="text-[#90909A]">© {new Date().getFullYear()} FORGE LABS INC. ALL RIGHTS RESERVED.</span>
            <span className="text-[10px] text-[#FF4D00]">SYSTEM OPERATIONAL // BATCH 001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
