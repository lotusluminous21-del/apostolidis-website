"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"
import { usePathname, useSearchParams } from "next/navigation"

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Only run Lenis on desktop to save resources on mobile
    useEffect(() => {
        // Simple check for mobile user agent or screen width
        const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            // smoothTouch: false, // deprecated
            touchMultiplier: 2,
        })

        // Global Scroll Manager for Desktop (Lenis)
        // We attach the scroll reset logic to the lenis instance
        const resetScroll = () => {
            lenis.scrollTo(0, { immediate: true })
        }

        // Expose reset for the effect below if needed, or better yet, just handle it here?
        // Actually, we can just use the pathname dependency here if we want, 
        // BUT Lenis instance is created here.
        // Let's keep it simple: We need to access 'lenis' when pathname changes.

        // OPTION: We can't easily access 'lenis' from outside unless we ref it.
        // Let's put the route change listener INSIDE this effect? 
        // No, pathname changes won't re-run this effect because dependency is empty [].
        // We need to store lenis in a ref or context, OR re-structure.

        // STANDARD PATTERN:
        // window.lenis = lenis; // Expose for debugging if needed

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            // @ts-ignore
            delete window.lenis;
        }
    }, [])

    // Global Scroll Manager: Handle Route Changes
    // This effect runs on every route change
    useEffect(() => {
        // 1. NATIVE/MOBILE SCROLL RESET
        // This is crucial for mobile clients or when Lenis is disabled
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        // 2. LENIS SCROLL RESET
        // If Lenis is active (desktop), we need to tell it to reset too via the global instance we likely exposed 
        // or by finding a way to communicate. 
        // Since we didn't use a Context, let's look for the window instance or similar.
        // @ts-ignore
        if (window.lenis) {
            // @ts-ignore
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, searchParams]);

    return <>{children}</>
}
