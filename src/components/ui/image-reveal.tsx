"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ImageRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    delay?: number;
    duration?: number;
}

export function ImageReveal({
    children,
    className = "",
    direction = 'left',
    delay = 0,
    duration = 1.0,
}: ImageRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const getVariants = (dir: string) => {
        return {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        };
    };

    const variants = getVariants(direction);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={controls}
                transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }} // smooth quart ease
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
