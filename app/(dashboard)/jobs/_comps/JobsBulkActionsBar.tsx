"use client"

import { DangerConfirmButton } from "@/components/common/DangerConfirmButton"
import { Button } from "@/components/ui/button"
import { Archive, Check, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useBulkJobActions } from "../_api/mutations"
import { memo } from "react"

type JobsBulkActionsBarProps = {
  selectedIds: string[]
  onClearSelection: () => void
}

function JobsBulkActionsBar({
  selectedIds,
  onClearSelection,
}: JobsBulkActionsBarProps) {
  const tBulk = useTranslations("jobs.bulkActions")
  const { bulkDeleteJobs, bulkUpdateStatus, isBulkMutating } =
    useBulkJobActions()

  const hasSelection = selectedIds.length > 0

  const handleBulkMarkApplied = () => {
    if (!hasSelection) return
    bulkUpdateStatus(
      { ids: selectedIds, status: "applied" },
      {
        onSuccess: () => {
          onClearSelection()
          toast.success(tBulk("markAppliedSuccess"))
        },
      }
    )
  }

  const handleBulkArchive = () => {
    if (!hasSelection) return
    bulkUpdateStatus(
      { ids: selectedIds, status: "archived" },
      {
        onSuccess: () => {
          onClearSelection()
          toast.success(tBulk("archiveSuccess"))
        },
      }
    )
  }

  const handleBulkDelete = () => {
    if (!hasSelection) return
    bulkDeleteJobs(
      { ids: selectedIds },
      {
        onSuccess: () => {
          onClearSelection()
          toast.success(tBulk("deleteSuccess"))
        },
      }
    )
  }

  if (!hasSelection) return null

  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3"
      role="toolbar"
      aria-label={tBulk("ariaLabel")}
    >
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {tBulk("label")}
      </span>
      <div className="flex items-center gap-1 sm:gap-3">
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 rounded-md border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
          disabled={isBulkMutating}
          onClick={handleBulkMarkApplied}
        >
          <Check className="size-3.5" />
          {tBulk("markApplied")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 rounded-md border-[#D1D5DB] bg-white text-[#4B5563] hover:bg-[#E5E7EB] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          disabled={isBulkMutating}
          onClick={handleBulkArchive}
        >
          <Archive className="size-3.5" />
          {tBulk("archive")}
        </Button>
        <DangerConfirmButton
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 rounded-md border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/40"
          disabled={isBulkMutating}
          onConfirm={handleBulkDelete}
          title={tBulk("deleteConfirmTitle")}
          description={tBulk("deleteConfirmDescription")}
          confirmText={tBulk("deleteConfirm")}
          cancelText={tBulk("deleteCancel")}
        >
          <Trash2 className="size-3.5" />
          {tBulk("delete")}
        </DangerConfirmButton>
        <Button
          size="sm"
          variant="ghost"
          className="ms-auto h-8 text-xs text-muted-foreground"
          onClick={onClearSelection}
        >
          {tBulk("clearSelection")}
        </Button>
      </div>
    </div>
  )
}
export default memo(JobsBulkActionsBar)
