import { Contact } from "@/components/home/contact"
import { SectionHeader } from "@/components/ui/section"
import { useTranslations } from "next-intl"

export default function ContactPage() {
    const t = useTranslations('Contact')

    return (
        <main className="pt-24 min-h-screen bg-brand-offwhite">
            {/* We can reuse the Contact component from Home, but maybe wrap it differently or add a map */}
            <div className="container mx-auto px-6 lg:px-12 py-12">
                {/* Dedicated Page Header if needed, or just let the component handle it */}
                {/* <SectionHeader 
                        eyebrow={t('label')}
                        title={t('heading')}
                        description={t('description')}
                        className="mb-16"
                   /> */}

                {/* Reuse Contact Component */}
                <Contact />

                {/* Add Map Section if desired */}
                <div className="mt-20 h-[400px] w-full bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        [Google Map Placeholder: Agias Lavras 57, Athens]
                    </div>
                </div>
            </div>
        </main>
    )
}
