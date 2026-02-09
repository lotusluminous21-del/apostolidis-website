"use client"

import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { DraftingFrame } from "@/components/ui/drafting-frame"
import {
    SERVICES_TIMELINE,
    EASE,
    DURATION,
    scaleX,
    fadeUp,
    withDelay
} from "@/lib/animation-variants"

function CapabilityRow({
    id,
    title,
    description,
    specs,
    index
}: {
    id: string,
    title: string,
    description: string,
    specs: string[],
    index: number
}) {
    const rowRef = useRef(null)
    const isInView = useInView(rowRef, { once: true, margin: "-10%" })
    const baseDelay = SERVICES_TIMELINE.ROW_LINES + (index * 0.2)

    return (
        <div
            ref={rowRef}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 py-10 px-4 md:px-6 items-start overflow-hidden hover:bg-brand-black transition-colors duration-300"
        >
            {/* Animated Top Border - Drawing Effect */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(scaleX, baseDelay)}
                className="absolute top-0 left-0 right-0 h-[1px] bg-grid-line group-hover:bg-grid-line/10 transition-colors origin-left"
            />

            {/* Hover Target Marker */}
            <div className="absolute top-4 left-0 w-1 h-0 bg-architectural group-hover:h-full transition-all duration-300 ease-out" />

            {/* COLUMN 1: ID (Span 1) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.2)}
                className="md:col-span-1"
            >
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-white/40 transition-colors tracking-widest">
                    {id}
                </span>
            </motion.div>

            {/* COLUMN 2: TITLE (Span 4) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.3)}
                className="md:col-span-4"
            >
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-white transition-colors">
                    {title}
                </h3>
            </motion.div>

            {/* COLUMN 3: CONTENT & SPECS (Span 5) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.4)}
                className="md:col-span-5 flex flex-col gap-6"
            >
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-white/70 max-w-prose transition-colors">
                    {description}
                </p>

                {/* Specs Mini-Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-transparent group-hover:border-white/10 transition-colors">
                    {specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-grid-line group-hover:bg-architectural transition-colors rounded-full" />
                            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground group-hover:text-white/60 transition-colors">
                                {spec}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* COLUMN 4: ACTION (Span 2) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.5)}
                className="md:col-span-2 flex justify-end items-start"
            >
                <Button
                    variant="ghost"
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-x-0 md:-translate-x-4 group-hover:translate-x-0 transition-all duration-300 rounded-none text-white hover:text-architectural hover:bg-white/5"
                >
                    INITIATE <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
            </motion.div>
        </div>
    )
}

export function Services() {
    const t = useTranslations('Services')
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10%" })

    return (
        <Section className="border-b border-grid-line bg-background lg:py-24" id="services">
            <div ref={containerRef} className="w-full">

                {/* Section Header - Technical Style with Draft Frame */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 relative">
                    <div className="relative">
                        <DraftingFrame
                            className="border-t border-b border-dashed border-grid-line"
                            delay={SERVICES_TIMELINE.HEADER_DRAFT}
                            showMarkers={['top-left', 'bottom-right']}
                            label="SEC.02 // CAPABILITIES"
                            labelPosition="top-left"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: SERVICES_TIMELINE.HEADER_REVEAL, duration: DURATION.normal }}
                            className="py-4 md:py-6 px-2"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                                Engineering<br />Capabilities
                            </h2>
                        </motion.div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-1 mb-4 opacity-50">
                        <span className="font-mono text-[10px] text-muted-foreground block tracking-widest">
                            SYS.STATUS: OPERATIONAL
                        </span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-architectural animate-pulse" />
                            <div className="w-1 h-1 bg-grid-line" />
                            <div className="w-1 h-1 bg-grid-line" />
                        </div>
                    </div>
                </div>

                {/* Matrix */}
                <div className="border-t border-grid-line/50">
                    <CapabilityRow
                        id="01"
                        index={0}
                        title={t('renovation.title')}
                        description={t('renovation.description')}
                        specs={[
                            "Structural Assessment",
                            "Space Optimization",
                            "MEP Integration",
                            "High-Fidelity Finishes"
                        ]}
                    />
                    <CapabilityRow
                        id="02"
                        index={1}
                        title={t('construction.title')}
                        description={t('construction.description')}
                        specs={[
                            "Site Analysis",
                            "Regulatory Compliance",
                            "Concrete Framework",
                            "Energy Efficiency A+"
                        ]}
                    />
                </div>

            </div>
        </Section>
    )
}
