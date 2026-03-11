"use client"

import { ItemList } from "@/components/common/itemList"
import { useGetJobs } from "../_api/quieries"
import useJobsFilters from "../hooks/useJobsFilters"
import { JobCard } from "./jobCard"
export function JobsList() {
  const { filters } = useJobsFilters()

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
        error: "Something went wrong while loading your jobs.",
        noData: "No jobs yet.",
        noDataDescription:
          "Add a website in the Websites section to start scraping job listings.",
        loading: "Loading more jobs…",
        endReached: "You've reached the end of the list.",
      }}
    />
  )
}
