"use client"

import { Button } from "@/components/ui/button"
import { WebsiteCard } from "./WebsiteCard"

type WebsitesListProps = {
  onAddWebsite?: () => void
  onEditWebsite?: (website: Website) => void
  websites: Website[]
  isPending: boolean
  isError: boolean
  refetch: () => void
}

export function WebsitesList({
  onAddWebsite,
  onEditWebsite,
  websites,
  isPending,
  isError,
  refetch,
}: WebsitesListProps) {
  const hasWebsites = websites.length > 0

  if (isError) {
    return (
      <section
        aria-label="Websites loading error"
        className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
      >
        <div className="flex flex-col gap-3">
          <p>Something went wrong while loading your websites.</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            className="w-fit"
          >
            Try again
          </Button>
        </div>
      </section>
    )
  }

  if (!hasWebsites && !isPending) {
    return (
      <section
        aria-label="Empty websites state"
        className="rounded-md border bg-muted/40 p-6 text-sm text-muted-foreground"
      >
        <p className="font-medium text-foreground">No websites yet.</p>
        <p className="mt-1">
          Add your first platform to start scraping job listings from your
          favorite boards.
        </p>
        <Button type="button" size="sm" className="mt-4" onClick={onAddWebsite}>
          Add website
        </Button>
      </section>
    )
  }

  if (!hasWebsites && isPending) {
    return (
      <section aria-label="Loading websites">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="h-32 animate-pulse">
              <div className="h-full rounded-lg border bg-muted/40" />
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section aria-label="Websites list">
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {websites.map((website) => (
          <li key={website._id}>
            <WebsiteCard
              website={website}
              onEditWebsite={onEditWebsite}
              refetch={refetch}
            />
          </li>
        ))}

        <li>
          <button
            type="button"
            className="flex h-full min-h-[128px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/40"
            onClick={onAddWebsite}
          >
            <span className="text-lg">＋</span>
            <span>Add source</span>
          </button>
        </li>
      </ul>
    </section>
  )
}
