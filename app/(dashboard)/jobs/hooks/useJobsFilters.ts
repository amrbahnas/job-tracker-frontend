import { useMemo, useCallback } from "react"
import { useQueryState, parseAsStringLiteral, parseAsString } from "nuqs"

const statusParser = parseAsStringLiteral([
  "all",
  "new",
  "applied",
  "archived",
]).withDefault("new")

const sortParser = parseAsStringLiteral(["newest", "oldest"]).withDefault(
  "newest"
)

export type JobsFiltersState = {
  status: string
  sort: string
  websiteId: string
  search: string
}

function useJobsFilters() {
  const [status, setStatus] = useQueryState("status", statusParser)
  const [sort, setSort] = useQueryState("sort", sortParser)
  const [websiteId, setWebsiteId] = useQueryState(
    "websiteId",
    parseAsString.withDefault("all")
  )
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  )

  const filters: JobsFiltersState = useMemo(
    () => ({
      status,
      sort,
      websiteId,
      search,
    }),
    [search, sort, status, websiteId]
  )

  const setFilters = useCallback(
    (next: Partial<JobsFiltersState>) => {
      if (next.status !== undefined) setStatus(next.status as any)
      if (next.sort !== undefined) setSort(next.sort as any)
      if (next.websiteId !== undefined) setWebsiteId(next.websiteId)
      if (next.search !== undefined) setSearch(next.search)
    },
    [setStatus, setSort, setWebsiteId, setSearch]
  )

  return { filters, setFilters }
}

export default useJobsFilters
