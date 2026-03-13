"use client"

import { ItemList } from "@/components/common/itemList"
import { useGetJobs } from "../_api/quieries"
import useJobsFilters from "../hooks/useJobsFilters"
import { JobCard } from "./jobCard"
import { useTranslations } from "next-intl"
export function JobsList() {
  const { filters } = useJobsFilters()
  const t = useTranslations("jobs.list")

  const {
    data: jobs = [] as Job[],
    pagination,
    isLoading,
    error,
    refetch,
  } = useGetJobs({
    params: filters,
  })

  return (
    <ItemList
      data={jobs}
      pagination={pagination}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      itemContent={(_, job) => <JobCard job={job as Job} />}
      messages={{
        error: t("error"),
        noData: t("noData"),
        noDataDescription: t("noDataDescription"),
        loading: t("loading"),
        endReached: t("endReached"),
      }}
    />
  )
}
