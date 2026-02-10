"use client"

import { Project } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ProjectDetailHeaderProps {
    project: Project
    locale: string
}

export function ProjectDetailHeader({ project, locale }: ProjectDetailHeaderProps) {
    const isGreek = locale === 'el';

    const title = isGreek ? (project.title_el || project.title) : project.title;
    const category = isGreek ? (project.category_el || project.category) : project.category;
    const fullDescription = isGreek ? (project.fullDescription_el || project.fullDescription) : project.fullDescription;
    const scopeOfWork = isGreek ? (project.scopeOfWork_el || project.scopeOfWork) : project.scopeOfWork;
    const specs = isGreek ? (project.specs_el || project.specs) : project.specs;

    const yearSpec = specs.find(s => s.label.toLowerCase().includes(isGreek ? 'έτος' : 'year'))?.value || (isGreek ? '2024-2025' : '2024-2025');
    const areaSpec = specs.find(s => s.label.toLowerCase().includes(isGreek ? 'εμβαδόν' : 'area'))?.value;

    return (
        <div className="max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-6"
            >
                <Badge variant="outline" className="rounded-full font-mono uppercase tracking-wider text-[10px] px-3 py-1 border-brand-black/20">
                    {category}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {project.location} • {yearSpec}
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-brand-black mb-8 leading-[0.9]"
            >
                {title}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-brand-black/10 pt-8"
            >
                <div className="md:w-2/3">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4">
                        {isGreek ? 'ΤΟ ΕΡΓΟ' : 'THE CHALLENGE'}
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-brand-black/80 font-light">
                        {fullDescription}
                    </p>
                </div>

                <div className="md:w-1/3 flex flex-col gap-6">
                    {areaSpec && (
                        <div>
                            <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                                {isGreek ? 'ΕΜΒΑΔΟΝ' : 'AREA'}
                            </h3>
                            <p className="text-xl font-medium">{areaSpec}</p>
                        </div>
                    )}

                    <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                            {isGreek ? 'ΚΑΤΑΣΤΑΣΗ' : 'STATUS'}
                        </h3>
                        <p className="text-xl font-medium">{project.status}</p>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                            {isGreek ? 'ΕΡΓΑΣΙΕΣ' : 'SCOPE'}
                        </h3>
                        <ul className="text-sm space-y-1 text-brand-black/70">
                            {scopeOfWork.slice(0, 5).map((item, i) => (
                                <li key={i}>• {item}</li>
                            ))}
                            {scopeOfWork.length > 5 && (
                                <li className="text-[10px] mt-1 italic">
                                    + {scopeOfWork.length - 5} {isGreek ? 'ακόμα' : 'more items'}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
