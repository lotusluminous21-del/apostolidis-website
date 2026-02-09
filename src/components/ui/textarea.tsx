import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export { Textarea }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative group/textarea">
                <textarea
                    className={cn(
                        "flex min-h-[120px] w-full bg-white border-b border-brand-black/30 px-0 py-3 text-lg font-light text-brand-black placeholder:text-brand-black/60 focus-visible:outline-none focus-visible:border-architectural disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-500 resize-none rounded-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:text-red-600",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {/* Focus Indicator "Construction" Line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-architectural w-0 group-focus-within/textarea:w-full transition-all duration-700 ease-out group-aria-[invalid=true]/textarea:bg-red-500 group-aria-[invalid=true]/textarea:w-full" />
            </div>
        )
    }
)
Textarea.displayName = "Textarea"
