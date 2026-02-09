"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Spec {
    label: string;
    value: string;
}

interface ProjectCardProps {
    code: string;
    title: string;
    type: string;
    image?: string;
    className?: string;
    specs?: Spec[];
    status?: "COMPLETED" | "IN_PROGRESS";
    variant?: "default" | "horizontal";
}

export function ProjectCard({
    code,
    title,
    type,
    image,
    className,
    specs = [
        { label: "AREA", value: "120m²" },
        { label: "YEAR", value: "2025" },
    ],
    status = "COMPLETED",
    variant = "default"
}: ProjectCardProps) {
    // We use simple CSS group-hover for performance instead of complex JS state where possible

    if (variant === "horizontal") {
        return (
            <div
                className={cn(
                    "relative group cursor-pointer flex flex-col md:flex-row items-center gap-6 p-4 border border-brand-black/5 hover:border-brand-black/20 hover:bg-black/[0.02] transition-all duration-300",
                    className
                )}
            >
                <div className="relative w-full md:w-48 aspect-[16/9] md:aspect-square overflow-hidden bg-neutral-100 border border-brand-black/10">
                    <div className="relative w-full h-full transition-all duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                        {image && (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="200px"
                            />
                        )}
                    </div>
                </div>

                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[9px] text-brand-black/40 uppercase tracking-widest">
                                {code}
                            </span>
                            <div className="w-[1px] h-2 bg-brand-black/20" />
                            <span className="font-mono text-[9px] text-brand-black/40 uppercase tracking-widest">
                                {type}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-brand-black group-hover:text-architectural transition-colors duration-300">
                            {title}
                        </h3>
                    </div>

                    <div className="flex gap-8">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-[8px] uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                                <span className="text-[10px] font-mono font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="px-1.5 py-0.5 bg-architectural/10 text-architectural text-[8px] uppercase font-bold tracking-wide rounded-[2px] whitespace-nowrap">
                            Verified Project
                        </span>
                        <div className="w-8 h-8 rounded-full border border-brand-black/10 flex items-center justify-center text-brand-black/40 group-hover:bg-architectural group-hover:text-white group-hover:border-architectural transition-all duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                "relative group cursor-pointer h-full min-h-[300px] md:min-h-[360px] flex flex-col",
                className
            )}
        >
            {/* 1. IMAGE CONTAINER - CLEAN & EFFICIENT */}
            <div className="relative flex-grow overflow-hidden bg-neutral-100 border border-brand-black/10">
                {/* Draft overlay (visible by default) */}
                <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 bg-white/10">
                    {/* Simple technical markers - purely CSS */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-brand-black/30" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-brand-black/30" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-brand-black/30" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-brand-black/30" />

                    {/* Center crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-30">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-black" />
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brand-black" />
                    </div>
                </div>

                {/* Image */}
                <div className="relative w-full h-full transition-all duration-700 ease-out group-hover:scale-105 filter grayscale contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-100">
                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    )}
                </div>
            </div>

            {/* 2. METADATA - COMPACT SINGLE ROW */}
            <div className="pt-3 flex justify-between items-start">
                <div>
                    {/* ID & Type */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] text-brand-black/40 uppercase tracking-widest">
                            {code}
                        </span>
                        <div className="w-[1px] h-2 bg-brand-black/20" />
                        <span className="font-mono text-[9px] text-brand-black/40 uppercase tracking-widest">
                            {type}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-brand-black group-hover:text-architectural transition-colors duration-300">
                        {title}
                    </h3>
                </div>

                {/* Action / Icon */}
                <div className="w-8 h-8 rounded-full border border-brand-black/10 flex items-center justify-center text-brand-black/40 group-hover:bg-architectural group-hover:text-white group-hover:border-architectural transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* 3. HIDDEN DETAILS (REVEAL ON HOVER) */}
            <div className="h-0 overflow-hidden text-brand-black opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:pt-2 transition-all duration-300 ease-out">
                <div className="flex gap-4 pt-2 border-t border-brand-black/10">
                    {specs.map((spec, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[8px] uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                            <span className="text-[10px] font-mono font-medium">{spec.value}</span>
                        </div>
                    ))}
                    <div className="ml-auto flex items-center">
                        <span className="px-1.5 py-0.5 bg-architectural/10 text-architectural text-[8px] uppercase font-bold tracking-wide rounded-[2px]">
                            Verified
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
