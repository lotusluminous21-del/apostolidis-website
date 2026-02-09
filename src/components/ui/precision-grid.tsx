"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PrecisionGridProps {
    className?: string;
    opacity?: number;
}

export function PrecisionGrid({ className, opacity = 1 }: PrecisionGridProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[5] pointer-events-none select-none overflow-hidden",
                className
            )}
            style={{ opacity }}
            aria-hidden="true"
        >
            {/* Vertical Lines - Mobile: 3 cols, Desktop: 5 cols */}
            <div className="absolute inset-0 flex justify-between max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[120px]">
                {/* Left Border */}
                <div className="w-px h-full bg-grid-line" />

                {/* Center Lines */}
                <div className="hidden md:block w-px h-full bg-grid-line" />
                <div className="w-px h-full bg-grid-line" />
                <div className="hidden md:block w-px h-full bg-grid-line" />

                {/* Right Border */}
                <div className="w-px h-full bg-grid-line" />
            </div>

            {/* Horizontal Lines are handled by sections usually, but we can add global ones */}
        </div>
    );
}
