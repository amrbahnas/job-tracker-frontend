"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Code, Info, Sparkles } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { useExtractSelectors } from "../_api/mutations"
import { useTranslations } from "next-intl"

export type ExtractedSelectors = {
  jobCard?: string
  title?: string
  company?: string
  location?: string
  link?: string
  description?: string
  salary?: string
  date?: string
}

type AutofillWithAiDialogProps = {
  onSelectorsExtracted: (selectors: ExtractedSelectors) => void
}

export function AutofillWithAiDialog({
  onSelectorsExtracted,
}: AutofillWithAiDialogProps) {
  const [open, setOpen] = useState(false)
  const [cardHtml, setCardHtml] = useState("")

  const { extractSelectors, extractSelectorsLoading } = useExtractSelectors()
  const t = useTranslations("websites.autofill")

  const handleExtract = useCallback(() => {
    const trimmed = cardHtml?.trim()
    if (!trimmed) return
    extractSelectors(
      { cardHtml: trimmed },
      {
        onSuccess: (res) => {
          const data = res?.data ?? res
          if (data && typeof data === "object") {
            onSelectorsExtracted({
              jobCard: data.jobCard ?? "",
              title: data.title ?? "",
              company: data.company ?? "",
              location: data.location ?? "",
              link: data.link ?? "",
              description: data.description ?? "",
              salary: data.salary ?? "",
              date: data.date ?? "",
            })
            setCardHtml("")
            setOpen(false)
            toast.success(t("toastExtracted"))
          }
        },
      }
    )
  }, [cardHtml, extractSelectors, onSelectorsExtracted])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="cursor-pointer border border-primary/20 bg-primary/10 text-primary dark:text-primary-foreground"
        >
          <Sparkles className="size-4" />
          {t("button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="size-5" aria-hidden />
            {t("title")}
          </DialogTitle>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            "flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-foreground"
          )}
        >
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p className="text-muted-foreground">
            {t("info")}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="autofill-html">{t("htmlLabel")}</Label>
          <textarea
            id="autofill-html"
            value={cardHtml}
            onChange={(e) => setCardHtml(e.target.value)}
            placeholder={t("htmlPlaceholder")}
            className="min-h-[160px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            disabled={extractSelectorsLoading}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={extractSelectorsLoading}
            >
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleExtract}
            disabled={!cardHtml?.trim() || extractSelectorsLoading}
          >
            <Sparkles className="size-4" aria-hidden />
            {t("extract")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
