import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 691;

export default function Hero({ onProgressChange }) {
  const containerRef = useRef(null);
  const desktopCanvasRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const scrollIndicatorRefDesktop = useRef(null);
  const scrollIndicatorRefMobile = useRef(null);
  const imagesRef = useRef([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const [scrollProgressPercentage, setScrollProgressPercentage] = useState(0);

  // Helper to render an image onto canvas
  const renderFrameToCanvas = (canvas, img, isMobile) => {
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.offsetWidth;
    const height = canvas.parentElement.offsetHeight;

    if (width === 0 || height === 0) return;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    if (isMobile) {
      // Mobile canvas parent has exact 16:9 intrinsic aspect ratio box
      // Fill canvas 100% edge-to-edge without internal letterboxing
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      // Desktop canvas parent is full screen 100vw x 100vh
      const canvasAspect = width / height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawW = width;
        drawH = width / imgAspect;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
    ctx.restore();
  };

  const renderFrameToBothCanvases = (img) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (desktopCanvasRef.current && desktopCanvasRef.current.parentElement.offsetWidth > 0) {
      renderFrameToCanvas(desktopCanvasRef.current, img, false);
    }
    if (mobileCanvasRef.current && mobileCanvasRef.current.parentElement.offsetWidth > 0) {
      renderFrameToCanvas(mobileCanvasRef.current, img, true);
    }
  };

  // Preload frame images with instant startup & progressive background loading
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images = new Array(TOTAL_FRAMES);

    const getFrameUrl = (idx) => {
      const pad = String(idx + 1).padStart(4, '0');
      return `/hero-frames/frame_${pad}.jpg`;
    };

    // 1. Safety fallback timeout: dismiss preloader after 4s no matter what
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setIsLoaded(true);
      }
    }, 4000);

    // 2. Render initial frame 1 immediately and dismiss loader on first frame ready
    const initialImg = new Image();
    initialImg.src = getFrameUrl(0);

    const handleInitialFrameLoad = () => {
      if (isCancelled) return;
      images[0] = initialImg;
      renderFrameToBothCanvases(initialImg);
      setIsLoaded(true);
      setLoadPercent(1);
    };

    initialImg.onload = handleInitialFrameLoad;
    initialImg.onerror = (err) => {
      console.warn("First hero frame failed to load, activating fallback:", err);
      if (!isCancelled) setIsLoaded(true);
    };

    if (initialImg.complete && initialImg.naturalWidth > 0) {
      handleInitialFrameLoad();
    }

    // 3. Progressive batched frame preloader
    const BATCH_SIZE = 20;
    let currentBatch = 0;

    const loadBatch = () => {
      if (isCancelled) return;
      const start = currentBatch * BATCH_SIZE;
      const end = Math.min(TOTAL_FRAMES, start + BATCH_SIZE);
      let batchPending = end - start;

      for (let i = start; i < end; i++) {
        if (i === 0 && images[0]) {
          batchPending--;
          continue;
        }

        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          images[i] = img;
          loadedCount++;
          const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
          setLoadPercent(percent);

          batchPending--;
          if (batchPending <= 0 && end < TOTAL_FRAMES) {
            currentBatch++;
            setTimeout(loadBatch, 15);
          }
        };

        img.onerror = () => {
          if (isCancelled) return;
          loadedCount++;
          batchPending--;
          if (batchPending <= 0 && end < TOTAL_FRAMES) {
            currentBatch++;
            setTimeout(loadBatch, 15);
          }
        };

        images[i] = img;
      }
    };

    loadBatch();
    imagesRef.current = images;

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  // Canvas resize listener
  useEffect(() => {
    const handleResize = () => {
      if (imagesRef.current.length > 0) {
        const currentImg = imagesRef.current[0];
        renderFrameToBothCanvases(currentImg);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger & RAF animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetFrameIndex = 0;
    let currentFrameIndex = 0;
    let animationFrameId = null;

    const getClosestLoadedFrame = (targetIdx) => {
      const images = imagesRef.current;
      if (!images || images.length === 0) return null;
      if (images[targetIdx] && images[targetIdx].complete && images[targetIdx].naturalWidth > 0) {
        return images[targetIdx];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = targetIdx - offset;
        if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          return images[prev];
        }
        const next = targetIdx + offset;
        if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          return images[next];
        }
      }
      return images[0];
    };

    const renderLoop = () => {
      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.05) {
        currentFrameIndex += diff * 0.3;
        const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameIndex)));
        const img = getClosestLoadedFrame(frameIdx);
        if (img) {
          renderFrameToBothCanvases(img);
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=800%',
        pin: true,
        scrub: 0.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const pct = Math.round(progress * 100);
          setScrollProgressPercentage(pct);

          if (onProgressChange) {
            onProgressChange(progress);
          }

          targetFrameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

          const fadeOut = progress > 0.88 ? Math.max(0, (1 - progress) / 0.12) : 1;
          if (scrollIndicatorRefDesktop.current) {
            gsap.set(scrollIndicatorRefDesktop.current, { opacity: fadeOut });
          }
          if (scrollIndicatorRefMobile.current) {
            gsap.set(scrollIndicatorRefMobile.current, { opacity: fadeOut });
          }
        },
      });
    }, containerRef);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, [onProgressChange]);

  return (
    <section id="hero" ref={containerRef} className="hero-scroll relative w-full h-screen bg-[#050505] overflow-hidden">
      <div className="hero-sticky absolute inset-0 w-full h-full overflow-hidden">
        {/* PRELOADER OVERLAY (z-40): Shows until initial frame sequence loads */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 border-2 border-[#FF4D00] border-t-transparent rounded-full animate-spin" />
            <div className="flex flex-col items-center gap-1 font-mono text-xs text-[#90909A]">
              <span className="text-white font-bold tracking-widest">LOADING CINEMATIC FILM</span>
              <span>FORGE LABS CREATINE MONOHYDRATE</span>
              <div className="w-48 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#FF4D00] transition-all duration-300"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP HERO VIEWPORT (hidden on mobile md:block) */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <canvas
            ref={desktopCanvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-black/50 z-10 pointer-events-none" />

          {/* TOP MINIMAL BRANDING BADGE */}
          <div className="absolute top-8 left-12 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="font-mono text-xs text-[#E0E0E0] tracking-widest uppercase font-semibold">
                FORGE LABS // CINEMATIC FILM
              </span>
            </div>
          </div>

          {/* BOTTOM MINIMAL SCROLL INDICATOR OVERLAY */}
          <div
            ref={scrollIndicatorRefDesktop}
            className="absolute bottom-8 left-0 right-0 z-20 flex justify-between items-center px-12 pointer-events-none font-mono text-xs text-[#90909A]"
          >
            <div className="flex items-center gap-3 text-white">
              <span className="tracking-widest uppercase text-[#90909A] text-xs">
                SCROLL TO FORGE
              </span>
              <div className="p-2 rounded-full bg-black/40 border border-white/20 backdrop-blur-md animate-bounce">
                <ChevronDown className="w-4 h-4 text-[#FF4D00]" />
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs">
              <span>PROGRESS</span>
              <span className="text-[#FF4D00] font-bold">{scrollProgressPercentage}%</span>
            </div>
          </div>

          {/* Bottom Scroll Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
            <div
              className="h-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00] transition-all duration-75"
              style={{ width: `${scrollProgressPercentage}%` }}
            />
          </div>
        </div>

        {/* MOBILE HERO VIEWPORT (block on mobile, hidden on md) */}
        <div className="md:hidden absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 z-20">
          <div className="w-full max-w-md flex flex-col items-center gap-3">
            {/* TOP MOBILE BRANDING BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="font-mono text-[10px] text-[#E0E0E0] tracking-widest uppercase font-semibold">
                FORGE LABS // CINEMATIC FILM
              </span>
            </div>

            {/* MOBILE CINEMATIC VIDEO FRAME */}
            <div className="w-full aspect-[16/9] relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,77,0,0.25)] border border-white/15 bg-black">
              <canvas
                ref={mobileCanvasRef}
                className="w-full h-full block filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* MOBILE PROGRESS BAR & CONTROLS */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF4D00] shadow-[0_0_10px_#FF4D00] transition-all duration-75"
                  style={{ width: `${scrollProgressPercentage}%` }}
                />
              </div>

              <div
                ref={scrollIndicatorRefMobile}
                className="w-full flex justify-between items-center font-mono text-[11px] text-[#90909A]"
              >
                <div className="flex items-center gap-1.5 text-white">
                  <span className="tracking-widest uppercase text-[#90909A] text-[10px]">SCROLL TO FORGE</span>
                  <div className="p-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md animate-bounce">
                    <ChevronDown className="w-3 h-3 text-[#FF4D00]" />
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px]">
                  <span>PROGRESS</span>
                  <span className="text-[#FF4D00] font-bold">{scrollProgressPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
