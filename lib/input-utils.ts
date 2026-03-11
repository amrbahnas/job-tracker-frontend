import { cva, type VariantProps } from "class-variance-authority"

export const inputVariants = cva(
  // Base styles - global styles
  "!h-10 rounded-md px-3.5 py-2 text-base font-normal text-gray-800 transition-all outline-none hover:bg-transparent focus:border-transparent focus:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100",
  {
    variants: {
      variant: {
        default:
          "border-stroke hover:shadow-input-hover focus:shadow-input-focus focus:border-stroke border bg-transparent shadow-input disabled:!border disabled:!border-gray-200 disabled:!shadow-none",
        defaultDropdown:
          "border-stroke hover:shadow-input-hover focus:shadow-input-focus focus:border-stroke hover:bg-secondary-background hover:!text-primary-400 data-[placeholder]:text-md data-[state=open]:shadow-input-focus data-[state=open]:bg-secondary-background data-[state=open]:text-primary-400 [&[data-state=open]_*[data-slot=select-value]]:text-primary-400 border bg-transparent shadow-input hover:!border-transparent disabled:!border disabled:!border-gray-200 disabled:!shadow-none data-[placeholder]:font-medium data-[placeholder]:text-gray-600 data-[state=open]:border-transparent",
        error:
          "border-error-200 bg-error-25 shadow-input-error hover:shadow-input-error-hover focus:shadow-input-error-focus disabled:shadow-input-error-disabled border hover:border-transparent hover:bg-transparent disabled:border-transparent",
        success:
          "border-success-border bg-success-50 shadow-input-success hover:shadow-input-success-hover focus:shadow-input-success-focus disabled:shadow-input-success-disabled border hover:border-transparent disabled:border-transparent",
        warning:
          "border-warning-200 bg-warning-25 shadow-input-warning hover:shadow-input-warning-hover focus:shadow-input-warning-focus disabled:shadow-input-warning-disabled border hover:border-transparent hover:bg-transparent disabled:border-transparent",
        native:
          "focus:border-stroke border-stroke border bg-transparent disabled:!border disabled:!border-gray-200 disabled:!shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>

// Optional per-variant class overrides that will be merged
// after the default variant styles (later classes win in Tailwind).
type InputVariantKey = Extract<
  NonNullable<InputVariantProps["variant"]>,
  string | number | symbol
>

export type InputVariantStyle = Partial<Record<InputVariantKey, string>>

/**
 * Get helper text color class based on input variant
 */
export function getHelperTextColor(
  variant: InputVariantProps["variant"] = "default"
): string {
  return variant === "error"
    ? "text-error"
    : variant === "warning"
      ? "text-warning"
      : variant === "success"
        ? "text-success"
        : "text-gray-500"
}
