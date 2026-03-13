"use client"

import {
  Archive,
  Building2,
  Check,
  Clock,
  ExternalLink,
  Link2,
  MapPin,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DangerConfirmButton } from "@/components/common/DangerConfirmButton"
import { useJobActions } from "../_api/mutations"
import { toast } from "sonner"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
type JobCardProps = {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { updateJobStatus, isUpdatingJobStatus, deleteJob, isDeletingJob } =
    useJobActions({
      id: job._id,
    })

  const isArchived = job.status === "archived"
  const isApplied = job.status === "applied"
  const isNew = job.status === "new"

  const statusClassName = getStatusStyles(job.status)

  const isMutating = isUpdatingJobStatus || isDeletingJob

  const updateStatus = (nextStatus: Job["status"]) => {
    updateJobStatus(
      { status: nextStatus },
      {
        onSuccess: () => {
          toast.success(`Job status updated to ${nextStatus} successfully`)
        },
      }
    )
  }

  const handleDelete = () => {
    deleteJob(undefined, {
      onSuccess: () => {
        toast.success(`Job deleted successfully`)
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
          Moved to archive on {dayjs(job.createdAt).format("MMM D, YYYY")}
        </p>
      )
    }

    if (isApplied) {
      return (
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <Check className="size-3.5 shrink-0" aria-hidden="true" />
          submitted on {dayjs(job.createdAt).format("MMM D, YYYY")}
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
            className="flex items-start gap-1 text-xs text-foreground/50 hover:underline"
          >
            <span>View Scraped Page</span>
            <ExternalLink className="size-3" aria-hidden="true" />
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
          onClick={() => updateStatus("new")}
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
            onClick={() => updateStatus("archived")}
          >
            <Archive className="size-3.5 text-[#6B7280] dark:text-slate-400" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 rounded-md border-blue-200 bg-blue-50 px-3 text-gray-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-900/60"
            disabled={isMutating}
            onClick={() => updateStatus("new")}
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
            onClick={() => updateStatus("archived")}
          >
            <Archive className="size-3.5 text-[#6B7280] dark:text-slate-400" />
          </Button>
          <Button
            size="sm"
            className="text-xs sm:text-sm"
            disabled={isMutating}
            asChild
          >
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              Apply Now
            </a>
          </Button>
        </>
      )
    }

    // Fallback for any unexpected status
    return null
  }

  return (
    <article
      className={`flex h-full gap-3 rounded-xl border p-4 shadow-sm transition ${cardBgClass} ${cardStateClasses}`}
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <header className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-[75%]"
            >
              <h2 className="truncate text-sm leading-tight font-semibold text-foreground hover:underline sm:text-base">
                {job.title}
              </h2>
            </a>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase ${statusClassName}`}
            >
              {job.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280] dark:text-slate-400">
            <div className="inline-flex max-w-[40%] items-center gap-1 truncate">
              <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate font-medium">{job.company}</span>
            </div>

            {job.location && (
              <div className="inline-flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{job.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{job.datePosted ?? dayjs(job.createdAt).fromNow()}</span>
            </div>

            {job.website && (
              <div className="inline-flex max-w-[30%] items-center gap-1 truncate text-blue-600 dark:text-blue-400">
                <Link2 className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{job.website.name}</span>
              </div>
            )}
          </div>
        </header>

        <p className="mt-2 line-clamp-2 flex-1 text-xs text-[#6B7280] sm:text-sm dark:text-slate-400">
          {job.description ? job.description : "No description available"}
        </p>

        <footer
          className={`flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs sm:text-sm ${isArchived || isApplied ? "pt-3" : "mt-1 pt-1"}`}
        >
          <div className="flex flex-col gap-1">{renderFooterMessage()}</div>

          <div className="ml-auto flex items-center gap-1.5">
            <DangerConfirmButton
              aria-label="Delete job"
              disabled={isMutating}
              onConfirm={handleDelete}
              size="icon-sm"
              variant="ghost"
              className="text-[#6B7280] hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
              title="Delete job?"
              description="This will permanently remove this job from your list."
              confirmText="Delete"
              cancelText="Cancel"
            >
              <Trash2 className="size-3.5" />
            </DangerConfirmButton>
            {renderActionsByStatus()}
          </div>
        </footer>
      </div>
    </article>
  )
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
