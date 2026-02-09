"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { useTranslations } from "next-intl"

export function Footer() {
    const t = useTranslations('Footer')
    const tNav = useTranslations('Navigation')
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <footer className="bg-[#050505] text-white pt-12 md:pt-24 pb-12 relative overflow-hidden border-t border-white/5">

            {/* 1. MAIN GRID with Vertical Dividers */}
            <div className="container mx-auto px-6 md:px-12 max-w-[1800px] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">

                    {/* COL 1: IDENTITY */}
                    <div className="py-12 lg:pr-12 lg:border-r border-white/10 flex flex-col justify-between min-h-[300px]">
                        <div>
                            <Logo white className="w-40 mb-8" />
                            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
                                {t('tagline')}
                            </p>
                        </div>
                        <div className="mt-8">
                            <span className="block text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Established</span>
                            <span className="text-xl font-light text-white">2008</span>
                        </div>
                    </div>

                    {/* COL 2: NAVIGATION */}
                    <div className="py-12 lg:px-12 lg:border-r border-white/10 flex flex-col">
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">Navigation</h3>
                        <nav className="flex flex-col gap-4">
                            {['home', 'about', 'services', 'projects', 'contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'home' ? '/' : `/${item === 'projects' ? 'projects' : `#${item}`}`}
                                    className="text-lg font-light text-white/60 hover:text-white transition-colors w-fit group flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-architectural rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {tNav(item)}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* COL 3: CONTACT */}
                    <div className="py-12 lg:px-12 lg:border-r border-white/10 flex flex-col justify-between">
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">Contact</h3>
                            <div className="space-y-8">
                                <div>
                                    <a href="tel:+306944141888" className="block text-xl text-white hover:text-architectural transition-colors font-light mb-1">+30 694 414 1888</a>
                                    <span className="text-[10px] font-mono text-white/30 uppercase">Main Line</span>
                                </div>
                                <div>
                                    <a href="mailto:info@georgeapostolidis.gr" className="block text-xl text-white hover:text-architectural transition-colors font-light mb-1">info@georgeapostolidis.gr</a>
                                    <span className="text-[10px] font-mono text-white/30 uppercase">Electronic Mail</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <address className="not-italic text-white/60 text-sm font-light leading-relaxed">
                                Αγίας Λαύρας 57<br />
                                Αθήνα 111 41, Ελλάδα
                            </address>
                        </div>
                    </div>

                    {/* COL 4: SOCIAL & TOP */}
                    <div className="py-12 lg:pl-12 flex flex-col justify-between">
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">Connect</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, label: "Instagram" },
                                    { icon: Facebook, label: "Facebook" },
                                    { icon: Linkedin, label: "LinkedIn" }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-brand-black hover:border-white transition-all duration-300 group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-4 text-left mt-12 hover:opacity-100 opacity-50 transition-opacity"
                            suppressHydrationWarning
                        >
                            <div className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-full group-hover:border-white transition-colors">
                                <ArrowUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white">Back to Top</span>
                        </button>
                    </div>
                </div>

                {/* 2. FOOTER META */}
                <div className="flex flex-col md:flex-row justify-between items-end mt-24 border-t border-white/5 pt-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                            {t('rights', { year: currentYear })}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. MONUMENTAL WATERMARK */}
            <div className="absolute bottom-[-5vw] left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
                <span className="text-[18vw] font-bold leading-none tracking-tighter text-white whitespace-nowrap uppercase">
                    {useTranslations('About')('lastName')}
                </span>
            </div>
        </footer>
    )
}
