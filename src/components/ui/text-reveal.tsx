"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TextRevealProps {
    children: string
    className?: string
    delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

    const variants = {
        hidden: { y: "100%" },
        visible: (i: number) => ({
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as any,
                delay: delay + i * 0.03, // Stagger effect
            },
        }),
    }

    // Split text into words
    const words = children.split(" ")

    return (
        <span ref={ref} className={`inline-block overflow-hidden leading-[1.1] ${className}`}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true" className="block">
                {words.map((word, i) => (
                    <span key={i} className="inline-block mr-[0.2em] overflow-hidden align-top">
                        <motion.span
                            custom={i}
                            variants={variants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="inline-block"
                            style={{ willChange: "transform, opacity" }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </span>
        </span>
    )
}
