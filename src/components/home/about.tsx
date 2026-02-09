"use client"

import { Section } from "@/components/ui/section"
import { useTranslations } from "next-intl"
import { SplitText } from "@/components/ui/split-text"
import { ImageReveal } from "@/components/ui/image-reveal"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GrainOverlay } from "@/components/ui/grain-overlay"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
    EASE,
    ABOUT_TIMELINE,
    fadeUp,
    withDelay,
    markerPop,
} from "@/lib/animation-variants"


function TechnicalStat({ label, value, code, delay = 0 }: { label: string, value: string, code: string, delay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={withDelay(fadeUp, delay)}
            className="flex flex-col p-6 relative group hover:bg-neutral-50 transition-colors border-l border-brand-black/10 first:border-l-0"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-brand-black transition-colors">
                    [{code}]
                </span>
                <div className="w-1.5 h-1.5 border border-brand-black/30 bg-transparent group-hover:bg-architectural transition-colors" />
            </div>

            <span className="font-heading text-4xl font-light text-brand-black mb-1 tabular-nums tracking-tight">{value}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{label}</span>
        </motion.div>
    )
}

export function About() {
    const t = useTranslations('About')
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" })
    const [isMobile, setIsMobile] = useState(false)
    const [hasRevealed, setHasRevealed] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isInView && !hasRevealed) {
            const timer = setTimeout(() => {
                setHasRevealed(true)
            }, (ABOUT_TIMELINE.IMAGE_REVEAL + 2) * 1000) // Reveal delay + reveal duration + buffer
            return () => clearTimeout(timer)
        }
    }, [isInView, hasRevealed])

    return (
        <Section className="bg-background relative overflow-hidden border-b border-grid-line lg:py-24" id="about">
            <GrainOverlay opacity={0.03} />

            {/* Content Container - Responsive Drafting Layout */}
            <div ref={containerRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-x-16 items-start">

                {/* LEFT: PERSONNEL IMAGE - "Drafted" Container */}
                <div className="lg:col-span-5 relative mt-8 lg:mt-0 pt-4 px-2 lg:px-0 order-2 lg:order-none">
                    {/* The "Draft" Border Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: ABOUT_TIMELINE.IMAGE_BASE, ease: EASE.smooth }}
                        className="relative p-2 lg:p-3"
                    >
                        {/* 1. MAIN FRAME LINES (The "Overshoot" Box) */}
                        {/* Top Line */}
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.2, delay: ABOUT_TIMELINE.IMAGE_BASE, ease: EASE.sharp }}
                            className="absolute -top-[1px] -left-2 -right-2 lg:-left-8 lg:-right-8 h-[1px] bg-brand-black/30"
                        />
                        {/* Bottom Line */}
                        <motion.div
                            initial={{ scaleX: 0, originX: 1 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.2, delay: ABOUT_TIMELINE.IMAGE_BASE + 0.1, ease: EASE.sharp }}
                            className="absolute -bottom-[1px] -left-2 -right-2 lg:-left-8 lg:-right-8 h-[1px] bg-brand-black/30"
                        />
                        {/* Left Line */}
                        <motion.div
                            initial={{ scaleY: 0, originY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.2, delay: ABOUT_TIMELINE.IMAGE_BASE + 0.2, ease: EASE.sharp }}
                            className="absolute -top-2 -bottom-2 -left-[1px] lg:-top-8 lg:-bottom-8 w-[1px] bg-brand-black/30"
                        />
                        {/* Right Line */}
                        <motion.div
                            initial={{ scaleY: 0, originY: 1 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.2, delay: ABOUT_TIMELINE.IMAGE_BASE + 0.3, ease: EASE.sharp }}
                            className="absolute -top-2 -bottom-2 -right-[1px] lg:-top-8 lg:-bottom-8 w-[1px] bg-brand-black/30"
                        />

                        {/* 2. TECHNICAL MARKERS (Crosshairs & Corners) - Animated */}
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, ABOUT_TIMELINE.IMAGE_BASE + 0.4)}
                            className="absolute -top-1.5 -left-1.5 lg:-top-3 lg:-left-3 w-3 h-3 lg:w-6 lg:h-6 border-l border-t border-brand-black/40 z-30"
                        />
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, ABOUT_TIMELINE.IMAGE_BASE + 0.5)}
                            className="absolute -top-1.5 -right-1.5 lg:-top-3 lg:-right-3 w-3 h-3 lg:w-6 lg:h-6 border-r border-t border-brand-black/40 z-30"
                        />
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, ABOUT_TIMELINE.IMAGE_BASE + 0.6)}
                            className="absolute -bottom-1.5 -left-1.5 lg:-bottom-3 lg:-left-3 w-3 h-3 lg:w-6 lg:h-6 border-l border-b border-brand-black/40 z-30"
                        />
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, ABOUT_TIMELINE.IMAGE_BASE + 0.7)}
                            className="absolute -bottom-1.5 -right-1.5 lg:-bottom-3 lg:-right-3 w-3 h-3 lg:w-6 lg:h-6 border-r border-b border-brand-black/40 z-30"
                        />

                        {/* Crosshairs at intersections */}
                        <div className="absolute -top-[5px] -left-[5px] text-[8px] lg:text-[10px] text-brand-black/20 leading-none hidden lg:block">+</div>
                        <div className="absolute -top-[5px] -right-[5px] text-[8px] lg:text-[10px] text-brand-black/20 leading-none hidden lg:block">+</div>
                        <div className="absolute -bottom-[5px] -left-[5px] text-[8px] lg:text-[10px] text-brand-black/20 leading-none hidden lg:block">+</div>
                        <div className="absolute -bottom-[5px] -right-[5px] text-[8px] lg:text-[10px] text-brand-black/20 leading-none hidden lg:block">+</div>


                        {/* 3. MEASUREMENT SCALES */}
                        {/* Vertical Scale (Left) */}
                        <div className="absolute -left-4 lg:-left-6 top-10 bottom-10 w-2 hidden lg:flex flex-col justify-between items-end opacity-30">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <div key={i} className={`h-[1px] bg-brand-black ${i % 5 === 0 ? 'w-full' : 'w-1/2'}`} />
                            ))}
                        </div>

                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] w-full bg-background overflow-hidden border border-brand-black/10">
                            {/* Inner Technical Markers */}
                            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-brand-black/30 z-20" />
                            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-brand-black/30 z-20" />
                            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-brand-black/30 z-20" />
                            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-brand-black/30 z-20" />

                            {/* Center Crosshair */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-20 opacity-30">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-black" />
                                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brand-black" />
                            </div>

                            {/* Scanner Line */}
                            <motion.div
                                initial={{ top: "0%", opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: ABOUT_TIMELINE.IMAGE_REVEAL + 0.5 }}
                                className="absolute inset-x-0 h-full overflow-hidden pointer-events-none z-20"
                            >
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
                                    className="absolute left-0 right-0 h-[1px] bg-architectural/60 shadow-[0_0_8px_rgba(var(--architectural-rgb),0.5)]"
                                />
                            </motion.div>

                            {isInView && (
                                <ImageReveal direction="left" duration={1.2} className="w-full h-full">
                                    <motion.div
                                        initial={{ filter: "grayscale(100%) contrast(1.25)" }}
                                        animate={{
                                            filter: isMobile ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.25)",
                                            transition: {
                                                duration: 0.5,
                                                ease: EASE.smooth,
                                                delay: hasRevealed ? 0 : ABOUT_TIMELINE.IMAGE_REVEAL + 0.8
                                            }
                                        }}
                                        whileHover={!isMobile ? {
                                            filter: "grayscale(0%) contrast(1)",
                                            transition: { duration: 0.4, ease: EASE.smooth }
                                        } : {}}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src="/images/profile_2.webp"
                                            alt={`${t('heading')} - ${t('specValue')}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                        />
                                    </motion.div>
                                </ImageReveal>
                            )}
                        </div>

                        {/* Footer Data */}
                        <div className="flex justify-between items-center pt-3 mt-1 border-t border-brand-black/30 relative">
                            {/* Diagonal Hatch Marking (Bottom Right) */}
                            <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-8 h-8 lg:w-16 lg:h-16 opacity-10"
                                style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }}
                            />

                            <span className="font-mono text-[9px] text-brand-black font-semibold uppercase tracking-widest">{t('figLabel')}</span>
                            <span className="font-mono text-[9px] text-brand-black/60 uppercase tracking-widest">{t('scale')}</span>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: CONTENT - THE HARD GRID (Technical Data Sheet) */}
                {/* Note: `mt-0` ensures top alignment with image container */}
                <div className="lg:col-span-7 flex flex-col h-full pl-0 lg:pl-0 relative min-h-auto lg:min-h-[600px] mt-0 lg:mt-0 order-1 lg:order-none">

                    {/* MAIN VERTICAL SPINE - Animated */}
                    <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, delay: ABOUT_TIMELINE.GRID_BASE, ease: EASE.sharp }}
                        className="absolute left-0 top-0 bottom-0 w-[1px] bg-brand-black/20 hidden lg:block"
                    />

                    {/* Top Right Corner Bracket (Global Text Container) - Animated */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={withDelay(markerPop, ABOUT_TIMELINE.TAG_START)}
                        className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-black/20 hidden lg:block"
                    />

                    {/* SECTION 1: HEADER & ID */}
                    <div className="lg:pl-8 pb-8 border-b border-brand-black/10 relative">
                        {/* Decorative Top-Right Corner for Header - Animated */}
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, ABOUT_TIMELINE.TAG_START + 0.1)}
                            className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-black/20 hidden lg:block"
                        />

                        <div className="flex items-center gap-3 mb-6 pt-4">
                            <span className="text-[10px] font-mono tracking-widest text-architectural uppercase font-semibold">{t('badge')}</span>
                            <div className="h-px flex-1 bg-brand-black/10" />
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-bold uppercase tracking-tighter text-brand-black overflow-hidden py-2 leading-[0.85]">
                            {isInView && (
                                <SplitText
                                    className="inline-block"
                                    delay={ABOUT_TIMELINE.NAME_DECODE}
                                >
                                    {t('firstName')}
                                </SplitText>
                            )}
                            <br />
                            {isInView && (
                                <SplitText
                                    className="inline-block text-outline-black"
                                    delay={ABOUT_TIMELINE.NAME_DECODE + 0.1}
                                >
                                    {t('lastName')}
                                </SplitText>
                            )}
                        </h2>

                        {/* DATA FIELDS: Role & ID - SIMPLIFIED */}
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-8 relative">
                            {/* Subtle 'Box' marker */}
                            <div className="absolute -left-2 top-1 bottom-1 w-[1px] bg-brand-black/10 hidden lg:block" />

                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{t('roleLabel')}</span>
                                <span className="font-mono text-sm text-brand-black font-medium block">
                                    {t('roleValue')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{t('specLabel')}</span>
                                <span className="font-mono text-sm text-brand-black font-medium block">
                                    {t('specValue')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: BIO / SPECS - CLEANED & ALIGNED */}
                    <div className="lg:pl-8 py-8 border-b border-brand-black/10 relative flex-grow">
                        {/* Technical Crosshair Marker */}
                        <div className="absolute top-0 right-0 w-4 h-4 hidden lg:flex items-center justify-center opacity-30">
                            <div className="w-full h-[1px] bg-brand-black absolute" />
                            <div className="h-full w-[1px] bg-brand-black absolute" />
                        </div>

                        <div className="max-w-prose space-y-6 relative">
                            <motion.p
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={withDelay(fadeUp, ABOUT_TIMELINE.BIO_LOAD)}
                                className="text-lg leading-relaxed text-brand-black font-light text-balance"
                            >
                                {t('description1')}
                            </motion.p>
                            <motion.div
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={withDelay(fadeUp, ABOUT_TIMELINE.BIO_LOAD + 0.1)}
                                className="relative"
                            >
                                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                                    {t('description2')}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* SECTION 3: PERFORMANCE METRICS (Stats) - REMOVED BACKGROUND */}
                    <div className="grid grid-cols-2 md:grid-cols-3 border-b border-brand-black/10 relative">
                        {/* Decorative Corner for Stats Area */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-black/20" />
                        {/* Small Index Number */}
                        <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-black/20 hidden lg:block">REF.02-B</div>

                        <TechnicalStat
                            code="EXP"
                            value="15+"
                            label={t('stats.years')}
                            delay={ABOUT_TIMELINE.STATS_POP}
                        />
                        <TechnicalStat
                            code="PRJ"
                            value="50+"
                            label={t('stats.projects')}
                            delay={ABOUT_TIMELINE.STATS_POP + 0.1}
                        />
                        {/* Last item needs careful border handling if we want strict grid */}
                        <TechnicalStat
                            code="SAT"
                            value="100%"
                            label={t('stats.clients')}
                            delay={ABOUT_TIMELINE.STATS_POP + 0.2}
                        />
                    </div>

                    {/* EMPTY SPACE DECORATION (Replaces Footer) */}
                    <div className="lg:pl-8 pt-8 pb-4 relative h-24 flex items-end justify-between opacity-50">
                        {/* Subtle Horizontal Construction Line */}
                        <div className="absolute left-8 right-0 top-1/2 h-[1px] bg-brand-black/5 dashed-line hidden lg:block" />

                        {t('endSection')}

                        {/* Small Crosshair */}
                        <div className="relative w-4 h-4">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-black/40" />
                            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brand-black/40" />
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    )
}
