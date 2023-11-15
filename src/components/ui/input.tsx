import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-400 bg-clip-padding bg-transparent py-3 px-4 text-slate-800 shadow outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-slate-100 focus:shadow-md focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-50 dark:shadow-black/70 dark:focus:bg-zinc-300/10 dark:focus:ring-zinc-400 dark:focus:ring-offset-slate-900",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
