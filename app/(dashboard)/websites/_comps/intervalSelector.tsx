import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SCRAPE_INTERVAL_OPTIONS = [
  { label: "Every 10 minutes", value: 10 },
  { label: "Every 15 minutes", value: 15 },
  { label: "Every 30 minutes", value: 30 },
  { label: "Every 1 hour", value: 60 },
  { label: "Every 3 hours", value: 180 },
  { label: "Every 6 hours", value: 360 },
]

const IntervalSelector = ({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) => {
  return (
    <Select
      value={String(value)}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select interval" />
      </SelectTrigger>
      <SelectContent>
        {SCRAPE_INTERVAL_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default IntervalSelector
