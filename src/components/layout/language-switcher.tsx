"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
// import { useTransition } from "react" // Not strictly needed if standard router push is fast enough

interface LanguageSwitcherProps {
    className?: string
    variant?: "default" | "mobile"
}

export function LanguageSwitcher({ className, variant = "default" }: LanguageSwitcherProps) {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    // const [isPending, startTransition] = useTransition()

    const toggleLanguage = () => {
        const nextLocale = locale === "el" ? "en" : "el"
        router.replace(pathname, { locale: nextLocale })
    }

    const label = locale === "el" ? "EN" : "GR"

    return (
        <button
            onClick={toggleLanguage}
            suppressHydrationWarning
            className={cn(
                "font-medium transition-colors uppercase tracking-wider",
                variant === "default" && "text-sm hover:text-architectural",
                variant === "mobile" && "text-lg text-white hover:text-architectural",
                className
            )}
            aria-label="Switch Language"
        >
            {label}
        </button>
    )
}
