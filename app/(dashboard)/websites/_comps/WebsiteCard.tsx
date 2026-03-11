"use client"

import { Button } from "@/components/ui/button"

import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { WebsiteUrlsDialog } from "./websiteUrlsDialog"
import { useWebsitesActions } from "../_api/mutations"

type WebsiteStatus = "active" | "paused" | string

type WebsiteCardProps = {
  website: Website
  onEditWebsite?: (website: Website) => void
  refetch?: () => void
}

function getPlatformBadge(name?: string) {
  if (!name) return null

  const normalized = name.toString().toLowerCase()

  const baseClasses =
    "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold uppercase"

  if (normalized === "linkedin") {
    return <span className={`${baseClasses} bg-[#0a66c2] text-white`}>in</span>
  }

  if (normalized === "indeed") {
    return <span className={`${baseClasses} bg-[#2557a7] text-white`}>id</span>
  }

  if (normalized === "wuzzuf") {
    return <span className={`${baseClasses} bg-[#4f2d7f] text-white`}>wz</span>
  }

  if (normalized === "bayt") {
    return <span className={`${baseClasses} bg-[#0058a3] text-white`}>bt</span>
  }

  if (normalized === "gulftalent") {
    return <span className={`${baseClasses} bg-[#004f9f] text-white`}>gt</span>
  }

  if (normalized === "jooble") {
    return <span className={`${baseClasses} bg-sky-500 text-white`}>jb</span>
  }

  if (normalized === "tanqeeb") {
    return (
      <span className={`${baseClasses} bg-emerald-500 text-white`}>tq</span>
    )
  }

  if (normalized === "naukrigulf") {
    return <span className={`${baseClasses} bg-amber-500 text-white`}>ng</span>
  }

  if (normalized === "jobrapido") {
    return (
      <span className={`${baseClasses} bg-fuchsia-500 text-white`}>jr</span>
    )
  }

  // Fallback: first two letters, neutral color
  return (
    <span className={`${baseClasses} bg-muted text-foreground/80`}>
      {name.slice(0, 2)}
    </span>
  )
}

function getStatusLabel(status?: WebsiteStatus) {
  if (!status) return "Unknown"
  const normalized = status.toString().toLowerCase()
  if (normalized === "active") return "Active"
  if (normalized === "paused") return "Paused"
  return status
}

function getStatusClassName(status?: WebsiteStatus) {
  const normalized = status?.toString().toLowerCase()
  if (normalized === "active") return "text-emerald-500"
  if (normalized === "paused") return "text-muted-foreground"
  return "text-muted-foreground"
}

function formatInterval(minutes?: number) {
  if (!minutes || minutes <= 0) return "Custom interval"
  if (minutes % 60 === 0) {
    const hours = minutes / 60
    return `${hours}h interval`
  }
  return `${minutes}m interval`
}

export function WebsiteCard({ website, onEditWebsite }: WebsiteCardProps) {
  const { deleteWebsite, deleteWebsiteLoading } = useWebsitesActions()
  const urlsCount = website.urls?.length ?? 0

  const handleDelete = () => {
    deleteWebsite(
      {},
      {
        onSuccess: () => {
          toast.success("Website deleted successfully")
        },
      }
    )
  }

  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border bg-card p-4 transition-colors hover:border-primary/30">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {getPlatformBadge(website.name)}
            <h2 className="text-md leading-tight font-semibold">
              {website.name}
            </h2>
            <div className="text-right text-[11px] text-muted-foreground">
              <span className={getStatusClassName("active")}>
                {getStatusLabel(
                  website.enabled ? ("active" as WebsiteStatus) : "paused"
                )}
              </span>
            </div>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {formatInterval(website.scrapeIntervalMinutes)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <WebsiteUrlsDialog website={website} />
        </div>
      </header>

      <dl className="mt-4 flex items-end justify-between text-xs">
        <div>
          <dt className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Tracked
          </dt>
          <dd className="text-sm font-semibold">
            {urlsCount} URL{urlsCount === 1 ? "" : "s"}
          </dd>
        </div>

        <div className="flex items-center gap-1 transition-opacity group-hover:opacity-100 sm:opacity-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 hover:text-destructive"
            aria-label={`Delete ${website.name}`}
            onClick={handleDelete}
            disabled={deleteWebsiteLoading}
          >
            <Trash2 className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 hover:text-blue-600"
            aria-label={`Edit ${website.name}`}
            onClick={() => onEditWebsite?.(website)}
          >
            <Pencil className="size-3.5" />
          </Button>
        </div>
      </dl>
    </article>
  )
}
