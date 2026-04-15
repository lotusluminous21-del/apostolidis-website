"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, CornerDownRight, Maximize2, Minimize2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useState, useEffect } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Link } from "@/i18n/navigation"
// Image import removed as it is replaced by video
import { GrainOverlay } from "@/components/ui/grain-overlay"
import {
    EASE,
    HERO_TIMELINE,
    DURATION,
    fadeUp,
    fadeLeft,
    scaleX,
    headlineReveal,
    slideUp,
    withDelay,
} from "@/lib/animation-variants"
import { DraftingFrame } from "@/components/ui/drafting-frame"
import { useBootComplete } from "@/contexts/boot-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

/** Hero expand/collapse: short ease-out; desktop slides left column via translateX and grows video column with left/width */
const HERO_EXPAND_DURATION = 0.28
const HERO_EXPAND_EASE = EASE.smooth

export function Hero() {
    const t = useTranslations('Hero')
    const bootComplete = useBootComplete()
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoReady, setVideoReady] = useState(false)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // Typewriter state for HUD
    const [hudText, setHudText] = useState("")
    const fullHudText = "CAM_01 [LIVE]"

    useEffect(() => {
        if (!bootComplete) return

        const startDelay = HERO_TIMELINE.HUD_TOP * 1000
        const typeDelay = 60 // ms per character

        const timeout = setTimeout(() => {
            let index = 0
            const interval = setInterval(() => {
                if (index <= fullHudText.length) {
                    setHudText(fullHudText.slice(0, index))
                    index++
                } else {
                    clearInterval(interval)
                }
            }, typeDelay)
            return () => clearInterval(interval)
        }, startDelay)

        return () => clearTimeout(timeout)
    }, [bootComplete])

    // Video loop is handled by the loop attribute on the video element

    const [isHeroVideoExpanded, setIsHeroVideoExpanded] = useState(false)

    useEffect(() => {
        if (!isHeroVideoExpanded) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsHeroVideoExpanded(false)
        }
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [isHeroVideoExpanded])

    useEffect(() => {
        if (!bootComplete) return
        const el = videoRef.current
        if (!el) return
        if (el.readyState >= 3) setVideoReady(true)
    }, [bootComplete])

    const isMobile = useIsMobile()
    const prefersReducedMotion = useReducedMotion()

    const expandTransition =
        prefersReducedMotion === true
            ? { duration: 0 }
            : { duration: HERO_EXPAND_DURATION, ease: HERO_EXPAND_EASE }

    const motionGo = bootComplete ? "visible" : "hidden"

    const videoRevealTransition =
        prefersReducedMotion === true
            ? { duration: 0 }
            : { duration: 0.65, ease: EASE.smooth }

    /** Render helpers (not nested components) so desktop can slide via transform (GPU) instead of animating flex-basis (layout thrash on collapse). */
    const renderHeroLeftColumn = () => (
        <>
            <GrainOverlay opacity={0.04} />

            <div className="relative z-10 flex-1 flex flex-col justify-center p-4 md:p-12 lg:px-12 xl:px-20">

                {/* Context Tag - Phase 2 Start */}
                <div className="mb-6 hidden md:flex items-center gap-3">
                    {/* Animated Line leading to tag */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: bootComplete ? 1 : 0 }}
                        transition={{ delay: HERO_TIMELINE.DRAFT_START, duration: 0.6, ease: EASE.sharp }}
                        className="w-8 h-[1px] bg-grid-line origin-left"
                    />
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                            bootComplete
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: HERO_TIMELINE.DRAFT_START + 0.2, duration: 0.5 }}
                        className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase"
                    >
                        {t('badge')}
                    </motion.span>
                </div>

                {/* Mobile Context Tag - Compact */}
                <div className="mb-4 flex md:hidden items-center gap-2 absolute top-4 left-4">
                    <span className="w-1 h-1 bg-architectural rounded-full" />
                    <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                        {t('badge')}
                    </span>
                </div>

                <div className="space-y-6 md:space-y-8 mb-0 relative z-20 flex flex-col justify-center h-full md:block md:h-auto md:-ml-4">
                    {/* Word-Specific Drafting Frames */}
                    <h1 className="text-[60px] md:text-7xl xl:text-8xl font-bold leading-[0.85] tracking-tighter uppercase relative flex flex-col gap-1 md:block">

                        {/* WORD 1: BUILD */}
                        <div className="relative inline-block w-fit">
                            <DraftingFrame
                                className="border-l border-t border-grid-line"
                                delay={HERO_TIMELINE.DRAFT_START}
                                showMarkers={['top-left', 'bottom-right']}
                                label="FIG.01"
                                animateSequentially
                                paused={!bootComplete}
                            />
                            <motion.span
                                initial="hidden"
                                animate={motionGo}
                                variants={withDelay(headlineReveal, HERO_TIMELINE.HEADLINE_BASE)}
                                className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 relative z-10"
                            >
                                {t('word1')}
                            </motion.span>
                        </div>

                        {/* WORD 2: FOR */}
                        {/* Indented manually to match design */}
                        <div className="relative block ml-12 md:ml-12 w-fit">
                            <DraftingFrame
                                className="border-b border-r border-grid-line/50 border-dashed"
                                delay={HERO_TIMELINE.DRAFT_START + 0.15}
                                showMarkers={['bottom-left']}
                                label="REF"
                                labelPosition="bottom-right"
                                labelClassName="hidden md:block"
                                animateSequentially
                                paused={!bootComplete}
                            />
                            <motion.span
                                initial="hidden"
                                animate={motionGo}
                                variants={withDelay(headlineReveal, HERO_TIMELINE.HEADLINE_BASE + HERO_TIMELINE.HEADLINE_STAGGER)}
                                className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 relative z-10"
                            >
                                {t('word2')}
                            </motion.span>
                        </div>

                        {/* WORD 3: LEGACY */}
                        <div className="relative inline-block w-fit group/legacy">
                            <DraftingFrame
                                className="border border-architectural/30"
                                delay={HERO_TIMELINE.DRAFT_START + 0.3}
                                showMarkers={['top-right', 'bottom-left', 'bottom-right']}
                                label="FINAL_SPEC"
                                labelPosition="top-right"
                                animateSequentially
                                paused={!bootComplete}
                            />
                            <motion.span
                                initial="hidden"
                                animate={motionGo}
                                variants={{
                                    hidden: {
                                        clipPath: "inset(100% 0 0 0)",
                                        y: 20,
                                        opacity: 0,
                                    },
                                    visible: {
                                        clipPath: "inset(0% 0 0 0)",
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: DURATION.slow,
                                            ease: EASE.smooth,
                                            delay: HERO_TIMELINE.HEADLINE_BASE + HERO_TIMELINE.HEADLINE_STAGGER * 2,
                                        },
                                    },
                                }}
                                className="block text-architectural relative z-10"
                            >
                                {t('word3')}
                                {/* Subtle glow pulse after reveal */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.4, 0] }}
                                    transition={{
                                        delay: HERO_TIMELINE.HEADLINE_BASE + HERO_TIMELINE.HEADLINE_STAGGER * 2 + 0.6,
                                        duration: 1.2,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 text-architectural blur-lg pointer-events-none"
                                    aria-hidden="true"
                                >
                                    {t('word3')}
                                </motion.span>
                            </motion.span>


                        </div>
                    </h1>

                    {/* Strong horizontal anchor - Green line */}
                    <motion.div
                        initial="hidden"
                        animate={motionGo}
                        variants={withDelay(scaleX, HERO_TIMELINE.GREEN_LINE)}
                        className="w-24 h-[2px] bg-architectural origin-left hidden md:block"
                    />

                    {/* CTA Buttons */}
                    <motion.div
                        initial="hidden"
                        animate={motionGo}
                        variants={withDelay(fadeUp, HERO_TIMELINE.BUTTONS)}
                        className="pt-4 md:pt-2"
                    >
                        {/* Unified button box with shared border */}
                        <div className="flex flex-col sm:flex-row sm:inline-flex border border-foreground/20 w-fit sm:w-auto">
                            <Button asChild className="h-10 md:h-14 rounded-none bg-foreground text-background hover:bg-architectural hover:text-white transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase px-6 md:px-8 border-0 w-auto justify-center">
                                <Link href="/projects">
                                    <CornerDownRight className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3" />
                                    {t('initiate')}
                                </Link>
                            </Button>
                            {/* Hide secondary button on mobile to save space if needed, or stack? Let's hide for "shine" and focus */}
                            <Button asChild variant="outline" className="hidden sm:flex h-12 md:h-14 rounded-none border-0 border-t sm:border-t-0 sm:border-l border-foreground/20 hover:bg-foreground/5 hover:text-architectural transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase px-6 md:px-8 bg-transparent w-full sm:w-auto justify-center">
                                <a href="#about">
                                    {t('explore')}
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Subtitle text */}
                    <motion.div
                        initial="hidden"
                        animate={motionGo}
                        variants={withDelay(fadeLeft, HERO_TIMELINE.SUBTITLE)}
                        className="max-w-sm md:max-w-md mt-4 md:mt-0"
                    >
                        <p className="font-mono text-[10px] md:text-[11px] lg:text-xs text-muted-foreground leading-relaxed tracking-wider line-clamp-3 md:line-clamp-none">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Status Bar - Phase 4 - Mobile Only version simplified */}
            <motion.div
                initial="hidden"
                animate={motionGo}
                variants={withDelay(slideUp, HERO_TIMELINE.BOTTOM_BAR)}
                className="h-[40px] md:h-[60px] border-t border-grid-line flex items-center justify-between pl-4 md:pl-12 pr-4 md:pr-12 bg-background/[0.92] absolute bottom-0 w-full"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: bootComplete ? 1 : 0 }}
                    transition={{ delay: HERO_TIMELINE.SCROLL_INDICATOR, duration: 0.4 }}
                    className="flex items-center gap-8 text-[9px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                >
                    <span className="flex items-center gap-2">
                        {t('scroll')}
                        <motion.span
                            animate={{ y: [0, 3, 0] }}
                            transition={{
                                delay: HERO_TIMELINE.SCROLL_INDICATOR + 0.3,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                            }}
                        >
                            <ArrowDown className="w-3 h-3" />
                        </motion.span>
                    </span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: bootComplete ? 1 : 0 }}
                    transition={{ delay: HERO_TIMELINE.BOTTOM_BAR + 0.2, duration: 0.4 }}
                    className="flex items-center gap-4 text-[9px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                >
                    <span className="hidden md:inline-block">Est. 2018</span>
                    <div className="w-px h-3 bg-grid-line hidden md:block" />
                    <div className="flex items-center gap-2">
                        <span>37°58'N</span>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: bootComplete ? 1 : 0 }}
                            transition={{ delay: HERO_TIMELINE.BOTTOM_BAR + 0.4, duration: 0.3, ease: EASE.bounce }}
                            className="w-1.5 h-1.5 bg-architectural rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </>
    )

    const renderHeroRightColumn = () => (
        <>
            {/* Drafting Frame - "The Plan" before the Reality */}
            <DraftingFrame
                className="absolute inset-0 z-25 pointer-events-none border-b border-r border-grid-line/50"
                delay={HERO_TIMELINE.DRAFT_START}
                showMarkers={['top-right', 'bottom-left']}
                label="RENDER_QUEUE"
                labelPosition="top-right"
                animateSequentially
                paused={!bootComplete}
            />

            {/* White Background Curtain Reveal Overlay (was Green) */}
            <motion.div
                initial="hidden"
                animate={motionGo}
                variants={{
                    hidden: { scaleY: 1 },
                    visible: {
                        scaleY: 0,
                        transition: {
                            duration: DURATION.curtain,
                            ease: EASE.smooth,
                            delay: HERO_TIMELINE.IMAGE_CURTAIN,
                        },
                    },
                }}
                className="absolute inset-0 bg-background z-20 origin-top"
            />

            <motion.div
                style={
                    isHeroVideoExpanded
                        ? { y: 0, opacity: 1 }
                        : { y: isMobile ? 0 : y, opacity, willChange: "transform, opacity" }
                }
                className="absolute inset-0"
            >
                <motion.div
                    initial={false}
                    animate={{
                        opacity: videoReady ? 1 : 0,
                    }}
                    transition={videoRevealTransition}
                    className="absolute inset-0"
                >
                    <video
                        ref={videoRef}
                        src="/images/apostolidis_hero_video_alt.mp4"
                        poster="/images/apostolidis_hero_video_alt_poster.webp"
                        preload="auto"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover object-[50%_center] md:object-[70%_center]"
                        onPlaying={() => setVideoReady(true)}
                        onError={() => setVideoReady(true)}
                        onLoadedData={() => {
                            const el = videoRef.current
                            if (el && el.readyState >= 2) setVideoReady(true)
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* HUD Overlay on Image - Viewport Style */}
            <div className="absolute inset-0 pointer-events-none p-4 md:p-8 flex flex-col justify-between z-30">
                {/* Top HUD - Typewriter Effect */}
                <div className="flex justify-between items-start">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: bootComplete ? 1 : 0 }}
                        transition={{ delay: HERO_TIMELINE.HUD_TOP - 0.1, duration: 0.2 }}
                        className="text-white/80 font-mono text-[10px] px-3 py-1 bg-black/60 border border-white/10 uppercase tracking-widest min-w-[110px]"
                    >
                        {hudText}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-[1px] h-3 bg-white/80 ml-0.5 align-middle"
                        />
                    </motion.div>
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: bootComplete ? 1 : 0 }}
                        transition={{ delay: HERO_TIMELINE.HUD_TOP + 0.3, duration: 0.3 }}
                    >
                        <button
                            type="button"
                            className="pointer-events-auto rounded p-1 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                            aria-expanded={isHeroVideoExpanded}
                            aria-label={
                                isHeroVideoExpanded ? t("collapseVideo") : t("expandVideo")
                            }
                            onClick={() => setIsHeroVideoExpanded((v) => !v)}
                        >
                            {isHeroVideoExpanded ? (
                                <Minimize2 className="w-4 h-4" aria-hidden />
                            ) : (
                                <Maximize2 className="w-4 h-4" aria-hidden />
                            )}
                        </button>
                    </motion.div>
                </div>

                {/* Center Crosshairs - Pulse on reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                        bootComplete
                            ? {
                                opacity: [0, 0.3, 0],
                                scale: [0.8, 1, 1.1],
                            }
                            : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                        delay: HERO_TIMELINE.CROSSHAIR,
                        duration: 1.5,
                        ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] border border-white/20 rounded-full flex items-center justify-center"
                >
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                </motion.div>

                {/* Persistent crosshair for hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] border border-white/5 rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-700">
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                </div>

                {/* Bottom HUD */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: bootComplete ? 1 : 0,
                        y: bootComplete ? 0 : 10,
                    }}
                    transition={{ delay: HERO_TIMELINE.HUD_BOTTOM, duration: 0.5, ease: EASE.smooth }}
                    className="flex justify-between items-end"
                >
                    <div className="flex gap-1">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: bootComplete ? 1 : 0 }}
                            transition={{ delay: HERO_TIMELINE.HUD_BOTTOM + 0.1, duration: 0.3 }}
                            className="w-1 h-3 bg-architectural origin-bottom"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: bootComplete ? 1 : 0 }}
                            transition={{ delay: HERO_TIMELINE.HUD_BOTTOM + 0.2, duration: 0.3 }}
                            className="w-1 h-2 bg-white/20 origin-bottom"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: bootComplete ? 1 : 0 }}
                            transition={{ delay: HERO_TIMELINE.HUD_BOTTOM + 0.3, duration: 0.3 }}
                            className="w-1 h-1 bg-white/10 origin-bottom"
                        />
                    </div>
                    <div className="text-white/60 font-mono text-[10px] uppercase tracking-wider">
                        {t('status')}
                    </div>
                </motion.div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-10" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 z-0 pointer-events-none" />
        </>
    )

    return (
        <section
            ref={containerRef}
            aria-busy={!bootComplete}
            className="relative flex min-h-[calc(100svh-60px)] w-full flex-col overflow-hidden border-b border-grid-line group md:h-[calc(100vh-60px)] md:flex-row"
        >

            {isMobile ? (
                <>
                    {/* LEFT COLUMN: DATA STREAM & CONTENT — grain scoped here so the hero video stays clean */}
                    <motion.div
                        key={`hero-left-${isMobile ? "sm" : "md"}`}
                        className={cn(
                            "relative z-10 order-2 flex flex-col overflow-hidden border-t bg-background/95 transition-colors duration-700 md:order-none md:min-h-0 md:h-full md:bg-background/[0.97]",
                            isHeroVideoExpanded
                                ? "pointer-events-none border-r-0 md:border-t-0"
                                : "border-r border-grid-line md:border-t-0"
                        )}
                        initial={false}
                        animate={{
                            height: isHeroVideoExpanded ? 0 : "55svh",
                            flexBasis: "auto",
                        }}
                        transition={expandTransition}
                        aria-hidden={isHeroVideoExpanded}
                    >
                        {renderHeroLeftColumn()}
                    </motion.div>

                    {/* RIGHT COLUMN: VISUAL FEED */}
                    <motion.div
                        key={`hero-video-${isMobile ? "sm" : "md"}`}
                        className={cn(
                            "group/image relative order-1 overflow-hidden bg-background md:order-none md:min-h-0 md:h-full",
                            isHeroVideoExpanded
                                ? "z-20 md:border-l-0"
                                : "md:border-l md:border-grid-line"
                        )}
                        initial={false}
                        animate={{
                            height: isHeroVideoExpanded
                                ? "calc(100svh - 60px)"
                                : "45svh",
                            flexBasis: "auto",
                        }}
                        transition={expandTransition}
                    >
                        {renderHeroRightColumn()}
                    </motion.div>
                </>
            ) : (
                <div
                    key="hero-desktop-split"
                    className="relative min-h-0 w-full min-w-0 flex-1 overflow-hidden"
                >
                    {/*
                      Left: fixed half width, slides off with transform (no width animation).
                      Right: animates left + width so the video actually grows to full viewport.
                      (Panning a 50%-wide row only revealed the right half — it did not scale.)
                    */}
                    <motion.div
                        className={cn(
                            "absolute top-0 bottom-0 left-0 z-10 flex w-1/2 flex-col overflow-hidden border-t bg-background/95 transition-colors duration-700 md:border-t-0 md:bg-background/[0.97]",
                            isHeroVideoExpanded
                                ? "pointer-events-none border-r-0"
                                : "border-r border-grid-line"
                        )}
                        initial={false}
                        animate={{ x: isHeroVideoExpanded ? "-100%" : "0%" }}
                        transition={expandTransition}
                        style={
                            prefersReducedMotion === true
                                ? undefined
                                : { willChange: "transform" }
                        }
                        aria-hidden={isHeroVideoExpanded}
                    >
                        {renderHeroLeftColumn()}
                    </motion.div>
                    <motion.div
                        className={cn(
                            "group/image absolute top-0 bottom-0 z-20 overflow-hidden bg-background",
                            isHeroVideoExpanded ? "" : "border-l border-grid-line"
                        )}
                        initial={false}
                        animate={{
                            left: isHeroVideoExpanded ? "0%" : "50%",
                            width: isHeroVideoExpanded ? "100%" : "50%",
                        }}
                        transition={expandTransition}
                        style={
                            prefersReducedMotion === true
                                ? undefined
                                : { willChange: "width, left" }
                        }
                    >
                        {renderHeroRightColumn()}
                    </motion.div>
                </div>
            )}

        </section>
    )
}
