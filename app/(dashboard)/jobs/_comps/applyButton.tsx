"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

type ApplyButtonProps = {
  jobLink?: string | null
  disabled?: boolean
  onConfirmApplied: () => void
}

export function ApplyButton({
  jobLink,
  disabled,
  onConfirmApplied,
}: ApplyButtonProps) {
  const [open, setOpen] = React.useState(false)

  if (!jobLink) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a href={jobLink} target="_blank" rel="noopener noreferrer">
          <Button
            type="button"
            size="sm"
            className="text-xs sm:text-sm"
            disabled={disabled}
            onClick={() => setOpen(true)}
          >
            Apply Now
          </Button>
        </a>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Have you applied to this job?</DialogTitle>
          <DialogDescription>
            After you finish your application on the job page, let us know so we
            can update this job&apos;s status.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Not yet
            </Button>
          </DialogClose>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              onConfirmApplied()
              setOpen(false)
            }}
          >
            Yes, I applied
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
