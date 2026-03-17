"use client"

import RefetchBTN from "@/components/common/refetchBTN"
import WebsiteSelector from "@/components/selectors/WebsiteSelector"
import SearchInput from "@/components/ui/searchInput"
import { useTranslations } from "next-intl"
import JOBS_KEYS from "../_api/keys"
import useJobsFilters from "../hooks/useJobsFilters"
import JobStatusTabs from "./jobStatusTabs"
import ScrapeBTN from "./scraptBTN"
import { useCallback } from "react"
import { cn } from "@/lib/utils"

export function JobsFilters() {
  const { filters, setFilters } = useJobsFilters()
  const { status, sort, websiteId, search } = filters
  const t = useTranslations("jobs.filters")

  const handleStatusChange = useCallback(
    (value: string) => {
      setFilters({ status: value })
    },
    [setFilters]
  )
  const handleWebsiteChange = useCallback(
    (value: string | null) => {
      setFilters({ websiteId: value ?? ("" as string) })
    },
    [setFilters]
  )

  return (
    <section
      className="flex flex-col-reverse justify-between gap-4 rounded-md sm:flex-row sm:items-center sm:border sm:bg-card sm:p-4"
      aria-label={t("ariaLabel")}
    >
      <div className="flex flex-1 gap-2 overflow-hidden">
        <SearchInput
          value={search}
          placeholder={t("searchPlaceholder")}
          onChange={(value) => setFilters({ search: value })}
          className={cn(
            "min transition-all duration-300 after:absolute after:inset-s-1 after:top-1 after:size-2 after:rounded-full after:bg-transparent focus:w-screen sm:max-w-[380px] focus:sm:w-auto",
            search && "after:bg-red-500 sm:after:bg-transparent"
          )}
        />
        <WebsiteSelector
          value={websiteId}
          onChange={handleWebsiteChange}
          className="w-full sm:w-40"
        />
        {/* <SortSelector
          value={sort}
          className="hidden w-full sm:flex sm:w-40"
          onChange={(value) => setFilters({ sort: value })}
          leftIcon={<SortAsc className="size-4" />}
        /> */}
        <span className="block sm:hidden">
          <ScrapeBTN />
        </span>
        <RefetchBTN queryKey={JOBS_KEYS.getJobs} className="hidden sm:flex" />
      </div>

      <JobStatusTabs value={status} onChange={handleStatusChange} />
    </section>
  )
}
