import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// Mock Data Source - In a real app this would be a CMS or database
const PROJECTS = {
    'ap-001': {
        title: 'Διαμέρισμα Κολωνάκι',
        category: 'Ανακαίνιση κατοικίας',
        year: '2025',
        area: '120 m²',
        location: 'Κολωνάκι, Αθήνα',
        description: 'Complete renovation of a classic apartment in Kolonaki. The design focuses on preserving the original architectural elements while introducing modern functionality and aesthetics.',
        gallery: ['/projects/001/1.jpg', '/projects/001/2.jpg', '/projects/001/3.jpg']
    },
    'ap-002': {
        title: 'Βίλα Μεθώνη',
        category: 'Νέα Κατασκευή',
        year: '2024',
        area: '250 m²',
        location: 'Μεθώνη, Μεσσηνία',
        description: 'New construction of a summer vacation villa. The design integrates the building into the landscape, using local stone and modern lines.',
        gallery: ['/projects/002/1.jpg']
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params
    const t = await import(`../../../../../messages/${locale}.json`) // Basic way to get messages server-side if needed, or just use useTranslations on client components or NextIntlClientProvider

    // Mock Fetch
    const project = PROJECTS[slug as keyof typeof PROJECTS]

    if (!project) {
        // In a real app we would call notFound()
        // return notFound()

        // For prototype, return a generic placeholder project
    }

    const displayProject = project || {
        title: 'Project Title',
        category: 'Category',
        year: '202X',
        area: '100 m²',
        location: 'Athens',
        description: 'This is a placeholder description for a project that lacks specific data in this prototype.',
        gallery: [1, 2, 3, 4]
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[60vh] lg:h-[70vh] w-full bg-gray-900">
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    [Hero Image: {displayProject.title}]
                </div>

                <div className="absolute top-24 left-6 lg:left-12 z-20">
                    <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Projects
                    </Link>
                </div>
            </div>

            <Section className="py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        {/* Sidebar / Meta */}
                        <div className="lg:col-span-4 space-y-8">
                            <div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-brand-black mb-4">{displayProject.title}</h1>
                                <p className="text-architectural font-medium tracking-wide uppercase text-sm">{displayProject.category}</p>
                            </div>

                            <div className="h-px bg-brand-silver w-full" />

                            <div className="grid grid-cols-2 gap-6 text-sm">
                                <div>
                                    <span className="block text-brand-gray mb-1">Location</span>
                                    <span className="font-medium text-brand-black">{displayProject.location}</span>
                                </div>
                                <div>
                                    <span className="block text-brand-gray mb-1">Year</span>
                                    <span className="font-medium text-brand-black">{displayProject.year}</span>
                                </div>
                                <div>
                                    <span className="block text-brand-gray mb-1">Area</span>
                                    <span className="font-medium text-brand-black">{displayProject.area}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="prose prose-lg text-brand-gray max-w-none">
                                <p>{displayProject.description}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                                {displayProject.gallery.map((img, i) => (
                                    <div key={i} className={`relative aspect-[4/3] bg-gray-100 ${i % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : ''}`}>
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            [Gallery Image {i + 1}]
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Next Project Navigation (Mock) */}
            <Section dark className="py-20">
                <div className="container mx-auto text-center">
                    <span className="text-white/50 text-sm tracking-widest uppercase mb-4 block">NEXT PROJECT</span>
                    <h3 className="text-3xl lg:text-5xl font-bold text-white mb-8 hover:text-architectural transition-colors cursor-pointer">
                        Next Project Title
                    </h3>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        View Project
                    </Button>
                </div>
            </Section>
        </main>
    )
}
