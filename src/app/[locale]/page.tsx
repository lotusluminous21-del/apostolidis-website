import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Services } from "@/components/home/services"
import { Projects } from "@/components/home/projects"
import { Contact } from "@/components/home/contact"

export function generateStaticParams() {
  return [
    { locale: 'el' },
    { locale: 'en' }
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  )
}
