"use client"

import { useCallback } from "react"
import { VirtuosoGrid } from "react-virtuoso"
import { Button } from "@/components/ui/button"
import PullToRefresh from "react-simple-pull-to-refresh"
import { cn } from "@/lib/utils"

export function ItemList({
  itemContent,
  data,
  pagination,
  isLoading,
  error,
  refetch,
  listClassName,
  itemClassName,
  messages,
}: {
  data: any[]
  pagination: InfinitePaginationType
  isLoading: boolean
  error: Error | null
  refetch: () => void
  itemContent: (data: any, item: any, index: number) => React.ReactNode
  listClassName?: string
  itemClassName?: string
  messages?: {
    error?: string
    noData?: string
    noDataDescription?: string
    loading?: string
    endReached?: string
  }
}) {
  const hasJobs = data && data.length > 0

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
            <p>{messages?.error || "Something went wrong while loading"}</p>
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
            <p className="font-medium text-foreground">
              {messages?.noData || "No data yet."}
            </p>
            <p className="mt-1">
              {messages?.noDataDescription ||
                "Add a website in the Websites section to start scraping job listings."}
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
            data={data}
            overscan={12}
            endReached={handleEndReached}
            listClassName={cn(
              "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
              listClassName
            )}
            itemClassName={cn("h-46", itemClassName)}
            computeItemKey={(_, item) => (item as any)._id ?? ""}
            itemContent={itemContent}
          />
        )}
        {hasJobs && data.length > 8 && (
          <>
            {pagination?.isFetchingNextPage && (
              <p
                className="col-span-full mt-2 text-center text-xs text-muted-foreground"
                role="status"
              >
                {messages?.loading || "Loading more..."}
              </p>
            )}
            {!pagination?.hasMore && !isLoading && (
              <p className="col-span-full mt-2 text-center text-xs text-muted-foreground">
                {messages?.endReached || "You've reached the end of the list."}
              </p>
            )}
          </>
        )}
      </section>
    </PullToRefresh>
  )
}
