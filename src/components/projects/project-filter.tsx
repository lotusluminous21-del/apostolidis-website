"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProjectCategory } from "@/data/projects"

import { useTranslations } from "next-intl"

interface ProjectFilterProps {
    categories: ProjectCategory[]
    selectedCategory: ProjectCategory | 'All'
    onSelectCategory: (category: ProjectCategory | 'All') => void
}

export function ProjectFilter({
    categories,
    selectedCategory,
    onSelectCategory
}: ProjectFilterProps) {
    const t = useTranslations('Projects.categories')

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectCategory('All')}
                className={cn(
                    "rounded-full text-xs font-mono uppercase tracking-wider transition-all",
                    selectedCategory === 'All'
                        ? "bg-brand-black text-white hover:bg-brand-black/90 border-brand-black"
                        : "text-muted-foreground hover:text-foreground border-transparent hover:bg-black/5"
                )}
            >
                {t('All')}
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                        "rounded-full text-xs font-mono uppercase tracking-wider transition-all",
                        selectedCategory === category
                            ? "bg-brand-black text-white hover:bg-brand-black/90 border-brand-black"
                            : "text-muted-foreground hover:text-foreground border-transparent hover:bg-black/5"
                    )}
                >
                    {t(category)}
                </Button>
            ))}
        </div>
    )
}
