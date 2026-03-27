"use client"

import { Section } from "@/components/ui/section"
import { useTranslations, useLocale } from "next-intl"
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

export function About({ settings }: { settings?: any }) {
    const t = useTranslations('About')
    const locale = useLocale()
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

                {/* CONTENT - THE HARD GRID (Technical Data Sheet) */}
                <div className="w-full lg:col-span-12 flex flex-col h-full pl-0 lg:pl-0 relative min-h-auto lg:min-h-[600px] mt-0 lg:mt-0">

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
                                className="text-lg leading-relaxed text-brand-black font-light text-balance whitespace-pre-line"
                            >
                                {locale === 'el' ? settings?.about?.description1_el || t('description1') : settings?.about?.description1_en || t('description1')}
                            </motion.p>
                            <motion.div
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={withDelay(fadeUp, ABOUT_TIMELINE.BIO_LOAD + 0.1)}
                                className="relative"
                            >
                                <p className="text-sm leading-relaxed text-muted-foreground font-light whitespace-pre-line">
                                    {locale === 'el' ? settings?.about?.description2_el || t('description2') : settings?.about?.description2_en || t('description2')}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* SECTION 3: PERFORMANCE METRICS (Stats) - REMOVED BACKGROUND */}
                    <div className="grid grid-cols-2 md:grid-cols-2 border-b border-brand-black/10 relative">
                        {/* Decorative Corner for Stats Area */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-black/20" />
                        {/* Small Index Number */}
                        <div className="absolute top-2 right-2 text-[8px] font-mono text-brand-black/20 hidden lg:block">REF.02-B</div>

                        <TechnicalStat
                            code="EXP"
                            value={settings?.about?.statsYears || "10+"}
                            label={t('stats.years')}
                            delay={ABOUT_TIMELINE.STATS_POP}
                        />
                        <TechnicalStat
                            code="PRJ"
                            value={settings?.about?.statsProjects || "50+"}
                            label={t('stats.projects')}
                            delay={ABOUT_TIMELINE.STATS_POP + 0.1}
                        />
                    </div>

                    {/* SECTION 4: INITIATION OUTLOOK (The "Pitch") */}
                    <motion.div variants={fadeUp} className="group relative pt-8 pb-4 border-b border-brand-black/0">
                        {/* Connecting Line (Top) */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-black/10 origin-left transition-transform duration-700 ease-out" style={{ transform: isInView ? 'scaleX(1)' : 'scaleX(0)' }} />

                        <div className="flex flex-col items-center justify-center text-center gap-6 mt-4">
                            <div className="max-w-xl">
                                <h4 className="flex items-center justify-center gap-2 text-[9px] font-mono tracking-widest text-brand-black/40 uppercase mb-4">
                                    <span className="w-1.5 h-1.5 bg-architectural/20 rounded-sm inline-block" />
                                    {t('approachLabel', { defaultMessage: 'The Details' })}
                                </h4>
                                <p className="text-brand-black/60 text-sm font-light leading-relaxed whitespace-pre-line">
                                    {locale === 'el' ? settings?.about?.description3_el || t('description3') : settings?.about?.description3_en || t('description3')}
                                </p>
                            </div>
                        </div>
                    </motion.div>

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
