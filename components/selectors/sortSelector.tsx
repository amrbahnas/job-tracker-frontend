import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
]

const SortSelector = ({
  value,
  onChange,
  className,
  leftIcon,
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  leftIcon?: React.ReactNode
}) => {
  return (
    <Select
      value={value || "newest"}
      onValueChange={(value) => onChange(value || "newest")}
    >
      <SelectTrigger className={className}>
        {leftIcon}
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelector
