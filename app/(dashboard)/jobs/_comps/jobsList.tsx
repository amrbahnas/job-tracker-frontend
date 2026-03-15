"use client"

import { ItemList } from "@/components/common/itemList"
import { useCallback, useMemo, useState } from "react"
import { useGetJobs } from "../_api/quieries"
import useJobsFilters from "../hooks/useJobsFilters"
import JobCard from "./jobCard"
import { useTranslations } from "next-intl"
import JobsBulkActionsBar from "./JobsBulkActionsBar"
import SelectAllCheckbox from "./selectAllCheckbox"

export function JobsList() {
  const { filters } = useJobsFilters()
  const t = useTranslations("jobs.list")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const {
    data: jobs = [] as Job[],
    pagination,
    isLoading,
    error,
    refetch,
  } = useGetJobs({
    params: filters,
  })

  const toggleSelection = useCallback((job: Job) => {
    const id = job._id
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const clearSelection = useCallback(() => setSelectedIds(new Set()), [])
  const selectedJobs = useMemo(() => Array.from(selectedIds), [selectedIds])

  return (
    <section className="space-y-4">
      <SelectAllCheckbox
        selectedJobs={selectedJobs}
        jobs={jobs}
        setSelectedIds={setSelectedIds}
      />
      <JobsBulkActionsBar
        selectedIds={selectedJobs}
        onClearSelection={clearSelection}
      />
      <ItemList
        data={jobs}
        pagination={pagination}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        itemContent={(_, job) => (
          <JobCard
            job={job as Job}
            selected={selectedIds.has((job as Job)._id)}
            onToggleSelect={toggleSelection}
          />
        )}
        messages={{
          error: t("error"),
          noData: t("noData"),
          noDataDescription: t("noDataDescription"),
          loading: t("loading"),
          endReached: t("endReached"),
        }}
      />
    </section>
  )
}
