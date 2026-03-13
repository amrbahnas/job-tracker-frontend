import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"

const SCRAPE_INTERVAL_OPTIONS = [
  { key: "every10", value: 10 },
  { key: "every15", value: 15 },
  { key: "every30", value: 30 },
  { key: "every60", value: 60 },
  { key: "every180", value: 180 },
  { key: "every360", value: 360 },
]

const IntervalSelector = ({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) => {
  const t = useTranslations("websites.interval")
  return (
    <Select
      value={String(value)}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {SCRAPE_INTERVAL_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {t(option.key)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default IntervalSelector
