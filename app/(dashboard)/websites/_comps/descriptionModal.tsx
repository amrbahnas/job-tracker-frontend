"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGenerateAndCreateWebsites } from "../_api/mutations"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function DescriptionModal() {
  const [showDescriptionModal, setShowDescriptionModal] = useState(true)
  const t = useTranslations("websites.generateUrls")
  const [description, setDescription] = useState("")
  const { generateAndCreate, loading } = useGenerateAndCreateWebsites()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = description.trim()
    if (!trimmed) return
    generateAndCreate({ description: trimmed }, {
      onSuccess: () => {
        setDescription("")
        setShowDescriptionModal(false)
        toast.success("Websites generated successfully")
      },
    } as any)
  }

  return (
    <Dialog open={showDescriptionModal} onOpenChange={setShowDescriptionModal}>
      <DialogContent className="sm:max-w-lg" showCloseButton={!loading}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden />
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div
            className="flex flex-col items-center justify-center gap-6 py-10"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2
              className="h-12 w-12 animate-spin text-primary"
              aria-hidden
            />
            <div className="space-y-1 text-center">
              <p className="font-medium text-foreground">
                {t("generatingTitle")}
              </p>
              <p className="max-w-[280px] text-sm text-muted-foreground">
                {t("generatingDescription")}
              </p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60"
                  )}
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("placeholder")}
              className={cn(
                "min-h-[120px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              )}
              disabled={loading}
              autoFocus
              aria-label={t("placeholder")}
            />
            <DialogFooter className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDescriptionModal(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={!description.trim()}>
                {t("submit")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
