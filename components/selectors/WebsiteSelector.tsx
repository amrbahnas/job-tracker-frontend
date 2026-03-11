"use client"

import usePagination from "@/api_config/usePagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type WebsiteSelectorProps = {
  value: string | null
  onChange: (value: string | null) => void
  className?: string
  leftIcon?: React.ReactNode
}

export function WebsiteSelector({
  value,
  onChange,
  className,
  leftIcon,
}: WebsiteSelectorProps) {
  const { data: websites = [] } = usePagination<Website[]>("/websites", {
    params: {
      limit: 1000,
    },
  })
  return (
    <Select
      value={value || "all"}
      onValueChange={(selectedValue) =>
        onChange(selectedValue === "all" ? null : selectedValue)
      }
    >
      <SelectTrigger className={className ?? "w-full min-w-[180px] md:w-56"}>
        {leftIcon}
        <SelectValue placeholder="All Platforms" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Platforms</SelectItem>
        {websites?.map((website) => (
          <SelectItem key={website._id} value={website._id}>
            {website.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
