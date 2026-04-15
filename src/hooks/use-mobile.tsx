import * as React from "react"

const MOBILE_BREAKPOINT = 768
/** Matches Tailwind `md` (max-width: 767px) */
const MOBILE_MQL = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribeMobileChange(onStoreChange: () => void) {
    const mql = window.matchMedia(MOBILE_MQL)
    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
}

function getMobileSnapshot() {
    return window.matchMedia(MOBILE_MQL).matches
}

/** Desktop-first SSR snapshot; client updates immediately after hydration. */
function getMobileServerSnapshot() {
    return false
}

export function useIsMobile() {
    return React.useSyncExternalStore(
        subscribeMobileChange,
        getMobileSnapshot,
        getMobileServerSnapshot
    )
}
