"use client";

import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

type SplitTextProps = {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    type?: "chars" | "words";
};

export function SplitText({
    children,
    className,
    delay = 0,
    duration = 0.05,
    type = "words" // Default to words as it's often more readable for long text
}: SplitTextProps) {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const words = children.split(" ");

    const container: { hidden: Variant; visible: Variant } = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: duration,
                delayChildren: delay,
            },
        },
    };

    const childVariant: { hidden: Variant; visible: Variant } = {
        hidden: {
            y: "100%",
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={`inline-block overflow-hidden ${className}`} // overflow-hidden is key
            style={{ willChange: "transform, opacity" }}
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {type === "chars" ? (
                        word.split("").map((char, j) => (
                            <motion.span key={j} variants={childVariant} className="inline-block">
                                {char}
                            </motion.span>
                        ))
                    ) : (
                        <motion.span variants={childVariant} className="inline-block">
                            {word}
                        </motion.span>
                    )}
                </span>
            ))}
        </motion.span>
    );
}
