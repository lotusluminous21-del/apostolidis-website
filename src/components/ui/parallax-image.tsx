"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // 0 = no movement, 1 = normal scroll speed
}

export function ParallaxImage({
    src,
    alt,
    className,
    speed = 0.5
}: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className={`overflow-hidden relative ${className}`}>
            <motion.div
                style={{ y, height: "120%", willChange: "transform" }} // Make image taller than container
                className="relative w-full -top-[10%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority // Hero images usually need priority
                />
            </motion.div>
        </div>
    );
}
