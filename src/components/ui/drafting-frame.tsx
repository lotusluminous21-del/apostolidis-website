"use client"

import { motion } from "framer-motion"
import {
    DURATION,
    EASE,
    markerPop,
    withDelay
} from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

interface DraftingFrameProps {
    className?: string
    delay?: number
    showMarkers?: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[]
    label?: string
    labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    labelClassName?: string
    /** When true, uses "drawing" animation style (clip-path reveal from origin) */
    animateSequentially?: boolean
    children?: React.ReactNode
}

export function DraftingFrame({
    className,
    delay = 0,
    showMarkers = [],
    label,
    labelPosition = "top-left",
    labelClassName = "",
    animateSequentially = false,
    children
}: DraftingFrameProps) {

    const markersDelay = delay + 0.4
    const labelDelay = delay + 0.5

    // Base positioning classes (always on outer container)
    const baseClasses = "absolute -inset-x-2 -inset-y-1 md:-inset-x-4 md:-inset-y-2 pointer-events-none"

    return (
        <div className={cn(baseClasses, !animateSequentially && className)}>
            {animateSequentially ? (
                // SEQUENTIAL MODE: Borders animate via clip-path "drawing" reveal
                <>
                    <motion.div
                        initial={{
                            clipPath: "inset(0 100% 100% 0)", // Start hidden (reveal from top-left)
                            opacity: 0
                        }}
                        animate={{
                            clipPath: "inset(0 0% 0% 0)", // Fully revealed
                            opacity: 1
                        }}
                        transition={{
                            delay,
                            duration: DURATION.reveal * 1.5,
                            ease: [0.4, 0, 0.2, 1] // Smooth drawing feel
                        }}
                        // Border classes go HERE so they're inside the clip-path animation
                        className={cn("w-full h-full relative", className)}
                    >
                        {/* Corner Markers - pop after borders complete */}
                        {showMarkers.includes('top-left') && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={withDelay(markerPop, markersDelay)}
                                className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current opacity-80"
                            />
                        )}
                        {showMarkers.includes('top-right') && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={withDelay(markerPop, markersDelay + 0.05)}
                                className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current opacity-80"
                            />
                        )}
                        {showMarkers.includes('bottom-left') && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={withDelay(markerPop, markersDelay + 0.1)}
                                className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current opacity-80"
                            />
                        )}
                        {showMarkers.includes('bottom-right') && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={withDelay(markerPop, markersDelay + 0.15)}
                                className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current opacity-80"
                            />
                        )}

                        {children}
                    </motion.div>

                    {/* Technical Label - OUTSIDE clip-path so it's not clipped */}
                    {label && (
                        <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            transition={{ delay: labelDelay, duration: DURATION.fast, ease: EASE.smooth }}
                            className={`absolute text-[8px] font-mono tracking-widest uppercase whitespace-nowrap
                                ${labelPosition === 'top-left' ? '-top-3 left-0' : ''}
                                ${labelPosition === 'top-right' ? '-top-3 right-0' : ''}
                                ${labelPosition === 'bottom-left' ? '-bottom-3 left-0' : ''}
                                ${labelPosition === 'bottom-right' ? '-bottom-3 right-0' : ''}
                                ${labelClassName}
                            `}
                        >
                            {label}
                        </motion.div>
                    )}
                </>
            ) : (
                // DEFAULT MODE: Original behavior (scale + fade)
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
                            ${labelClassName}
                        `}>
                            {label}
                        </div>
                    )}

                    {children}
                </motion.div>
            )}
        </div>
    )
}
