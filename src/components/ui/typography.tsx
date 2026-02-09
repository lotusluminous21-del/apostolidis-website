import { cn } from "@/lib/utils"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    size?: "hero" | "hero-lg" | "section" | "section-lg" | "card" | "card-lg"
}

export function Heading({
    tag = "h2",
    size,
    className,
    children,
    ...props
}: HeadingProps) {
    const Component = tag

    // Default sizes based on tag if not provided
    const defaultSizeClass = {
        h1: "text-hero lg:text-hero-lg",
        h2: "text-section lg:text-section-lg",
        h3: "text-card lg:text-card-lg",
        h4: "text-lg font-semibold",
        h5: "text-base font-semibold",
        h6: "text-sm font-semibold",
    }[tag]

    const sizeClass = size ? `text-${size}` : defaultSizeClass

    return (
        <Component
            className={cn("font-bold tracking-tight text-brand-black", sizeClass, className)}
            {...props}
        >
            {children}
        </Component>
    )
}

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
    size?: "body" | "body-lg" | "caption" | "eyebrow"
    muted?: boolean
}

export function Text({
    size = "body",
    muted = false,
    className,
    children,
    ...props
}: TextProps) {
    return (
        <p
            className={cn(
                size === "body" && "text-body",
                size === "body-lg" && "text-body-lg",
                size === "caption" && "text-caption",
                size === "eyebrow" && "text-eyebrow uppercase tracking-[0.15em] text-architectural",
                muted && "text-brand-muted",
                className
            )}
            {...props}
        >
            {children}
        </p>
    )
}
