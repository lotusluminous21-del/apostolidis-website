"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale } from "next-intl"
import { ProjectFilter } from "@/components/projects/project-filter"
import { ProjectCard } from "@/components/ui/project-card"
import { projectContainer, fadeUp } from "@/lib/animation-variants"
import { projects, ProjectCategory } from "@/data/projects"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ProjectsPage() {
    const t = useTranslations('Projects')
    const locale = useTranslations('Locale')
    const currentLocale = useLocale()

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedCategory = (searchParams.get('category') || 'All') as ProjectCategory | 'All'

    const handleSelectCategory = (category: ProjectCategory | 'All') => {
        // Create new search params
        const params = new URLSearchParams(searchParams.toString())

        if (category === 'All') {
            params.delete('category')
        } else {
            params.set('category', category)
        }

        // Use replace to update URL without adding to history stack (optional, push works too)
        // scroll: false keeps position if they filter, but maybe we want to scroll up on filter?
        // Usually filtering changes list size, so keeping scroll is weird. 
        // Let's let it default (scroll: true) or explicit scroll: false if we want.
        // But the user issue is "Back from detail". The URL change happens BEFORE detail visit.
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const categories: ProjectCategory[] = [
        'Commercial & Retail',
        'Residential Apartment',
        'Single-Family Home'
    ]

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory)



    return (
        <main className="pt-24 min-h-screen bg-white text-brand-black">
            <div className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
                {/* Back to Home */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-brand-black/50 hover:text-brand-black transition-colors">
                        <ArrowLeft className="w-3 h-3 mr-2" /> {currentLocale === 'el' ? 'Πίσω στην Αρχική' : 'Back to Home'}
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12 md:mb-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-8xl font-bold uppercase tracking-tighter text-brand-black mb-6 leading-[0.9]">
                            {t('heading')}
                        </h1>
                        <p className="text-lg md:text-xl text-brand-black/60 max-w-2xl font-light">
                            {t('description')}
                        </p>
                    </motion.div>
                </div>

                {/* Filter */}
                <ProjectFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                />

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/projects/${project.slug}`}>
                                    <ProjectCard
                                        code={project.code}
                                        title={currentLocale === 'el' ? (project.title_el || project.title) : project.title}
                                        type={currentLocale === 'el' ? (project.category_el || project.category) : project.category}
                                        image={project.images[0]?.src}
                                        specs={currentLocale === 'el' && project.specs_el ? project.specs_el : project.specs}
                                        status={project.status === 'Completed' ? 'COMPLETED' : 'IN_PROGRESS'}
                                        className="aspect-[4/5] w-full"
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </main>
    )
}
