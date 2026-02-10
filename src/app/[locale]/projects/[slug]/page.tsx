import { notFound } from "next/navigation"
import { getProjectBySlug, projects } from "@/data/projects"
import { ProjectDetailHeader } from "@/components/projects/project-detail-header"
import { ProjectGallery } from "@/components/projects/project-gallery"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { ArrowLeft } from "lucide-react"
import { ScrollToTop } from "@/components/layout/scroll-to-top"

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    const backText = locale === 'el' ? 'Πίσω στα Έργα' : 'Back to Projects';
    const viewAllText = locale === 'el' ? 'Όλα τα Έργα' : 'View All Projects';

    return (
        <main className="pt-24 min-h-screen bg-white">
            <ScrollToTop />
            <div className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
                {/* Breadcrumb / Back */}
                <div className="mb-12">
                    <Link href="/projects" className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-brand-black/50 hover:text-brand-black transition-colors">
                        <ArrowLeft className="w-3 h-3 mr-2" /> {backText}
                    </Link>
                </div>

                {/* Header */}
                <ProjectDetailHeader project={project} locale={locale} />

                {/* Gallery */}
                <ProjectGallery images={project.images} />

                {/* Next Project / Navigation could go here */}
                <div className="mt-20 pt-12 border-t border-brand-black/10 flex justify-between items-center">
                    <Link href="/projects">
                        <Button variant="outline" className="font-mono text-xs uppercase tracking-widest">
                            {viewAllText}
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
