"use client"

import usePagination from "@/api_config/usePagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"

type WebsiteSelectorProps = {
  value: string | null
  onChange: (value: string | null) => void
  className?: string
  leftIcon?: React.ReactNode
  /** When false, "All websites" option is hidden (e.g. when one website must be selected). Default true. */
  allowAll?: boolean
}

export function WebsiteSelector({
  value,
  onChange,
  className,
  leftIcon,
  allowAll = true,
}: WebsiteSelectorProps) {
  const { data: websites = [] } = usePagination<Website[]>("/websites", {
    params: {
      limit: 1000,
    },
  })
  const t = useTranslations("jobs.filters")
  return (
    <Select
      value={value || (allowAll ? "all" : undefined)}
      onValueChange={(selectedValue) =>
        onChange(selectedValue === "all" ? null : selectedValue || null)
      }
    >
      <SelectTrigger className={className ?? "w-full min-w-[180px] md:w-56"}>
        {leftIcon}
        <SelectValue placeholder={t("websitePlaceholder")} />
      </SelectTrigger>
      <SelectContent>
        {allowAll && <SelectItem value="all">{t("allWebsites")}</SelectItem>}
        {websites?.map((website) => (
          <SelectItem key={website._id} value={website._id}>
            {website.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
