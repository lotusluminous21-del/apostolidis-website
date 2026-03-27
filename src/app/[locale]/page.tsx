import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Services } from "@/components/home/services"
import { Projects } from "@/components/home/projects"
import { Contact } from "@/components/home/contact"
import { getSiteSettings } from "@/lib/firestore-data"

// ISR safety-net: revalidate every hour even without on-demand trigger
export const revalidate = 3600;

export function generateStaticParams() {
  return [
    { locale: 'el' },
    { locale: 'en' }
  ];
}

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About settings={settings} />
      <Projects />
      <Services />
      <Contact settings={settings} />
    </main>
  )
}
