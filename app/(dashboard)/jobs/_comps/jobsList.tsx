"use client"

import { useCallback } from "react"
import { VirtuosoGrid } from "react-virtuoso"

import { Button } from "@/components/ui/button"
import PullToRefresh from "react-simple-pull-to-refresh"
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

  const hasJobs = jobs && jobs.length > 0

  const handleEndReached = useCallback(() => {
    if (!pagination?.hasMore || pagination.isFetchingNextPage || isLoading)
      return
    pagination.fetchNextPage()
  }, [isLoading, pagination])

  return (
    <PullToRefresh onRefresh={refetch as any}>
      <section aria-label="Job results" className="relative space-y-4">
        {error && !isLoading && !hasJobs && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <p>Something went wrong while loading your jobs.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              className="w-fit"
            >
              Try again
            </Button>
          </div>
        )}

        {!hasJobs && !isLoading && !error && (
          <div className="rounded-md border bg-muted/40 p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">No jobs yet.</p>
            <p className="mt-1">
              Add a website in the Websites section to start scraping job
              listings.
            </p>
          </div>
        )}

        {!hasJobs && isLoading && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li className="h-52 animate-pulse rounded-xl border bg-muted/40" />
            <li className="h-52 animate-pulse rounded-xl border bg-muted/40" />
            <li className="h-52 animate-pulse rounded-xl border bg-muted/40" />
          </ul>
        )}

        {hasJobs && (
          <VirtuosoGrid
            useWindowScroll
            data={jobs}
            overscan={12}
            endReached={handleEndReached}
            listClassName="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            itemClassName="min-h-[120px]"
            computeItemKey={(_, job) => (job as Job)._id ?? ""}
            itemContent={(_, job) => (
              <JobCard job={job as Job} refetch={refetch} />
            )}
          />
        )}
        {hasJobs && (
          <>
            {pagination?.isFetchingNextPage && (
              <p
                className="col-span-full mt-2 text-center text-xs text-muted-foreground"
                role="status"
              >
                Loading more jobs…
              </p>
            )}
            {!pagination?.hasMore && !isLoading && (
              <p className="col-span-full mt-2 text-center text-xs text-muted-foreground">
                You&apos;ve reached the end of the list.
              </p>
            )}
          </>
        )}
      </section>
    </PullToRefresh>
  )
}
