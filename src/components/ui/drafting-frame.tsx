"use client"

import { motion } from "framer-motion"
import { DURATION, EASE } from "@/lib/animation-variants"

interface DraftingFrameProps {
    className?: string
    delay?: number
    showMarkers?: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[]
    label?: string
    labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    children?: React.ReactNode
}

export function DraftingFrame({
    className,
    delay = 0,
    showMarkers = [],
    label,
    labelPosition = "top-left",
    children
}: DraftingFrameProps) {
    return (
        <div className={`absolute -inset-x-2 -inset-y-1 md:-inset-x-4 md:-inset-y-2 pointer-events-none ${className}`}>
            {/* Lines Animate In */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: DURATION.normal, ease: EASE.sharp }}
                className="w-full h-full relative"
            >
                {/* Corner Markers */}
                {showMarkers.includes('top-left') && (
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current opacity-80" />
                )}
                {showMarkers.includes('top-right') && (
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current opacity-80" />
                )}
                {showMarkers.includes('bottom-left') && (
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current opacity-80" />
                )}
                {showMarkers.includes('bottom-right') && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current opacity-80" />
                )}

                {/* Technical Label */}
                {label && (
                    <div className={`absolute text-[8px] font-mono tracking-widest opacity-60 uppercase whitespace-nowrap
                        ${labelPosition === 'top-left' ? '-top-3 left-0' : ''}
                        ${labelPosition === 'top-right' ? '-top-3 right-0' : ''}
                        ${labelPosition === 'bottom-left' ? '-bottom-3 left-0' : ''}
                        ${labelPosition === 'bottom-right' ? '-bottom-3 right-0' : ''}
                    `}>
                        {label}
                    </div>
                )}

                {children}
            </motion.div>
        </div>
    )
}
