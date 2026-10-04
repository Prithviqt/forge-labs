import React, { useEffect, useRef } from 'react';

export default function EnergySection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle thermal ember particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      maxOpacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 77, 0, ${p.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF4D00';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="energy"
      className="relative w-full py-40 bg-[#040404] text-[#E0E0E0] border-t border-white/10 overflow-hidden"
    >
      {/* Subtle particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      />

      {/* Restrained Thermal Glow Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF4D00]/15 to-transparent blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 flex flex-col items-center text-center w-full box-border min-w-0">
        <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-[0.3em] font-semibold mb-4">
          04 // INTENSIVE DISCIPLINE
        </span>

        <h2
          className="font-display font-black tracking-tighter leading-none text-white uppercase drop-shadow-2xl max-w-full min-w-0 box-border"
          style={{ fontSize: 'clamp(2rem, 7.5vw, 5.5rem)' }}
        >
          <span className="block sm:inline">BUILT </span>
          <span className="block sm:inline">UNDER </span>
          <span className="block orange-gradient-text">PRESSURE.</span>
        </h2>

        <p className="mt-6 sm:mt-8 max-w-2xl font-sans text-base sm:text-lg md:text-xl text-[#B0B0BC] leading-relaxed font-light">
          High-intensity muscular exertion requires uncompromised cellular fueling. FORGE LABS Creatine Monohydrate provides the raw bioenergetic foundation to sustain peak workload capacity when fatigue demands surrender.
        </p>

        {/* Technical Callout Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-b border-white/10 py-10 font-mono">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-display">+15%</span>
            <span className="text-xs text-[#90909A] uppercase tracking-wider">MAX POWER OUTPUT</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-[#FF4D00] font-display">-25%</span>
            <span className="text-xs text-[#90909A] uppercase tracking-wider">RECOVERY LATENCY</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-display">100%</span>
            <span className="text-xs text-[#90909A] uppercase tracking-wider">MICRONIZED PURITY</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-[#FF4D00] font-display">0.0G</span>
            <span className="text-xs text-[#90909A] uppercase tracking-wider">ADDED FILLERS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
