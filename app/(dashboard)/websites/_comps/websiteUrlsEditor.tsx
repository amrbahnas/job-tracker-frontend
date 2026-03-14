"use client"

import { Error } from "@/components/common/error"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

type WebsiteUrlsEditorProps = {
  urls: string[]
  onChange: (urls: string[]) => void
  errorMessage?: string
}

export function WebsiteUrlsEditor({
  urls,
  onChange,
  errorMessage,
}: WebsiteUrlsEditorProps) {
  const t = useTranslations("websites.urlsEditor")
  const handleChange = (index: number, value: string) => {
    const next = [...urls]
    next[index] = value
    onChange(next)
  }

  const handleRemove = (index: number) => {
    const next = urls.filter((_, i) => i !== index)
    onChange(next.length > 0 ? next : [""])
  }

  const handleAdd = () => {
    onChange([...urls, ""])
  }

  const safeUrls = urls.length > 0 ? urls : [""]

  return (
    <div className="space-y-3">
      {safeUrls.map((url, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="url"
            dir="ltr"
            className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder={t("inputPlaceholder")}
            value={url}
            onChange={(event) => handleChange(index, event.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="shrink-0 rounded-lg bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => handleRemove(index)}
            aria-label={t("removeAria")}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        disabled={urls.length >= 10}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:bg-muted/30 hover:text-foreground disabled:cursor-not-allowed"
      >
        <Plus className="size-4" />
        {t("addUrl")}
      </button>
      <Error
        error={
          errorMessage || (urls.length >= 10 ? t("maxUrlsError") : undefined)
        }
        hideOkButton
      />
    </div>
  )
}

export default WebsiteUrlsEditor
