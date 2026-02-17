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
    withDelay,
    markerPop
} from "@/lib/animation-variants"
import { useIsMobile } from "@/hooks/use-mobile"

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
    const t = useTranslations('Services')
    const isInView = useInView(rowRef, { once: true, margin: "-10%" })

    // Mobile Hover Logic
    const isMobile = useIsMobile()
    // Detect when the element is in the center of the viewport (vertical middle 10%)
    const isCenterVisible = useInView(rowRef, { margin: "-45% 0px -45% 0px" })
    const isActive = isMobile && isCenterVisible

    // Reduced base delay for snappier entrance
    const baseDelay = SERVICES_TIMELINE.ROW_LINES + (index * 0.1)

    const handleInitiate = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            ref={rowRef}
            data-mobile-active={isActive}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-6 py-4 md:py-10 px-3 md:px-6 items-start overflow-hidden hover:bg-brand-black transition-colors duration-300 border-b border-grid-line/50 md:border-b-0 last:border-b-0 data-[mobile-active=true]:bg-brand-black"
        >
            {/* Animated Top Border - Drawing Effect (Desktop Only) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(scaleX, baseDelay)}
                className="absolute top-0 left-0 right-0 h-[1px] bg-grid-line group-hover:bg-grid-line/10 transition-colors origin-left hidden md:block"
            />

            {/* Hover Target Marker */}
            <div className="absolute top-4 left-0 w-1 h-0 bg-architectural group-hover:h-full transition-all duration-300 ease-out group-data-[mobile-active=true]:h-full" />

            {/* ABSOLUTE ID: Moved from column 1 to absolute top-right for better alignment */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.1)}
                className="absolute top-3 right-3 md:top-6 md:right-6"
            >
                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-white/40 transition-colors tracking-widest group-data-[mobile-active=true]:text-white/40">
                    {id}
                </span>
            </motion.div>

            {/* COLUMN 1: TITLE (Span 5 - expanded to start flush left) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.15)} // Reduced stagger
                className="md:col-span-5"
            >
                <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-white transition-colors group-data-[mobile-active=true]:text-white pr-8">
                    {title}
                </h3>
            </motion.div>

            {/* COLUMN 2: CONTENT & SPECS (Span 5) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.2)} // Reduced stagger
                className="md:col-span-5 flex flex-col gap-4 md:gap-6"
            >
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-white/70 max-w-prose transition-colors group-data-[mobile-active=true]:text-white/70 hidden md:block">
                    {description}
                </p>

                {/* Specs Mini-Grid (Hidden on mobile for compactness if really needed, but keeping for now per request "compact") 
                    Actually, let's keep specs but maybe tighter or ensure they don't take too much space.
                    The user didn't say remove them.
                */}
                {/* Specs Mini-Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-transparent group-hover:border-white/10 transition-colors group-data-[mobile-active=true]:border-white/10 opacity-0 h-0 overflow-hidden group-data-[mobile-active=true]:opacity-100 group-data-[mobile-active=true]:h-auto group-data-[mobile-active=true]:py-2 duration-300 md:opacity-100 md:h-auto md:py-2">
                    {specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-grid-line group-hover:bg-architectural transition-colors rounded-full group-data-[mobile-active=true]:bg-architectural" />
                            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground group-hover:text-white/60 transition-colors group-data-[mobile-active=true]:text-white/60">
                                {spec}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* COLUMN 3: ACTION (Span 2) */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={withDelay(fadeUp, baseDelay + 0.25)} // Reduced stagger
                className="md:col-span-2 flex justify-start md:justify-end items-start mt-2 md:mt-0"
            >
                <Button
                    variant="ghost"
                    onClick={handleInitiate}
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 translate-x-0 md:-translate-x-4 group-hover:translate-x-0 transition-all duration-300 rounded-none text-architectural md:text-white group-data-[mobile-active=true]:text-white hover:text-architectural hover:bg-white/5 pl-0 md:pl-4 h-auto py-0 text-xs tracking-wider"
                >
                    {t('initiate')} <ArrowUpRight className="ml-1 w-3 h-3" />
                </Button>
            </motion.div>
        </div>
    )
}

export function Services() {
    const t = useTranslations('Services')
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10%" })

    // Get the list of service keys
    const serviceKeys = t.raw('items') as string[]

    return (
        <Section className="border-b border-grid-line bg-background py-12 lg:py-24" id="services">
            <div ref={containerRef} className="w-full">

                {/* Section Header - Technical Style with Draft Frame */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 relative">
                    <div className="relative w-full md:w-auto">
                        <DraftingFrame
                            className="border-t border-b border-dashed border-grid-line inset-x-0"
                            delay={SERVICES_TIMELINE.HEADER_DRAFT}
                            showMarkers={['top-left', 'bottom-right']}
                            label={t('badge')}
                            labelPosition="top-left"
                            animateSequentially
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: SERVICES_TIMELINE.HEADER_REVEAL, duration: DURATION.normal }}
                            className="py-6 px-2 md:py-6"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] md:leading-none">
                                {t('heading1')}<br />{t('heading2')}
                            </h2>
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={withDelay(fadeUp, SERVICES_TIMELINE.HEADER_REVEAL + 0.2)}
                        className="hidden md:flex flex-col items-end gap-1 mb-4 opacity-50"
                    >
                        <span className="font-mono text-[10px] text-muted-foreground block tracking-widest">
                            {t('status')}
                        </span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-architectural animate-pulse" />
                            <div className="w-1 h-1 bg-grid-line" />
                            <div className="w-1 h-1 bg-grid-line" />
                        </div>
                    </motion.div>
                </div>

                {/* List of Services */}
                <div className="border-t border-grid-line/50">
                    {serviceKeys.map((key: string, index: number) => (
                        <CapabilityRow
                            key={key}
                            id={`0${index + 1}`}
                            index={index}
                            title={t(`list.${key}`)}
                            description=""
                            specs={[]}
                        />
                    ))}
                </div>

            </div>
        </Section>
    )
}
