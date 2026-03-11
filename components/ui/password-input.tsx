import {
  GreenCheckedIcon,
  SuccessCheckedIcon,
  UncheckedIcon,
} from "@/components/icons"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, KeyRound, OctagonAlert } from "lucide-react"

import React, { useEffect, useMemo, useRef, useState } from "react"

type PasswordStrength = "weak" | "medium" | "strong"

const PASSWORD_REQUIREMENTS = [
  {
    id: "length",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "special",
    test: (value: string) => /[!@#$%^&*()]/.test(value),
  },
]

const getPasswordStrength = (value: string): PasswordStrength => {
  const passed = PASSWORD_REQUIREMENTS.filter((rule) => rule.test(value)).length

  if (passed <= 1) return "weak"
  if (passed === 2) return "medium"
  return "strong"
}

const PasswordInput = ({
  label,
  className,
  onChange,
  value,
  checkStrength = true,
  setIsPasswordStrengthVisible,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string
  checkStrength?: boolean
  setIsPasswordStrengthVisible?: (isPasswordStrengthVisible: boolean) => void
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [hasTyped, setHasTyped] = useState(false)
  const [currentValue, setCurrentValue] = useState<string>(
    (value as string) ?? ""
  )

  const strength = useMemo<PasswordStrength | null>(() => {
    if (!currentValue) return null
    return getPasswordStrength(currentValue)
  }, [currentValue])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHasTyped(true)
    const newValue = e.target.value
    setCurrentValue(newValue)
    onChange?.(e)
  }

  const strengthConfig: Record<
    PasswordStrength,
    {
      label: string
      barColor: string
      iconColor: string
    }
  > = {
    weak: {
      label: "Password Strength Weak",
      barColor: "bg-red-400",
      iconColor: "text-red-400",
    },
    medium: {
      label: "Password Strength Medium",
      barColor: "bg-yellow-400",

      iconColor: "text-yellow-400",
    },
    strong: {
      label: "Password Strength Strong",
      barColor: "bg-green-400",
      iconColor: "text-green-400",
    },
  }

  const activeStrength =
    strength && hasTyped && currentValue.length > 0 ? strength : null

  const activeConfig =
    activeStrength && strengthConfig[activeStrength]
      ? strengthConfig[activeStrength]
      : null

  const isStrengthVisible =
    checkStrength && !!activeStrength && !!activeConfig && !!currentValue

  const wasStrengthVisibleRef = useRef(isStrengthVisible)

  useEffect(() => {
    if (!setIsPasswordStrengthVisible) return
    if (wasStrengthVisibleRef.current === isStrengthVisible) return
    setIsPasswordStrengthVisible(isStrengthVisible)

    wasStrengthVisibleRef.current = isStrengthVisible
  }, [isStrengthVisible, setIsPasswordStrengthVisible])

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <Input
        label={label}
        type={showPassword ? "text" : "password"}
        autoComplete="off"
        className="w-full"
        iconEnd={
          <span
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            className="cursor-pointer"
          >
            {showPassword ? (
              <Eye size={16} className="text-gray-400" />
            ) : (
              <EyeOff size={16} className="text-gray-400" />
            )}
          </span>
        }
        onChange={handleChange}
        placeholder="••••••••"
        value={value}
        {...props}
      />

      {checkStrength && activeStrength && activeConfig && (
        <div className="rounded-lg2 bg-primary-25 p-3.5">
          <div className="flex flex-col gap-3">
            <div className="h-8.5">
              <div
                className={cn(
                  "text-md mb-1.5 inline-flex min-h-6 items-center gap-2 rounded-full font-medium",
                  activeConfig.iconColor
                )}
              >
                {activeStrength === "weak" && (
                  <OctagonAlert size={20} className={cn("shrink-0")} />
                )}
                {activeStrength === "medium" && (
                  <OctagonAlert size={20} className={cn("shrink-0")} />
                )}
                {activeStrength === "strong" && (
                  <SuccessCheckedIcon size={20} aria-label="checked" />
                )}
                <span className="text-gray-700">{activeConfig.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={cn("h-1.5 flex-1 rounded-full bg-gray-300")}>
                  <span
                    className={cn(
                      "block h-full w-0 rounded-full transition-all duration-300 ease-out",
                      activeConfig.barColor,
                      currentValue && "w-full"
                    )}
                  />
                </div>
                <div className={cn("h-1.5 flex-1 rounded-full bg-gray-300")}>
                  <span
                    className={cn(
                      "block h-full w-0 rounded-full transition-all duration-300 ease-out",
                      activeConfig.barColor,
                      (activeStrength === "medium" ||
                        activeStrength === "strong") &&
                        currentValue &&
                        "w-full"
                    )}
                  />
                </div>
                <div className={cn("h-1.5 flex-1 rounded-full bg-gray-300")}>
                  <span
                    className={cn(
                      "block h-full w-0 rounded-full transition-all duration-300 ease-out",
                      activeConfig.barColor,
                      activeStrength === "strong" && currentValue && "w-full"
                    )}
                  />
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-medium text-gray-700">
              {PASSWORD_REQUIREMENTS.map((rule) => {
                const isMet = rule.test(currentValue)
                const requirementLabels: Record<string, string> = {
                  length: "Password Requirement Length",
                  uppercase: "Password Requirement Uppercase",
                  special: "Password Requirement Special",
                }
                return (
                  <li key={rule.id} className="flex items-center gap-2">
                    {isMet ? (
                      <GreenCheckedIcon
                        size={18}
                        aria-label="checked"
                        color="white"
                      />
                    ) : (
                      <UncheckedIcon
                        size={18}
                        aria-label="unchecked"
                        color="white"
                      />
                    )}
                    <span>{requirementLabels[rule.id]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordInput
