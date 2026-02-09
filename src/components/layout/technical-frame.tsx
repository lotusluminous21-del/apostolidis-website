"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
    EASE,
    HERO_TIMELINE,
    fadeIn,
    fadeUp,
    withDelay,
} from "@/lib/animation-variants";

interface TechnicalFrameProps {
    children: React.ReactNode;
}

export function TechnicalFrame({ children }: TechnicalFrameProps) {
    const t = useTranslations('Navigation');
    const [time, setTime] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const NAV_ITEMS = [
        { label: t('about'), href: "/#about" },
        { label: t('services'), href: "/#services" },
        { label: t('projects'), href: "/projects" },
        { label: t('contact'), href: "/#contact" },
    ];

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Animation variants for staggered header items
    const headerItemVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: EASE.smooth },
        },
    };

    const headerContainerVariant = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: HERO_TIMELINE.HEADER_STAGGER,
                delayChildren: HERO_TIMELINE.HEADER_BASE,
            },
        },
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col md:flex-row">

            {/* LEFT SIDEBAR - SYSTEM STATUS */}
            <aside className="hidden md:flex w-[60px] flex-col justify-between border-r border-grid-line bg-background fixed left-0 top-0 bottom-0 z-50">
                {/* Pulse indicator - First element to animate */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: HERO_TIMELINE.SIDEBAR_INDICATOR,
                        duration: 0.4,
                        ease: EASE.bounce,
                    }}
                    className="h-[60px] flex items-center justify-center border-b border-grid-line"
                >
                    <div className="w-3 h-3 bg-technical-red rounded-full animate-pulse" />
                </motion.div>

                {/* Status text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.HEADER_BASE + 0.2, duration: 0.6 }}
                    className="flex-1 flex items-center justify-center"
                >
                    <div className="-rotate-90 whitespace-nowrap text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                        System Status: Online
                    </div>
                </motion.div>

                {/* Version */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.HEADER_BASE + 0.4, duration: 0.4 }}
                    className="h-[60px] flex items-center justify-center border-t border-grid-line"
                >
                    <span className="text-[10px] font-mono">V.2.0</span>
                </motion.div>
            </aside>

            {/* TOP BAR - UNIFIED COMMAND CENTER */}
            <header className="fixed top-0 left-0 md:left-[60px] right-0 h-[60px] bg-background/95 backdrop-blur-md border-b border-grid-line z-40 flex items-center justify-between pl-4 md:pl-12 pr-4 md:pr-12">

                {/* LEFT BLOCK: BRANDING & NAV - Staggered animation */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={headerContainerVariant}
                    className="flex items-center gap-8 lg:gap-12 h-full"
                >
                    {/* Logo - First to appear */}
                    <motion.div variants={headerItemVariant} className="flex items-center">
                        <Logo />
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={headerItemVariant}
                        className="hidden lg:block h-6 w-px bg-grid-line"
                    />

                    {/* DESKTOP NAVIGATION - Each nav item staggers */}
                    <nav className="hidden lg:flex items-center h-full">
                        <div className="flex h-full items-center gap-8">
                            {NAV_ITEMS.map((item, index) => (
                                <motion.div key={item.href} variants={headerItemVariant}>
                                    <Link
                                        href={item.href}
                                        className="relative h-[30px] flex items-center justify-center text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group overflow-hidden"
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-architectural scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </nav>
                </motion.div>

                {/* UTILITIES & METADATA - Right side stagger */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: HERO_TIMELINE.HEADER_BASE + 0.3,
                            },
                        },
                    }}
                    className="flex items-center gap-6"
                >
                    <motion.div
                        variants={headerItemVariant}
                        className="hidden md:block text-[12px] font-mono tabular-nums text-muted-foreground"
                    >
                        {isMounted ? time : "00:00:00"} UTC+2
                    </motion.div>

                    <motion.div
                        variants={headerItemVariant}
                        className="h-4 w-px bg-grid-line hidden md:block"
                    />

                    <motion.div variants={headerItemVariant}>
                        <LanguageSwitcher />
                    </motion.div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 -mr-2 text-foreground"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </motion.div>
            </header>

            {/* MAIN CONTENT VIEWPORT */}
            <main className="flex-1 md:ml-[60px] pt-[60px] relative min-h-screen">
                {/* Corner Markers - Animate last to complete the frame */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.CORNER_MARKERS, duration: 0.3 }}
                    className="fixed top-[60px] left-[60px] w-4 h-4 border-l border-t border-brand-black/20 z-40 hidden md:block pointer-events-none"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.CORNER_MARKERS + 0.05, duration: 0.3 }}
                    className="fixed top-[60px] right-0 w-4 h-4 border-r border-t border-brand-black/20 z-40 hidden md:block pointer-events-none"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.CORNER_MARKERS + 0.1, duration: 0.3 }}
                    className="fixed bottom-0 left-[60px] w-4 h-4 border-l border-b border-brand-black/20 z-40 hidden md:block pointer-events-none"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HERO_TIMELINE.CORNER_MARKERS + 0.15, duration: 0.3 }}
                    className="fixed bottom-0 right-0 w-4 h-4 border-r border-b border-brand-black/20 z-40 hidden md:block pointer-events-none"
                />

                {children}
            </main>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={NAV_ITEMS}
            />

            {/* RIGHT SCROLL BAR (Deco) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: HERO_TIMELINE.CORNER_MARKERS, duration: 0.4 }}
                className="hidden md:block w-[4px] fixed right-0 top-[60px] bottom-0 bg-grid-line/30 z-50 pointer-events-none"
            />

        </div>
    );
}
