"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

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
            className="h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder="https://example.com/jobs..."
            value={url}
            onChange={(event) => handleChange(index, event.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="shrink-0 rounded-lg bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => handleRemove(index)}
            aria-label="Remove URL"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:bg-muted/30 hover:text-foreground"
      >
        <Plus className="size-4" />
        Add URL
      </button>
      {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
      <p className="text-xs text-muted-foreground">
        These pages will be scraped on the configured interval.
      </p>
    </div>
  )
}

export default WebsiteUrlsEditor

