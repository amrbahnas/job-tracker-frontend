"use client"

import * as React from "react"
import { OTPInput as BaseOTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
  autoFocus?: boolean
  pattern?: string
  textAlign?: "left" | "center" | "right"
  containerClassName?: string
}

function OTPInput({
  length = 6,
  value,
  onChange,
  className,
  disabled,
  autoFocus,
  pattern,
  textAlign = "center",
  containerClassName,
  ...props
}: OTPInputProps) {
  return (
    <BaseOTPInput
      maxLength={length}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      pattern={pattern}
      textAlign={textAlign}
      containerClassName={cn(
        "flex items-center justify-center gap-3",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      <OTPInputGroup className={cn("flex gap-4", className)}>
        {Array.from({ length }).map((_, index) => (
          <OTPInputSlot
            key={index}
            index={index}
            className="size-12 rounded-lg border border-input bg-background text-center text-lg font-semibold transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        ))}
      </OTPInputGroup>
    </BaseOTPInput>
  )
}

function OTPInputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  )
}

function OTPInputSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Base styles - square with rounded corners
        "relative flex items-center justify-center",
        "h-12 w-12 rounded-lg",
        "bg-white",
        "text-base font-semibold text-[#272D34]",
        "transition-all duration-200",
        // Border styles
        "border-2",
        "border-[#D0D5DD]", // Light gray border for inactive
        "data-[active=true]:border-primary", // Blue border for active
        // Focus/active states
        "data-[active=true]:ring-0", // Remove default ring
        "outline-none",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-2">
          <div className="h-0.5 w-6 animate-pulse bg-primary" />
        </div>
      )}
    </div>
  )
}

// Export the main component and sub-components for flexibility
export { OTPInput, OTPInputGroup, OTPInputSlot }
