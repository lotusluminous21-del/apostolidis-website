"use client"

import type { MouseEvent } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { scrollToTopSmooth } from "@/lib/scroll-utils"

interface LogoProps {
    className?: string
    white?: boolean
}

export function Logo({ className, white = false }: LogoProps) {
    const t = useTranslations('Metadata')
    const pathname = usePathname()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        scrollToTopSmooth()
        const { pathname: p, search } = window.location
        window.history.replaceState(null, "", p + search)
    }

    return (
        <Link
            href="/"
            scroll={false}
            onClick={handleClick}
            className={cn(
                "flex items-center gap-3 group select-none",
                className
            )}
            aria-label={`${t('siteName')} Homepage`}
        >
            {/* Symbol */}
            <div className={cn(
                "relative w-10 h-10 flex items-center justify-center border-2 rounded-none transition-colors",
                white
                    ? "border-white/20 text-white hover:border-white hover:text-white bg-transparent"
                    : "border-brand-black text-brand-black group-hover:border-architectural group-hover:text-architectural"
            )}>
                <div className="relative w-6 h-6">
                    <Image
                        src="/apostolidis_logo.svg"
                        alt="A"
                        fill
                        className={cn(
                            "object-contain",
                            white && "invert bg-transparent"
                        )}
                    />
                </div>
            </div>

            {/* Text part (hidden on very small screens if needed, but blueprint shows it) */}
            <div className={cn(
                "flex flex-col leading-none tracking-wider",
                white ? "text-white" : "text-brand-black"
            )}>
                <span className="font-bold text-sm uppercase">{t('siteName')}</span>
                <span className={cn(
                    "text-[0.65rem] font-medium transition-colors",
                    white ? "text-white/60" : "text-brand-gray group-hover:text-architectural"
                )}>
                    {t('tagline')}
                </span>
            </div>
        </Link>
    )
}
