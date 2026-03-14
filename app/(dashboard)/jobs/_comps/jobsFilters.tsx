"use client"

import RefetchBTN from "@/components/common/refetchBTN"
import SortSelector from "@/components/selectors/sortSelector"
import { WebsiteSelector } from "@/components/selectors/WebsiteSelector"
import SearchInput from "@/components/ui/searchInput"
import { Globe, SortAsc } from "lucide-react"
import JOBS_KEYS from "../_api/keys"
import useJobsFilters from "../hooks/useJobsFilters"
import JobStatusTabs from "./jobStatusTabs"
import ScrapeBTN from "./scraptBTN"
import { useTranslations } from "next-intl"

export function JobsFilters() {
  const { filters, setFilters } = useJobsFilters()
  const { status, sort, websiteId, search } = filters
  const t = useTranslations("jobs.filters")

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
          className="min transition-all duration-300 focus:w-screen sm:max-w-[380px] focus:sm:w-auto"
        />
        <WebsiteSelector
          value={websiteId}
          onChange={(value) =>
            setFilters({ websiteId: value ?? ("" as string) })
          }
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

      <JobStatusTabs
        value={status}
        onChange={(value) => setFilters({ status: value })}
      />
    </section>
  )
}
