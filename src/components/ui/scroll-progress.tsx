"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
    className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className={cn("fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent", className)}>
            <motion.div
                className="h-full bg-architectural origin-left"
                style={{ scaleX }}
            />
        </div>
    );
}
