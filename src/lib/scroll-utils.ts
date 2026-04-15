/**
 * Scroll the window to the top immediately, without relying on
 * `behavior: "instant"` (not consistently supported across older browsers / ESR).
 */
export function scrollToTopImmediate(): void {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Smooth scroll to top; uses Lenis when present (desktop), else native smooth scroll. */
export function scrollToTopSmooth(): void {
  if (typeof window === "undefined") return
  // Lenis is attached on desktop in SmoothScroll — keep in sync with anchor handling there
  // @ts-expect-error Lenis instance on window from SmoothScroll
  const lenis = window.lenis
  if (lenis) {
    lenis.scrollTo(0, { immediate: false })
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}
