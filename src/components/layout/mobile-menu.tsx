"use client"

import { X } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "./language-switcher"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    navItems: { label: string; href: string }[]
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
    const [visible, setVisible] = useState(false)

    // Handle animation logic (mount/unmount)
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (isOpen) {
            setVisible(true)
            // Prevent body scroll
            document.body.style.overflow = "hidden"
        } else {
            timeout = setTimeout(() => setVisible(false), 300)
            document.body.style.overflow = ""
        }
        return () => {
            clearTimeout(timeout)
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!visible) return null

    return (
        <div
            className={cn(
                "fixed inset-0 z-[60] bg-brand-black text-white flex flex-col transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Header inside menu */}
            <div className="flex justify-end p-6">
                <button
                    onClick={onClose}
                    className="p-2 transition-transform hover:rotate-90"
                    aria-label="Close menu"
                >
                    <X className="w-8 h-8 text-white" />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 items-center justify-center gap-8 pb-20">
                <nav className="flex flex-col items-center gap-6">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            scroll={false}
                            onClick={onClose}
                            className={cn(
                                "text-2xl font-light tracking-widest hover:text-architectural transition-colors transform translate-y-4 opacity-0 animate-slide-up",
                                // Staggered animation delay using inline style not ideal in strict CSP, 
                                // but can be done with tailwind classes if we had utility classes for delays.
                                // For now, simplified animation.
                            )}
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
                        >
                            {item.label}
                            <div className="w-8 h-px bg-white/20 mx-auto mt-2" />
                        </Link>
                    ))}
                </nav>

                {/* Footer Info */}
                <div className="mt-8 text-center text-white/60 space-y-2 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "forwards", opacity: 0 }}>
                    <p>+30 694 414 1888</p>
                    <p>apostolidisconstruction@gmail.com</p>
                    <div className="flex gap-4 justify-center mt-4 text-sm font-medium">
                        <LanguageSwitcher variant="mobile" />
                    </div>
                </div>
            </div>
        </div>
    )
}
