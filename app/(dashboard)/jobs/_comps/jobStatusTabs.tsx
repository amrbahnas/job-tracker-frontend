"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Check, FolderPlus, Tag } from "lucide-react"
import React, { memo } from "react"
import { useLocale, useTranslations } from "next-intl"

const STATUS_OPTIONS: {
  value: string
  labelKey: string
  icon: React.ReactNode
}[] = [
  { value: "all", labelKey: "all", icon: <Briefcase className="size-4" /> },
  { value: "new", labelKey: "new", icon: <Tag className="size-4" /> },
  { value: "applied", labelKey: "applied", icon: <Check className="size-4" /> },
  {
    value: "archived",
    labelKey: "archived",
    icon: <FolderPlus className="size-4" />,
  },
]

type JobStatusTabsProps = {
  value?: string | null
  onChange: (value: string) => void
}

function JobStatusTabs({ value, onChange }: JobStatusTabsProps) {
  const currentValue = value || "all"
  const t = useTranslations()
  const local = useLocale()
  return (
    <>
      <Tabs
        value={currentValue}
        onValueChange={onChange}
        className="hidden w-full sm:block md:w-auto"
      >
        <TabsList
          dir={local === "ar" ? "rtl" : "ltr"}
          className="w-full md:w-auto"
        >
          {STATUS_OPTIONS.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              currentValue={currentValue}
              className="flex-1 px-3 py-1 text-xs md:text-sm"
              variant="card"
            >
              <div className="flex items-center justify-center gap-2">
                {option.icon}
                {t(`jobs.statusTabs.${option.labelKey}` as never)}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="no-scrollbar flex w-full items-center justify-start gap-2 overflow-x-scroll sm:hidden">
        {STATUS_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? "default" : "outline"}
            className="w-fit shrink-0 rounded-full"
            onClick={() => onChange(option.value)}
          >
            <div className="flex items-center justify-center gap-2">
              {option.icon}
              {t(`jobs.statusTabs.${option.labelKey}` as never)}
            </div>
          </Button>
        ))}
      </div>
    </>
  )
}

export default memo(JobStatusTabs)
