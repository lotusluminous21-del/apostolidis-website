"use client";

import { useEffect, useState, useRef } from "react";

export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause grain animation during scroll for massive compositing savings
  useEffect(() => {
    if (!mounted) return;

    const grainEl = containerRef.current?.querySelector('.animate-grain') as HTMLElement | null;
    if (!grainEl) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      // Pause animation during scroll
      grainEl.style.animationPlayState = 'paused';

      // Resume after scroll stops (150ms debounce)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        grainEl.style.animationPlayState = 'running';
      }, 150);
    };

    // Listen to both native scroll and Lenis scroll
    window.addEventListener('scroll', onScroll, { passive: true });

    // Also hook into Lenis if available
    // @ts-ignore
    const lenis = window.lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
    }

    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', onScroll);
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.off('scroll', onScroll);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-overlay hidden md:block"
        style={{ opacity }}
      >
        <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-grain opacity-100" style={{ transform: 'translate3d(0,0,0)' }} />
      </div>
      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate3d(0, 0, 0); }
          10% { transform: translate3d(-5%, -10%, 0); }
          20% { transform: translate3d(-15%, 5%, 0); }
          30% { transform: translate3d(7%, -25%, 0); }
          40% { transform: translate3d(-5%, 25%, 0); }
          50% { transform: translate3d(-15%, 10%, 0); }
          60% { transform: translate3d(15%, 0%, 0); }
          70% { transform: translate3d(0%, 15%, 0); }
          80% { transform: translate3d(3%, 35%, 0); }
          90% { transform: translate3d(-10%, 10%, 0); }
        }
        .animate-grain {
          animation: grain 0.8s steps(10) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  );
}
