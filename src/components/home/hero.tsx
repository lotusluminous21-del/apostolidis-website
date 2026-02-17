"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, CornerDownRight, Maximize2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
// Image import removed as it is replaced by video
import { GrainOverlay } from "@/components/ui/grain-overlay"
import {
    EASE,
    HERO_TIMELINE,
    DURATION,
    fadeUp,
    fadeLeft,
    fadeIn,
    scaleX,
    scaleY,
    headlineReveal,
    curtainReveal,
    slideUp,
    withDelay,
} from "@/lib/animation-variants"
import { DraftingFrame } from "@/components/ui/drafting-frame"
import { useIsMobile } from "@/hooks/use-mobile"

export function Hero() {
    const t = useTranslations('Hero')
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
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
    }, [])

    // Video loop is handled by the loop attribute on the video element

    const isMobile = useIsMobile()

    return (
        <section ref={containerRef} className="relative min-h-[calc(100svh-60px)] md:h-[calc(100vh-60px)] w-full flex flex-col md:grid md:grid-cols-2 border-b border-grid-line overflow-hidden group">

            <GrainOverlay opacity={0.05} />

            {/* LEFT COLUMN: DATA STREAM & CONTENT */}
            <div className="relative z-10 flex flex-col border-t md:border-t-0 border-r border-grid-line bg-background/95 md:bg-background/50 md:backdrop-blur-sm md:bg-transparent transition-colors duration-700 overflow-hidden order-2 md:order-none h-[55svh] md:h-auto">

                {/* Vertical decorative line for alignment - Animated */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={withDelay(scaleY, HERO_TIMELINE.VERTICAL_LINE)}
                    className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-grid-line hidden md:block origin-top"
                />

                <div className="flex-1 flex flex-col justify-center p-4 md:p-12 lg:px-12 xl:px-20 relative">

                    {/* Context Tag - Phase 2 Start */}
                    <div className="mb-6 hidden md:flex items-center gap-3">
                        {/* Animated Line leading to tag */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: HERO_TIMELINE.DRAFT_START, duration: 0.6, ease: EASE.sharp }}
                            className="w-8 h-[1px] bg-grid-line origin-left"
                        />
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
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

                    <div className="space-y-6 md:space-y-8 mb-0 relative z-20 flex flex-col justify-center h-full md:block md:h-auto">
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
                                />
                                <motion.span
                                    initial="hidden"
                                    animate="visible"
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
                                />
                                <motion.span
                                    initial="hidden"
                                    animate="visible"
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
                                />
                                <motion.span
                                    initial="hidden"
                                    animate="visible"
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

                                {/* Extra decorative line for Legacy - Only on desktop or repositioned? Keep for now but maybe hide on mobile if it clashes */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: HERO_TIMELINE.DRAFT_START + 0.6, duration: 0.8 }}
                                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-architectural/20"
                                />
                            </div>
                        </h1>

                        {/* Strong horizontal anchor - Green line */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={withDelay(scaleX, HERO_TIMELINE.GREEN_LINE)}
                            className="w-24 h-[2px] bg-architectural origin-left hidden md:block"
                        />

                        {/* CTA Buttons */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={withDelay(fadeUp, HERO_TIMELINE.BUTTONS)}
                            className="pt-4 md:pt-2"
                        >
                            {/* Unified button box with shared border */}
                            <div className="flex flex-col sm:flex-row sm:inline-flex border border-foreground/20 w-fit sm:w-auto">
                                <Button className="h-10 md:h-14 rounded-none bg-foreground text-background hover:bg-architectural hover:text-white transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase px-6 md:px-8 border-0 w-auto justify-center">
                                    <CornerDownRight className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3" />
                                    {t('initiate')}
                                </Button>
                                {/* Hide secondary button on mobile to save space if needed, or stack? Let's hide for "shine" and focus */}
                                <Button variant="outline" className="hidden sm:flex h-12 md:h-14 rounded-none border-0 border-t sm:border-t-0 sm:border-l border-foreground/20 hover:bg-foreground/5 hover:text-architectural transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase px-6 md:px-8 bg-transparent w-full sm:w-auto justify-center">
                                    {t('explore')}
                                </Button>
                            </div>
                        </motion.div>

                        {/* Subtitle text */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
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
                    animate="visible"
                    variants={withDelay(slideUp, HERO_TIMELINE.BOTTOM_BAR)}
                    className="h-[40px] md:h-[60px] border-t border-grid-line flex items-center justify-between pl-4 md:pl-12 pr-4 md:pr-12 bg-background/80 backdrop-blur-md absolute bottom-0 w-full"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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
                        animate={{ opacity: 1 }}
                        transition={{ delay: HERO_TIMELINE.BOTTOM_BAR + 0.2, duration: 0.4 }}
                        className="flex items-center gap-4 text-[9px] md:text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                    >
                        <span className="hidden md:inline-block">Est. 1995</span>
                        <div className="w-px h-3 bg-grid-line hidden md:block" />
                        <div className="flex items-center gap-2">
                            <span>37°58'N</span>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: HERO_TIMELINE.BOTTOM_BAR + 0.4, duration: 0.3, ease: EASE.bounce }}
                                className="w-1.5 h-1.5 bg-architectural rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* RIGHT COLUMN: VISUAL FEED */}
            <div className="relative h-[45svh] md:h-auto overflow-hidden bg-background md:border-l border-grid-line group/image order-1 md:order-none">

                {/* Drafting Frame - "The Plan" before the Reality */}
                <DraftingFrame
                    className="absolute inset-0 z-25 pointer-events-none border-b border-r border-grid-line/50"
                    delay={HERO_TIMELINE.DRAFT_START}
                    showMarkers={['top-right', 'bottom-left']}
                    label="RENDER_QUEUE"
                    labelPosition="top-right"
                    animateSequentially
                />

                {/* White Background Curtain Reveal Overlay (was Green) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
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
                    style={{ y: isMobile ? 0 : y, opacity, willChange: "transform, opacity" }}
                    className="absolute inset-0"
                >
                    <video
                        ref={videoRef}
                        src="/images/hero_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center md:object-right transition-all duration-1000 ease-out"
                    />
                </motion.div>

                {/* HUD Overlay on Image - Viewport Style */}
                <div className="absolute inset-0 pointer-events-none p-4 md:p-8 flex flex-col justify-between z-30">
                    {/* Top HUD - Typewriter Effect */}
                    <div className="flex justify-between items-start">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: HERO_TIMELINE.HUD_TOP - 0.1, duration: 0.2 }}
                            className="text-white/80 font-mono text-[10px] px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 uppercase tracking-widest min-w-[110px]"
                        >
                            {hudText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-[1px] h-3 bg-white/80 ml-0.5 align-middle"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: HERO_TIMELINE.HUD_TOP + 0.3, duration: 0.3 }}
                        >
                            <Maximize2 className="w-4 h-4 text-white/50" />
                        </motion.div>
                    </div>

                    {/* Center Crosshairs - Pulse on reveal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1, 1.1] }}
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: HERO_TIMELINE.HUD_BOTTOM, duration: 0.5, ease: EASE.smooth }}
                        className="flex justify-between items-end"
                    >
                        <div className="flex gap-1">
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: HERO_TIMELINE.HUD_BOTTOM + 0.1, duration: 0.3 }}
                                className="w-1 h-3 bg-architectural origin-bottom"
                            />
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: HERO_TIMELINE.HUD_BOTTOM + 0.2, duration: 0.3 }}
                                className="w-1 h-2 bg-white/20 origin-bottom"
                            />
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
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
            </div>

        </section>
    )
}
