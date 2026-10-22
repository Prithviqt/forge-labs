import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_VIDEO_SRC = '/forge-creatine-transition.mp4.mp4';
const MOBILE_VIDEO_SRC = '/forge-creatine-mobile.mp4';
const MOBILE_MAX_WIDTH = 767; // Mobile viewport up to 767px; desktop is 768px and above

const checkIsMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= MOBILE_MAX_WIDTH;
  }
  return false;
};

export default function Hero({ onProgressChange }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const scrollIndicatorRefDesktop = useRef(null);
  const scrollIndicatorRefMobile = useRef(null);

  // Responsive state: strictly <= 767px is mobile, >= 768px is desktop
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [loadPercent, setLoadPercent] = useState(0);
  const [scrollProgressPercentage, setScrollProgressPercentage] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Seeking synchronization refs
  const durationRef = useRef(0);
  const isSeekingRef = useRef(false);
  const pendingTimeRef = useRef(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const seekTimeoutRef = useRef(null);

  // Track viewport breakpoint for responsive video selection
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const handleBreakpointChange = (e) => {
      setIsMobile(e.matches);
    };

    const handleResize = () => {
      const mobileNow = window.innerWidth <= MOBILE_MAX_WIDTH;
      setIsMobile(mobileNow);
      ScrollTrigger.refresh();
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleBreakpointChange);
    } else {
      mql.addListener(handleBreakpointChange);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleBreakpointChange);
      } else {
        mql.removeListener(handleBreakpointChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Ensure the active video element always has the correct source and loads it
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const expectedSrc = isMobile ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC;
    const currentSrc = video.getAttribute('src');

    if (currentSrc !== expectedSrc) {
      video.src = expectedSrc;
      video.load();
      durationRef.current = 0;
      isSeekingRef.current = false;
      pendingTimeRef.current = null;
    }
  }, [isMobile]);

  // Track reduced motion preference
  useEffect(() => {
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsLoaded(true);
      }
    };

    if (motionMql.addEventListener) {
      motionMql.addEventListener('change', handleMotionChange);
    } else {
      motionMql.addListener(handleMotionChange);
    }

    return () => {
      if (motionMql.removeEventListener) {
        motionMql.removeEventListener('change', handleMotionChange);
      } else {
        motionMql.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Robust video seeking helper to prevent seek queue saturation and ensure smooth scrubbing
  const seekTo = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video || !durationRef.current || video.readyState < 1) {
      pendingTimeRef.current = targetTime;
      return;
    }

    if (isSeekingRef.current) {
      pendingTimeRef.current = targetTime;
      return;
    }

    isSeekingRef.current = true;
    try {
      video.currentTime = targetTime;
    } catch {
      isSeekingRef.current = false;
    }

    // Safety timeout: clear seeking lock if browser misses seeked event
    clearTimeout(seekTimeoutRef.current);
    seekTimeoutRef.current = setTimeout(() => {
      if (isSeekingRef.current) {
        isSeekingRef.current = false;
        if (pendingTimeRef.current !== null) {
          const next = pendingTimeRef.current;
          pendingTimeRef.current = null;
          const v = videoRef.current;
          if (v && durationRef.current && v.readyState >= 1) {
            isSeekingRef.current = true;
            try {
              v.currentTime = next;
            } catch {
              isSeekingRef.current = false;
            }
          }
        }
      }
    }, 200);
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    clearTimeout(seekTimeoutRef.current);
    if (pendingTimeRef.current !== null) {
      const next = pendingTimeRef.current;
      pendingTimeRef.current = null;
      seekTo(next);
    }
  }, [seekTo]);

  // Video metadata and loading handlers
  const handleLoadedMetadata = useCallback((e) => {
    const video = e.currentTarget;
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      durationRef.current = video.duration;
      // Paint first frame immediately on mobile/desktop
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
      // If returning to a scrolled position after source switch, seek immediately
      if (currentProgressRef.current > 0) {
        const targetTime = Math.min(
          video.duration - 0.05,
          Math.max(0, currentProgressRef.current * video.duration)
        );
        seekTo(targetTime);
      }
    }
  }, [seekTo]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    setLoadPercent(100);
  }, []);

  const handleProgress = useCallback((e) => {
    const video = e.currentTarget;
    if (video.buffered && video.buffered.length > 0 && video.duration > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const pct = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
      setLoadPercent(pct);
    }
  }, []);

  const handleVideoError = useCallback((e) => {
    const failedSrc = isMobile ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC;
    console.error(`Hero video failed to load (${failedSrc}):`, e);
    setHasError(true);
    setErrorMessage(
      isMobile
        ? `Mobile video failed to load: ${MOBILE_VIDEO_SRC}`
        : `Desktop video failed to load: ${DESKTOP_VIDEO_SRC}`
    );
    setIsLoaded(true); // Don't trap user on preloader
  }, [isMobile]);

  // Safety fallback timeout: dismiss preloader after 4s no matter what
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP ScrollTrigger & RAF animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      if (onProgressChange) onProgressChange(1);
      return;
    }

    let animationFrameId = null;

    // RAF loop interpolates progress for ultra-smooth buttery scrubbing
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.35;
        const dur = durationRef.current;
        if (dur > 0) {
          const targetTime = Math.min(dur - 0.05, Math.max(0, currentProgressRef.current * dur));
          seekTo(targetTime);
        }
      } else if (pendingTimeRef.current === null && durationRef.current > 0) {
        currentProgressRef.current = targetProgressRef.current;
        const dur = durationRef.current;
        const targetTime = Math.min(dur - 0.05, Math.max(0, currentProgressRef.current * dur));
        seekTo(targetTime);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger pinning hero for 800vh scroll height (deliberate, slow scrubbing)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=800%', // 800vh scroll distance for ultra-cinematic playback
        pin: true,
        scrub: 0.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          targetProgressRef.current = progress;

          const pct = Math.round(progress * 100);
          setScrollProgressPercentage(pct);

          if (onProgressChange) {
            onProgressChange(progress);
          }

          // Subtle indicator fade out near end of video sequence (~88% progress)
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
      clearTimeout(seekTimeoutRef.current);
      ctx.revert();
    };
  }, [onProgressChange, prefersReducedMotion, seekTo]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`hero-scroll relative w-full w-[100vw] ${
        prefersReducedMotion ? 'min-h-[100vh] min-h-[100dvh]' : 'h-[100vh] h-[100dvh]'
      } bg-[#050505] overflow-hidden`}
    >
      <div className="hero-sticky absolute inset-0 w-full w-[100vw] h-[100vh] h-[100dvh] overflow-hidden">
        {/* PRELOADER OVERLAY (z-40): Shows until video metadata and initial frame load */}
        {!isLoaded && !prefersReducedMotion && (
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

        {/* ERROR FALLBACK OVERLAY */}
        {hasError && (
          <div className="absolute inset-0 bg-[#050505] z-30 flex flex-col items-center justify-center text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-[#FF4D00]/40 text-[#FF4D00] text-xs font-mono mb-4">
              <AlertCircle className="w-4 h-4" />
              <span>{isMobile ? 'MOBILE VIDEO ERROR' : 'DESKTOP VIDEO ERROR'}</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl tracking-tight text-white mb-2">
              FORGE LABS
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#FF4D00] max-w-md">
              {errorMessage}
            </p>
          </div>
        )}

        {/* 1. MOBILE HERO VIEWPORT (Rendered on mobile <= 767px, hidden on md) */}
        {isMobile && !hasError && (
          <div className="md:hidden absolute inset-0 w-full w-[100vw] h-full h-[100dvh] overflow-hidden">
            {/* FULLSCREEN EDGE-TO-EDGE 9:16 MOBILE VIDEO */}
            <video
              ref={videoRef}
              key="mobile-portrait-video"
              src={MOBILE_VIDEO_SRC}
              playsInline
              muted
              autoPlay={false}
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleCanPlay}
              onCanPlay={handleCanPlay}
              onProgress={handleProgress}
              onSeeked={handleSeeked}
              onError={handleVideoError}
              className="hero-video-fullscreen absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />

            {/* Subtle Vignette Gradient overlay for cinematic contrast & overlay legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-black/50 z-10 pointer-events-none" />

            {/* TOP MOBILE BRANDING BADGE (z-20) */}
            <div
              className="absolute left-4 z-20 pointer-events-none"
              style={{ top: 'max(1rem, env(safe-area-inset-top, 1rem))' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-[#E0E0E0] tracking-widest uppercase font-semibold">
                  FORGE LABS // CINEMATIC FILM
                </span>
              </div>
            </div>

            {/* BOTTOM MOBILE SCROLL INDICATOR & PROGRESS OVERLAY (z-20) */}
            <div
              ref={scrollIndicatorRefMobile}
              className="absolute left-4 right-4 z-20 flex justify-between items-center pointer-events-none font-mono text-[11px] text-[#90909A]"
              style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))' }}
            >
              <div className="flex items-center gap-1.5 text-white">
                <span className="tracking-widest uppercase text-[#90909A] text-[10px]">SCROLL TO FORGE</span>
                <div className="p-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md animate-bounce">
                  <ChevronDown className="w-3.5 h-3.5 text-[#FF4D00]" />
                </div>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px]">
                <span>PROGRESS</span>
                <span className="text-[#FF4D00] font-bold">{scrollProgressPercentage}%</span>
              </div>
            </div>

            {/* Bottom Edge Scroll Progress Bar (z-30) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
              <div
                className="h-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00] transition-all duration-75"
                style={{ width: `${scrollProgressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* 2. DESKTOP HERO VIEWPORT (Rendered on desktop >= 768px, hidden on mobile) */}
        {!isMobile && !hasError && (
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              key="desktop-cinematic-video"
              src={DESKTOP_VIDEO_SRC}
              playsInline
              muted
              autoPlay={false}
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleCanPlay}
              onCanPlay={handleCanPlay}
              onProgress={handleProgress}
              onSeeked={handleSeeked}
              onError={handleVideoError}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105"
            />
            {/* Minimal Vignette Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-black/50 z-10 pointer-events-none" />

            {/* TOP MINIMAL BRANDING BADGE (z-20) */}
            <div className="absolute top-8 left-12 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
                <span className="font-mono text-xs text-[#E0E0E0] tracking-widest uppercase font-semibold">
                  FORGE LABS // CINEMATIC FILM
                </span>
              </div>
            </div>

            {/* BOTTOM MINIMAL SCROLL INDICATOR OVERLAY (z-20) */}
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

            {/* Bottom Scroll Progress Bar (z-30) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
              <div
                className="h-full bg-[#FF4D00] shadow-[0_0_12px_#FF4D00] transition-all duration-75"
                style={{ width: `${scrollProgressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
