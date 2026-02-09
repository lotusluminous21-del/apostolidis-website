import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-touch",
    {
        variants: {
            variant: {
                default: "bg-architectural text-white hover:bg-architectural-hover active:scale-[0.98]",
                outline: "border-2 border-current bg-transparent hover:bg-brand-black hover:text-white",
                ghost: "hover:bg-architectural-light hover:text-architectural",
                link: "text-architectural underline-offset-4 hover:underline p-0 h-auto min-h-0",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-10 px-4 py-2 text-xs",
                lg: "h-14 px-8 py-4 text-base",
                icon: "h-12 w-12",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                suppressHydrationWarning
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
