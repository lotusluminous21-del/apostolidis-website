"use client"

import { useReducedMotion } from "framer-motion"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { EASE } from "@/lib/animation-variants"
import { CRITICAL_ASSETS, type CriticalAsset } from "@/lib/critical-assets"
import { cn } from "@/lib/utils"

const MAX_BOOT_MS = 15_000
const EXIT_DURATION_S = 0.45

/** Favicon mark paths (no full-bleed white rect) — structural “A” for boot splash */
function BrandMark({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 1200 1200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d="M401.544 120C434.404 120.51 468.29 120.04 501.234 120.021L766.866 120.086C779.244 161.439 791.299 202.89 803.029 244.432L898.646 574.132L929.027 679.326C934.235 697.354 939.708 718.152 945.678 735.734C924.589 736.878 904.68 743.684 886.296 753.99C851.115 773.533 825.261 806.394 814.545 845.187C805.691 876.833 808.326 919.918 824.633 948.981C792.06 948.347 756.136 948.778 723.484 949.123C722.082 938.278 717.255 917.479 714.971 905.91L698.608 821.771C696.18 811.465 694.513 800.401 692.308 789.933C684.34 789.35 671.172 789.663 662.984 789.655L607.015 789.708L526.864 789.732C511.057 789.74 494.356 789.496 478.626 790.003C474.533 804.156 470.521 825.654 467.173 840.778L443.488 948.414C435.185 949.287 422.246 948.985 413.624 949L361.83 949.024C299.099 949.063 234.268 948.075 171.785 949.185C174.096 940.139 177.403 929.559 179.938 920.356L203.265 836.106L293.428 510.299L365.021 251.042L388.546 165.953C392.737 150.86 396.839 134.879 401.544 120ZM584.305 283.004C582.342 288.006 581.227 300.311 579.791 306.533C574.096 330.444 568.577 354.397 563.233 378.389L503.502 642.099L583.388 642.164L663.707 642.088C654.141 604.171 645.541 559.879 637.238 521.231L586.959 286.017C586.724 284.928 586.492 284.693 585.847 283.875L584.305 283.004Z"
                className="fill-foreground"
            />
            <path
                d="M142.204 1023.1C170.168 1023.27 198.132 1023.25 226.096 1023.06L369.714 1023.07L802.874 1023.01L960.871 1023.11C992.629 1023.1 1026.33 1022.54 1057.99 1023.44C1056.68 1038.53 1057.33 1062.86 1057.32 1078.69C1050 1079.45 1035.76 1079.08 1028.12 1079.08L975.506 1079.06L804.216 1079.11L359.096 1079.1L239.868 1079C207.266 1078.56 174.66 1078.57 142.059 1079.04C141.947 1060.4 141.995 1041.75 142.204 1023.1Z"
                className="fill-foreground"
            />
        </svg>
    )
}

function preloadOne(asset: CriticalAsset): Promise<void> {
    const { href, as } = asset
    if (as === "image") {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = href
        })
    }
    if (as === "video") {
        return fetch(href)
            .then(() => {})
            .catch(() => {})
    }
    return fetch(href)
        .then(() => {})
        .catch(() => {})
}

function preloadAll(assets: CriticalAsset[]): Promise<void> {
    return Promise.all(assets.map(preloadOne)).then(() => {})
}

type BootIntroProps = {
    onComplete: () => void
}

export function BootIntro({ onComplete }: BootIntroProps) {
    const prefersReducedMotion = useReducedMotion()
    const [phase, setPhase] = useState<"loading" | "exiting">("loading")
    const [progress, setProgress] = useState(0)
    const doneRef = useRef(false)

    const finish = useCallback(() => {
        if (doneRef.current) return
        doneRef.current = true
        setPhase("exiting")
    }, [])

    useEffect(() => {
        if (prefersReducedMotion === null) return

        if (prefersReducedMotion === true) {
            void preloadAll(CRITICAL_ASSETS)
            onComplete()
            return
        }

        const total = CRITICAL_ASSETS.length
        let loaded = 0
        const bump = () => {
            loaded += 1
            setProgress(Math.min(loaded / total, 1))
        }

        const run = async () => {
            await Promise.all(
                CRITICAL_ASSETS.map(async (asset) => {
                    try {
                        await preloadOne(asset)
                    } finally {
                        bump()
                    }
                })
            )
        }

        const timer = window.setTimeout(() => finish(), MAX_BOOT_MS)
        void run().finally(() => {
            window.clearTimeout(timer)
            finish()
        })

        return () => window.clearTimeout(timer)
    }, [finish, onComplete, prefersReducedMotion])

    useEffect(() => {
        if (phase !== "exiting") return
        const t = window.setTimeout(() => {
            onComplete()
        }, EXIT_DURATION_S * 1000)
        return () => window.clearTimeout(t)
    }, [phase, onComplete])

    if (prefersReducedMotion === true) return null

    return (
        <motion.div
            role="progressbar"
            aria-label="Loading site assets"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-busy={phase === "loading"}
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "exiting" ? 0 : 1 }}
            transition={{
                duration: EXIT_DURATION_S,
                ease: EASE.smooth,
            }}
            className={cn(
                "fixed inset-0 z-[100] flex flex-col items-center justify-center",
                "bg-background"
            )}
            style={{
                pointerEvents: phase === "exiting" ? "none" : "auto",
            }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `
                linear-gradient(to right, hsl(var(--grid-line) / 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--grid-line) / 0.5) 1px, transparent 1px)
              `,
                    backgroundSize: "24px 24px",
                }}
                aria-hidden
            />

            <div className="relative flex w-[min(280px,80vw)] flex-col items-center gap-8">
                <BrandMark className="h-16 w-16 md:h-20 md:w-20" />

                <div className="relative h-[2px] w-full overflow-hidden rounded-none bg-grid-line/30">
                    <motion.div
                        className="h-full origin-left bg-architectural"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress }}
                        transition={{
                            duration: 0.25,
                            ease: EASE.sharp,
                        }}
                    />
                </div>
                <div className="flex w-full justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Structural sync</span>
                    <span>{Math.round(progress * 100)}%</span>
                </div>
            </div>
        </motion.div>
    )
}
