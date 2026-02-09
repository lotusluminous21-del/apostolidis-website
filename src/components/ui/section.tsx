import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    dark?: boolean
    fullBleed?: boolean
}

export function Section({
    children,
    dark = false,
    fullBleed = false,
    className,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                "py-section-mobile lg:py-section-desktop",
                dark && "dark-section bg-brand-black text-white",
                !fullBleed && "px-6 md:px-8 lg:px-12 xl:px-20",
                className
            )}
            {...props}
        >
            <div className={cn(
                !fullBleed && "max-w-content mx-auto"
            )}>
                {children}
            </div>
        </section>
    )
}

export function SectionHeader({
    eyebrow,
    title,
    description,
    centered = false,
    className,
}: {
    eyebrow?: string
    title: string
    description?: string
    centered?: boolean
    className?: string
}) {
    return (
        <div className={cn(
            "mb-12 lg:mb-16",
            centered && "text-center",
            className
        )}>
            {eyebrow && (
                <span className="eyebrow block mb-4">{eyebrow}</span>
            )}
            <h2 className="section-heading text-balance">{title}</h2>
            {!centered && <div className="accent-line mt-6" />}
            {description && (
                <p className="mt-6 text-body-lg text-muted-foreground max-w-text">
                    {description}
                </p>
            )}
        </div>
    )
}
