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
import { useTranslations } from "next-intl"

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
  const t = useTranslations("jobs.applyDialog")

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
            {t("button")}
          </Button>
        </a>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              {t("notYet")}
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
            {t("yesApplied")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
