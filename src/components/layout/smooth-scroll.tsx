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
        // @ts-ignore
        window.lenis = lenis; // Expose for debugging if needed

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
    // Global Scroll Manager: Handle Route Changes
    useEffect(() => {
        // 1. NATIVE/MOBILE SCROLL RESET
        // Only reset if no hash is present or if hash navigation didn't work (fallback)
        if (!window.location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

        // 2. LENIS SCROLL RESET or HASH SCROLL
        // @ts-ignore
        if (window.lenis) {
            const hash = window.location.hash;
            if (hash) {
                const target = document.getElementById(hash.substring(1));
                if (target) {
                    // slight delay to allow layout to settle
                    setTimeout(() => {
                        // @ts-ignore
                        window.lenis.scrollTo(target, { immediate: true });
                    }, 100);
                    return;
                }
            }

            // Only Lenis-reset if no hash
            if (!hash) {
                // @ts-ignore
                window.lenis.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname]);

    // Handle Anchor Links with Lenis
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            // Resolve the href to a full URL to check against current location
            const url = new URL(href, window.location.href);

            // Check if it's the same page
            if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
                if (url.hash) {
                    const hash = url.hash;
                    const element = document.getElementById(hash.substring(1));
                    if (element) {
                        e.preventDefault();
                        // @ts-ignore
                        if (window.lenis) {
                            // @ts-ignore
                            window.lenis.scrollTo(element);
                        } else {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                        // Update URL hash without scroll
                        window.history.pushState(null, '', hash);
                    }
                }
            } else if (url.hash && url.pathname !== window.location.pathname) {
                // Navigating to another page with a hash (e.g. /projects -> /#about)
                // We rely on the useEffect([pathname]) below to handle the scroll after navigation
            }
        };

        // Use capture phase to ensure we handle it before Next.js if needed, 
        // though usually bubbling is fine. Let's try bubbling first but ensure robust checks.
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return <>{children}</>
}
