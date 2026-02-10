"use client";

/**
 * Centralized Animation Configuration
 * Provides shared easing curves, timeline constants, and reusable variants
 * for orchestrated entrance animations across the site.
 */

// ============================================================================
// EASING CURVES
// ============================================================================
export const EASE = {
    /** Smooth, professional reveal - primary curve for most elements */
    smooth: [0.16, 1, 0.3, 1] as const,
    /** Subtle bounce for emphasis moments */
    bounce: [0.34, 1.56, 0.64, 1] as const,
    /** Sharp, technical feel for geometric elements */
    sharp: [0.4, 0, 0.2, 1] as const,
    /** Quick snap for HUD elements */
    snap: [0.87, 0, 0.13, 1] as const,
    /** Mechanical precision for "locking" elements into place */
    mechanicalSnap: [0.2, 0, 0, 1] as const,
};

// ============================================================================
// HERO TIMELINE CONSTANTS (seconds)
// ============================================================================
export const HERO_TIMELINE = {
    // Phase 1: Frame Establishment
    FRAME_START: 0,
    SIDEBAR_INDICATOR: 0,
    HEADER_BASE: 0.2,
    HEADER_STAGGER: 0.08,
    VERTICAL_LINE: 0.4,

    // Phase 1b: Drafting (New)
    DRAFT_START: 0.2,
    DRAFT_LINES: 0.3,
    MARKERS: 0.4,

    // Phase 2: Content Materialization
    CONTENT_START: 0.8,
    CONTEXT_TAG: 0.8,
    HEADLINE_BASE: 1.0,
    HEADLINE_STAGGER: 0.15, // Tightened up for impact
    GREEN_LINE: 1.8,
    BUTTONS: 2.0,
    SUBTITLE: 2.2,

    // Phase 3: Visual Focal
    VISUAL_START: 1.4,
    IMAGE_CURTAIN: 1.4,
    HUD_TOP: 1.8,
    HUD_BOTTOM: 2.2,
    CROSSHAIR: 2.4,

    // Phase 4: Grounding
    GROUNDING_START: 2.4,
    BOTTOM_BAR: 2.4,
    SCROLL_INDICATOR: 2.8,
    CORNER_MARKERS: 3.0,
};

// ============================================================================
// ABOUT TIMELINE CONSTANTS (seconds)
// ============================================================================
export const ABOUT_TIMELINE = {
    // Phase 1: Context & Grid
    GRID_BASE: 0.1,
    TAG_START: 0.2,

    // Phase 2: Identification (Image & Line)
    IMAGE_BASE: 0.3,
    LINE_DROP: 0.4,
    IMAGE_REVEAL: 0.6,

    // Phase 3: Subject Details
    NAME_DECODE: 0.8,
    ROLE_SLIDE: 1.0,
    BIO_LOAD: 1.2,

    // Phase 4: Verification (Stats & Stamp)
    STATS_POP: 1.5,
    STAMP_SEAL: 2.0,
};

// ============================================================================
// SERVICES TIMELINE CONSTANTS (seconds)
// ============================================================================
export const SERVICES_TIMELINE = {
    HEADER_DRAFT: 0.2,
    HEADER_REVEAL: 0.6,
    ROW_LINES: 0.8,
    ROW_CONTENT: 1.2,
};

// ============================================================================
// ANIMATION DURATIONS (seconds)
// ============================================================================
export const DURATION = {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
    reveal: 0.6,
    curtain: 0.8,
    typewriter: 0.8,
};

// ============================================================================
// REUSABLE VARIANTS
// ============================================================================

/** Fade up from below - standard content reveal */
export const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.normal, ease: EASE.smooth },
    },
};

/** Fade in from left - context/subtitle elements */
export const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: DURATION.normal, ease: EASE.smooth },
    },
};

/** Simple opacity fade */
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: DURATION.fast, ease: EASE.smooth },
    },
};

/** Scale from left origin - for lines */
export const scaleX = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: DURATION.reveal, ease: EASE.sharp },
    },
};

/** Scale from top origin - for vertical lines */
export const scaleY = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: DURATION.reveal, ease: EASE.smooth },
    },
};

/** Slide up from bottom - for bottom bar */
export const slideUp = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: { duration: DURATION.normal, ease: EASE.smooth },
    },
};

/** Curtain reveal - overlay that scales away */
export const curtainReveal = {
    hidden: { scaleY: 1, originY: 0 },
    visible: {
        scaleY: 0,
        transition: { duration: DURATION.curtain, ease: EASE.smooth },
    },
};

/** Headline mask reveal - clips from bottom */
export const headlineReveal = {
    hidden: {
        clipPath: "inset(100% 0 0 0)",
        y: 20,
        opacity: 0,
    },
    visible: {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        opacity: 1,
        transition: { duration: DURATION.slow, ease: EASE.smooth },
    },
};

/** Container variant for staggered children */
export const staggerContainer = (staggerTime: number = 0.1, delayChildren: number = 0) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerTime,
            delayChildren,
        },
    },
});

/** Create a variant with custom delay */
export const withDelay = <T extends { visible: { transition?: object } }>(
    variant: T,
    delay: number
): T => ({
    ...variant,
    visible: {
        ...variant.visible,
        transition: {
            ...(variant.visible.transition || {}),
            delay,
        },
    },
});

// ============================================================================
// DRAFTING ANIMATION VARIANTS (for "Draft to Reality" narrative)
// ============================================================================

/** Horizontal line draw - for borders animating left-to-right */
export const drawHorizontal = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: DURATION.reveal, ease: EASE.sharp },
    },
};

/** Vertical line draw - for borders animating top-to-bottom */
export const drawVertical = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: DURATION.reveal, ease: EASE.sharp },
    },
};

/** Marker pop - for corner brackets snapping into place */
export const markerPop = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.fast, ease: EASE.mechanicalSnap },
    },
};

/** Image reveal with grayscale-to-color transition */
export const imageReality = {
    hidden: {
        filter: "grayscale(100%) contrast(1.2)",
        opacity: 0.8
    },
    visible: {
        filter: "grayscale(0%) contrast(1)",
        opacity: 1,
        transition: { duration: 1.2, ease: EASE.smooth, delay: 0.3 },
    },
};

/** Container specific for project grid staggering */
export const projectContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};
