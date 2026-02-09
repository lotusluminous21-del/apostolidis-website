import { getTranslations } from "next-intl/server"
import { SectionHeader } from "@/components/ui/section"

export function generateStaticParams() {
    return [
        { locale: 'el' },
        { locale: 'en' }
    ];
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects' });

    return (
        <main className="pt-24 min-h-screen bg-brand-black">
            {/* Reusing Projects component logic but ensuring it renders full grid without "View All" button constraints if any */}
            {/* Actually, the Home Projects component has a "View All" button and limit. 
                I should probably refactor or create a dedicated grid here. 
                For now, let's create a dedicated grid reusing the ProjectItem logic if possible, 
                or just copy paste the item component to a shared place or here.
                The blueprint suggests a full grid.
             */}

            {/* Let's render the refined Projects component from home for now, as it contains the grid. 
                 But wait, the home component has "View All" button which links to /projects. 
                 It would be recursive. 
                 
                 Better approach: Extract ProjectItem to a UI component or block, then build the grid here.
             */}

            <div className="container mx-auto px-6 lg:px-12 py-12">
                <SectionHeader
                    eyebrow={t('label')}
                    title={t('heading')}
                    description={t('description')}
                    className="mb-16 text-white"
                />

                {/* Grid - Placeholder for full list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[400px]">
                    {/* I'll duplicate the items for now as "database" */}
                    {['AP-001', 'AP-002', 'AP-003', 'AP-004', 'AP-005', 'AP-006'].map((code, i) => (
                        <div key={code} className="relative group overflow-hidden bg-gray-800 row-span-1 border border-white/10">
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/20 hover:scale-105 transition-transform duration-700">
                                [Image: Project {code}]
                            </div>
                            <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="inline-block px-2 py-1 bg-architectural text-white text-xs font-bold mb-2 w-fit rounded-none">
                                    {code}
                                </span>
                                <h3 className="text-white text-xl font-bold">Project Title {i + 1}</h3>
                                <p className="text-white/70 text-sm mt-1">Renovation / Construction</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
