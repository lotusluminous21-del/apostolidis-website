import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

export { Input }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative group/input">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full bg-white border-b border-brand-black/30 px-0 py-2 text-lg font-medium text-brand-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-black/60 focus-visible:outline-none focus-visible:border-architectural disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-500 rounded-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:text-red-600",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {/* Focus Indicator "Construction" Line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-architectural w-0 group-focus-within/input:w-full transition-all duration-700 ease-out group-aria-[invalid=true]/input:bg-red-500 group-aria-[invalid=true]/input:w-full" />
            </div>
        )
    }
)
Input.displayName = "Input"
