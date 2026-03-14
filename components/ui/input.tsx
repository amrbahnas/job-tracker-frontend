"use client"
import * as React from "react"
import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  inputVariants,
  getHelperTextColor,
  type InputVariantProps,
} from "@/lib/input-utils"

export type InputProps = React.ComponentProps<"input"> &
  InputVariantProps & {
    iconStart?: React.ReactNode
    iconEnd?: React.ReactNode
    helperText?: string
    label?: string
    inputClassName?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      iconStart,
      iconEnd,
      helperText,
      disabled,
      label,
      inputClassName,
      type,
      ...props
    },
    ref
  ) => {
    const helperTextColor = getHelperTextColor(variant)

    return (
      <div className={cn("flex w-full flex-col", className)}>
        {label && (
          <label
            onClick={(e) => {
              props?.onClick?.(
                e as unknown as React.MouseEvent<HTMLInputElement, MouseEvent>
              )
            }}
            className="text-md mb-3 font-medium tracking-[-0.32px] text-gray-700 first-letter:uppercase dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className={cn("relative flex w-full items-center", className)}>
          {iconStart && (
            <span
              className={cn(
                "pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 items-center text-gray-500 ltr:left-3.5 rtl:right-3.5 [&>svg]:size-5",
                disabled && "text-gray-400"
              )}
              aria-hidden="true"
            >
              {iconStart}
            </span>
          )}

          <input
            type={type}
            data-slot="input"
            className={cn(
              "h-10! w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
              iconStart && "ltr:ps-[42px] rtl:pr-[42px]", // 14px + 8px + ~20px icon
              iconEnd && "ltr:pr-[42px] rtl:ps-[42px]",
              className
            )}
            {...props}
          />
          {iconEnd && (
            <span
              className={cn(
                "absolute z-10 flex items-center text-gray-500 ltr:right-3.5 rtl:left-3.5 [&>svg]:size-5",
                disabled && "text-gray-400"
              )}
              aria-hidden="true"
            >
              {iconEnd}
            </span>
          )}
        </div>
        {helperText && (
          <div className={cn("mt-2 flex items-center gap-2", helperTextColor)}>
            <InfoIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="text-sm font-normal tracking-[-0.28px] first-letter:uppercase">
              {helperText}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
