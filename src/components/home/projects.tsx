"use client"

import { useRef } from "react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { ProjectCard } from "@/components/ui/project-card"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { getFeaturedProjects } from "@/data/projects"
import { SplitText } from "@/components/ui/split-text"
import { motion, useInView } from "framer-motion"
import { staggerContainer, fadeUp } from "@/lib/animation-variants"

export function Projects() {
    const t = useTranslations('Projects')
    const locale = useLocale()

    // View mode state removed as per request - always grid

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

    const projects = getFeaturedProjects().slice(0, 3).map(p => ({
        code: p.code,
        title: locale === 'el' ? (p.title_el || p.title) : p.title,
        type: locale === 'el' ? (p.category_el || p.category) : p.category,
        image: p.images[0]?.src,
        specs: (locale === 'el' && p.specs_el ? p.specs_el : p.specs).slice(0, 2), // Show only first 2 specs
        slug: p.slug
    }))

    return (
        <Section className="relative border-b border-grid-line bg-background text-brand-black overflow-hidden" id="projects">

            {/* Content Container */}
            <div ref={containerRef} className="relative z-10 w-full">

                {/* HEADER SECTION - COMPACT & CLEAN */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-16 gap-6 md:gap-8 border-b border-brand-black/10 pb-6">
                    <div className="w-full md:w-auto relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-brand-black/10 hidden lg:block" />
                        <div className="flex items-center gap-3 mb-4 lg:mb-6 pt-2 lg:pt-4">
                            <span className="text-[10px] font-mono tracking-widest text-architectural uppercase font-semibold">{t('badge')}</span>
                            <div className="h-px w-12 bg-brand-black/10" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-brand-black leading-[0.9]">
                            {isInView && (
                                <SplitText
                                    className="inline-block"
                                    delay={0.1}
                                >
                                    {t('headingPrimary')}
                                </SplitText>
                            )}
                            <br />
                            <span className="text-brand-black/20">
                                {isInView && (
                                    <SplitText
                                        className="inline-block"
                                        delay={0.2}
                                    >
                                        {t('headingSecondary')}
                                    </SplitText>
                                )}
                            </span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">

                            <div className="flex gap-3 w-full md:w-auto">
                                <Button asChild className="flex-1 md:flex-none h-9 bg-brand-black text-white hover:bg-brand-black/90 font-mono text-[10px] uppercase tracking-wider">
                                    <Link href="/projects">
                                        {t('archive')} <ArrowUpRight className="ml-2 w-3 h-3" />
                                    </Link>
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
                    className="grid gap-x-8 gap-y-8 md:gap-y-12 transition-all duration-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project, index) => (
                        <motion.div variants={fadeUp} key={project.code}>
                            <Link href={`/projects/${project.slug}`}>
                                <ProjectCard
                                    {...project}
                                    variant="default"
                                    className="aspect-[4/5] w-full"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Metadata */}
                <div className="mt-12 pt-4 border-t border-brand-black/10 flex justify-between items-center text-[10px] font-mono text-brand-black/30 uppercase tracking-widest">
                    <span>{t('status')}</span>
                    <span>{t('ref')}</span>
                </div>
            </div>
        </Section>
    )
}
