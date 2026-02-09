"use client";

import { useEffect, useState } from "react";

export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-overlay hidden md:block"
        style={{ opacity }}
      >
        <div className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain bg-[url('/noise.svg')] opacity-100" style={{ transform: 'translate3d(0,0,0)', willChange: "transform" }} />
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
          animation: grain 0.5s steps(10) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  );
}
