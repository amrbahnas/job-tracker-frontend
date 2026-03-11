"use client"

import {
  Archive,
  Building2,
  Check,
  ExternalLink,
  Link2,
  MapPin,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useJobActions } from "../_api/mutations"
import { toast } from "sonner"

type JobCardProps = {
  job: Job
  refetch: () => void
}

function getStatusStyles(status: Job["status"]) {
  switch (status) {
    case "new":
      return "bg-primary/10 text-primary dark:bg-primary/40 dark:text-white"
    case "applied":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
    case "archived":
      return "bg-[#E8EAEF] text-[#6B7280] dark:bg-slate-700/50 dark:text-slate-300"
    default:
      return "bg-muted text-foreground"
  }
}

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return ""

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function formatScrapedTime(createdAt: string) {
  const createdDate = new Date(createdAt)
  if (Number.isNaN(createdDate.getTime())) return "Recently scraped"

  const diffMs = Date.now() - createdDate.getTime()
  if (diffMs <= 0) return "Scraped just now"

  const diffMinutes = Math.round(diffMs / 60000)

  if (diffMinutes < 60) {
    return `Scraped ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`
  }

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) {
    return `Scraped ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
  }

  const diffDays = Math.round(diffHours / 24)
  return `Scraped ${diffDays} day${diffDays === 1 ? "" : "s"} ago`
}

export function JobCard({ job, refetch }: JobCardProps) {
  const { updateJobStatus, isUpdatingJobStatus, deleteJob, isDeletingJob } =
    useJobActions({
      id: job._id,
    })

  const isArchived = job.status === "archived"
  const isApplied = job.status === "applied"
  const isNew = job.status === "new"

  const statusClassName = getStatusStyles(job.status)
  const createdShortDate = formatShortDate(job.createdAt)
  const scrapedTimeLabel = formatScrapedTime(job.createdAt)

  const isMutating = isUpdatingJobStatus || isDeletingJob

  const updateStatus = (
    nextStatus: Job["status"],
    allowedStatuses: Job["status"][]
  ) => {
    if (!allowedStatuses.includes(job.status)) return

    updateJobStatus(
      { status: nextStatus },
      {
        onSuccess: () => {
          refetch()
          toast.success(`Job status updated to ${nextStatus} successfully`)
        },
      }
    )
  }

  const handleArchive = () => {
    updateStatus("archived", ["new", "applied"])
  }

  const handleRestore = () => {
    updateStatus("new", ["archived"])
  }

  const handleMarkUnapplied = () => {
    updateStatus("new", ["applied"])
  }

  const handleMarkApplied = () => {
    updateStatus("applied", ["new"])
  }

  const handleDelete = () => {
    const confirmed =
      typeof window === "undefined"
        ? true
        : window.confirm("Are you sure you want to delete this job?")

    if (!confirmed) return

    deleteJob(undefined, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  const cardBgClass = isArchived
    ? "bg-[#F8F9FB] dark:bg-slate-900/40"
    : isApplied
      ? "bg-white dark:bg-slate-900/60"
      : "bg-card/60"

  const cardStateClasses = isArchived
    ? "  border-slate-200/80 opacity-70 hover:border-slate-300 dark:border-slate-700"
    : "hover:border-primary/40 hover:shadow-md"

  const renderFooterMessage = () => {
    if (isArchived) {
      return (
        <p className="text-[11px] text-[#9CA3AF] dark:text-slate-500">
          Moved to archive
          {createdShortDate && <> on {createdShortDate}</>}
        </p>
      )
    }

    if (isApplied) {
      return (
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <Check className="size-3.5 shrink-0" aria-hidden="true" />
          Application submitted
          {createdShortDate && <> on {createdShortDate}</>}
        </p>
      )
    }

    return (
      <>
        {job.scrapedFrom && (
          <a
            href={job.scrapedFrom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <span>View Scraped Page</span>
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
        {job.salary && (
          <p className="text-[11px] text-muted-foreground sm:text-xs md:text-sm">
            {job.salary}
          </p>
        )}
      </>
    )
  }

  const renderActionsByStatus = () => {
    if (isArchived) {
      return (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 rounded-md border-[#D1D5DB] bg-[#E5E7EB] px-3 text-[#4B5563] hover:bg-[#D1D5DB] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          disabled={isMutating}
          onClick={handleRestore}
        >
          Restore
        </Button>
      )
    }

    if (isApplied) {
      return (
        <>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Archive job"
            disabled={isMutating}
            onClick={handleArchive}
          >
            <Archive className="size-3.5 text-[#6B7280] dark:text-slate-400" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 rounded-md border-blue-200 bg-blue-50 px-3 text-gray-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/60"
            disabled={isMutating}
            onClick={handleMarkUnapplied}
          >
            Mark Unapplied
          </Button>
        </>
      )
    }

    if (isNew) {
      return (
        <>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Archive job"
            disabled={isMutating}
            onClick={handleArchive}
          >
            <Archive className="size-3.5 text-[#6B7280] dark:text-slate-400" />
          </Button>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button
              onClick={handleMarkApplied}
              size="sm"
              className="text-xs sm:text-sm"
              disabled={isMutating}
            >
              Apply Now
            </Button>
          </a>
        </>
      )
    }

    // Fallback for any unexpected status
    return null
  }

  return (
    <article
      className={`flex h-52 gap-3 rounded-xl border p-4 shadow-sm transition ${cardBgClass} ${cardStateClasses}`}
      aria-label={`${job.title} at ${job.company}`}
    >
      {/* <div className="flex items-start">
        <input
          type="checkbox"
          aria-label="Select job"
          className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-muted-foreground/40 text-primary ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        />
      </div> */}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-sm leading-tight font-semibold text-foreground sm:text-base">
                {job.title}
              </h2>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase ${statusClassName}`}
              >
                {job.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280] dark:text-slate-400">
              <div className="inline-flex items-center gap-1">
                <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="font-medium text-foreground dark:text-slate-200">
                  {job.company}
                </span>
              </div>

              {job.location && (
                <div className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{job.location}</span>
                </div>
              )}

              {job.website && (
                <div className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Link2 className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{job.website.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-right text-[11px] text-[#9CA3AF] dark:text-slate-400">
            <span>{scrapedTimeLabel}</span>
          </div>
        </header>

        <p className="line-clamp-2 flex-1 text-xs text-[#6B7280] sm:text-sm dark:text-slate-400">
          {job.description ? job.description : "No description available"}
        </p>

        <footer
          className={`flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm ${isArchived || isApplied ? "pt-3" : "mt-1 pt-1"}`}
        >
          <div className="flex flex-col gap-1">{renderFooterMessage()}</div>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label="Delete job"
              disabled={isMutating}
              onClick={handleDelete}
              className="text-[#6B7280] hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
            >
              <Trash2 className="size-3.5" />
            </Button>
            {renderActionsByStatus()}
          </div>
        </footer>
      </div>
    </article>
  )
}
