"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
    id: number;
    title: string;
    description: string;
    meta: string; // e.g., "Duration: 2 Weeks"
}

interface ProcessTimelineProps {
    steps: Step[];
    className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className={cn("relative pl-8 md:pl-0", className)}>
            {/* Central Line for Desktop, Left Line for Mobile */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-grid-line -translate-x-1/2" />

            {/* Active Line (Filling up) */}
            <motion.div
                className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-architectural -translate-x-1/2 origin-top z-10"
                style={{ height: lineHeight }}
            />

            <div className="space-y-24">
                {steps.map((step, index) => (
                    <ProcessNode
                        key={step.id}
                        step={step}
                        index={index}
                        isLast={index === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

function ProcessNode({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
                "relative grid md:grid-cols-2 gap-8 md:gap-16 items-center",
                isLast ? "pb-0" : ""
            )}
        >
            {/* Node Marker */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-2 border-architectural rounded-full z-20">
                <div className="absolute inset-0 bg-architectural rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content - Alternating sides on desktop */}
            <div className={cn(
                "pl-12 md:pl-0 md:text-right order-2 md:order-1",
                !isEven && "md:col-start-2 md:text-left md:order-2"
            )}>
                <span className="tech-label text-architectural mb-2 block">
                    0{step.id} / {step.meta}
                </span>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
            </div>

            {/* Empty side for balance */}
            <div className={cn("hidden md:block order-1 md:order-2", !isEven && "md:col-start-1 md:order-1")} />
        </motion.div>
    );
}
