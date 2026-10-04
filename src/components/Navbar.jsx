import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ isVisible = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out transform ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        } ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-3 h-3 rounded-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00] group-hover:scale-125 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-widest text-lg text-white group-hover:text-[#FF4D00] transition-colors duration-300">
                FORGE LABS
              </span>
              <span className="font-mono text-[9px] text-[#90909A] tracking-wider -mt-1">
                SPORTS SCIENCE
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('formula')}
              className="font-mono text-xs uppercase tracking-widest text-[#90909A] hover:text-white transition-colors duration-200"
            >
              Formula
            </button>
            <button
              onClick={() => scrollToSection('science')}
              className="font-mono text-xs uppercase tracking-widest text-[#90909A] hover:text-white transition-colors duration-200"
            >
              Science
            </button>
            <button
              onClick={() => scrollToSection('mix')}
              className="font-mono text-xs uppercase tracking-widest text-[#90909A] hover:text-white transition-colors duration-200"
            >
              The Mix
            </button>
            <button
              onClick={() => scrollToSection('product')}
              className="font-mono text-xs uppercase tracking-widest text-[#90909A] hover:text-white transition-colors duration-200"
            >
              Product
            </button>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#90909A]">
              <ShieldCheck className="w-3 h-3 text-[#FF4D00]" />
              <span>100% PURE</span>
            </div>
            <button
              onClick={() => scrollToSection('product')}
              className="group relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-mono text-xs font-semibold tracking-wider text-black bg-white rounded-none hover:bg-[#FF4D00] hover:text-white transition-all duration-300 shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-1">
                GET FORGE
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#90909A] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && isVisible && (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between px-8 py-24 md:hidden border-b border-white/10">
          <div className="flex flex-col gap-8">
            <span className="font-mono text-[10px] text-[#FF4D00] uppercase tracking-widest">
              Navigation Menu
            </span>
            <button
              onClick={() => scrollToSection('formula')}
              className="text-left font-display text-2xl font-bold text-white hover:text-[#FF4D00] transition-colors"
            >
              01 // FORMULA
            </button>
            <button
              onClick={() => scrollToSection('science')}
              className="text-left font-display text-2xl font-bold text-white hover:text-[#FF4D00] transition-colors"
            >
              02 // SCIENCE
            </button>
            <button
              onClick={() => scrollToSection('mix')}
              className="text-left font-display text-2xl font-bold text-white hover:text-[#FF4D00] transition-colors"
            >
              03 // THE MIX
            </button>
            <button
              onClick={() => scrollToSection('product')}
              className="text-left font-display text-2xl font-bold text-white hover:text-[#FF4D00] transition-colors"
            >
              04 // PRODUCT
            </button>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="flex justify-between items-center text-xs font-mono text-[#90909A]">
              <span>SPECIFICATION</span>
              <span className="text-white">5 G / SERVING</span>
            </div>
            <button
              onClick={() => scrollToSection('product')}
              className="w-full py-4 bg-[#FF4D00] text-white font-mono text-sm font-bold tracking-widest uppercase text-center"
            >
              EXPLORE PRODUCT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
