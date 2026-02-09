"use client"

import { useRef, useState } from "react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { ProjectCard } from "@/components/ui/project-card"
import { ArrowUpRight, Filter, List, LayoutGrid } from "lucide-react"
import { GrainOverlay } from "@/components/ui/grain-overlay"
import { SplitText } from "@/components/ui/split-text"
import { motion, useInView } from "framer-motion"
import { ABOUT_TIMELINE, staggerContainer, fadeUp } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

export function Projects() {
    const t = useTranslations('Projects')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

    const projects = [
        {
            code: "AP-001",
            title: "Διαμέρισμα Κολωνάκι",
            type: "Ανακαίνιση",
            image: "/images/palavos/01.png",
            specs: [{ label: "AREA", value: "120m²" }, { label: "YEAR", value: "2025" }]
        },
        {
            code: "AP-002",
            title: "Βίλα Μεθώνη",
            type: "Νέα Κατασκευή",
            image: "/images/palavos/05.png",
            specs: [{ label: "AREA", value: "350m²" }, { label: "YEAR", value: "2024" }]
        },
        {
            code: "AP-003",
            title: "Γραφείο Ψυχικού",
            type: "Επαγγελματικός",
            image: "/images/palavos/07.png",
            specs: [{ label: "AREA", value: "180m²" }, { label: "YEAR", value: "2025" }]
        },
        {
            code: "AP-004",
            title: "Loft Γκάζι",
            type: "Ανακαίνιση",
            image: "/images/palavos/08.png",
            specs: [{ label: "AREA", value: "110m²" }, { label: "YEAR", value: "2023" }]
        },
        {
            code: "AP-005",
            title: "Κατοικία Κηφισιά",
            type: "Ανακαίνιση",
            image: "/images/palavos/02.png",
            specs: [{ label: "AREA", value: "220m²" }, { label: "YEAR", value: "2024" }]
        },
        {
            code: "AP-006",
            title: "Showroom Αθήνα",
            type: "Επαγγελματικός",
            image: "/images/palavos/03.png",
            specs: [{ label: "AREA", value: "400m²" }, { label: "YEAR", value: "2025" }]
        }
    ]

    return (
        <Section className="relative border-b border-grid-line bg-background text-brand-black overflow-hidden py-16 lg:py-24">

            <div ref={containerRef} className="relative z-10 px-6 md:px-12 max-w-[1800px] mx-auto">

                {/* HEADER SECTION - COMPACT & CLEAN */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-brand-black/10 pb-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-1.5 h-1.5 bg-architectural rounded-full" />
                            <span className="text-architectural text-[10px] font-mono tracking-[0.2em] uppercase font-medium">
                                Validated Projects Database
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-5xl font-bold uppercase tracking-tighter text-brand-black leading-[0.9]">
                            {isInView && (
                                <SplitText
                                    className="inline-block"
                                    delay={0.1}
                                >
                                    Selected
                                </SplitText>
                            )}
                            <span className="text-brand-black/20 ml-3">
                                {isInView && (
                                    <SplitText
                                        className="inline-block"
                                        delay={0.2}
                                    >
                                        Works
                                    </SplitText>
                                )}
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-black/5 border border-brand-black/10 p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 transition-all duration-200 group",
                                        viewMode === 'grid'
                                            ? "bg-white text-brand-black shadow-sm border border-brand-black/10"
                                            : "text-brand-black/40 hover:text-brand-black hover:bg-white/50"
                                    )}
                                >
                                    <LayoutGrid className={cn(
                                        "w-3.5 h-3.5 transition-colors",
                                        viewMode === 'grid' ? "text-brand-black" : "text-brand-black/40 group-hover:text-brand-black"
                                    )} />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 transition-all duration-200 group",
                                        viewMode === 'list'
                                            ? "bg-white text-brand-black shadow-sm border border-brand-black/10"
                                            : "text-brand-black/40 hover:text-brand-black hover:bg-white/50"
                                    )}
                                >
                                    <List className={cn(
                                        "w-3.5 h-3.5 transition-colors",
                                        viewMode === 'list' ? "text-brand-black" : "text-brand-black/40 group-hover:text-brand-black"
                                    )} />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold">List</span>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="h-9 border-brand-black/20 text-brand-black hover:bg-black/5 font-mono text-[10px] uppercase tracking-wider">
                                    <Filter className="w-3 h-3 mr-2" /> Filter: All
                                </Button>
                                <Button className="h-9 bg-brand-black text-white hover:bg-brand-black/90 font-mono text-[10px] uppercase tracking-wider">
                                    View Full Archive <ArrowUpRight className="ml-2 w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PROJECTS GRID - REMOVED HEAVY BORDERS FOR CLEAN LOOK */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer(0.05, 0.2)}
                    className={cn(
                        "grid gap-x-8 gap-y-12 transition-all duration-300",
                        viewMode === 'grid'
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1"
                    )}
                >
                    {projects.map((project, index) => (
                        <motion.div variants={fadeUp} key={project.code}>
                            <ProjectCard
                                {...project}
                                variant={viewMode === 'list' ? 'horizontal' : 'default'}
                                className={cn(
                                    viewMode === 'grid' ? "aspect-[4/5] w-full" : "h-auto w-full"
                                )}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Metadata */}
                <div className="mt-12 pt-4 border-t border-brand-black/10 flex justify-between items-center text-[10px] font-mono text-brand-black/30 uppercase tracking-widest">
                    <span>// SYSTEM STATUS: ONLINE</span>
                    <span>DB_VER: 2.4.0</span>
                </div>
            </div>
        </Section>
    )
}
