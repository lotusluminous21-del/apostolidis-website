"use client";

import { cn } from "@/lib/utils";

interface SpecItem {
    label: string;
    value: string;
    unit?: string;
}

interface LiveSpecsProps {
    specs: SpecItem[];
    className?: string;
    variant?: "dark" | "light";
}

export function LiveSpecs({ specs, className, variant = "light" }: LiveSpecsProps) {
    const isDark = variant === "dark";

    return (
        <div className={cn(
            "border-t border-grid-line w-full",
            isDark ? "text-white border-white/20" : "text-brand-black",
            className
        )}>
            <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-grid-line border-b border-grid-line">
                {specs.map((spec, i) => (
                    <div
                        key={i}
                        className={cn(
                            "px-4 py-3 flex flex-col hover:bg-black/5 transition-colors",
                            isDark && "hover:bg-white/10"
                        )}
                    >
                        <dt className={cn(
                            "tech-label mb-1",
                            isDark ? "text-white/60" : "text-brand-muted"
                        )}>
                            {spec.label}
                        </dt>
                        <dd className="font-heading font-semibold text-sm tracking-tight">
                            {spec.value}
                            {spec.unit && <span className="text-[10px] ml-1 opacity-70 align-top">{spec.unit}</span>}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
