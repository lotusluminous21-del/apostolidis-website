import { Contact } from "@/components/home/contact"
import { getSiteSettings } from "@/lib/firestore-data"

export function generateStaticParams() {
    return [
        { locale: 'el' },
        { locale: 'en' }
    ];
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const settings = await getSiteSettings();
    return (
        <main className="pt-24 min-h-screen bg-brand-offwhite">
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <Contact settings={settings} />

                {/* Map Section */}
                <div className="mt-20 h-[400px] w-full bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        [Google Map Placeholder: Agias Lavras 57, Athens]
                    </div>
                </div>
            </div>
        </main>
    )
}
