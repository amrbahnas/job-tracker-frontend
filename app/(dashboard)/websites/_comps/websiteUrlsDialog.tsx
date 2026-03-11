"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WebsiteUrlsEditor } from "./websiteUrlsEditor"
import { useUpdateWebsiteUrls } from "../_api/mutations"
import { Link2 } from "lucide-react"

type WebsiteUrlsDialogProps = {
  website: Website
  onSuccess?: () => void
}

export function WebsiteUrlsDialog({
  website,
  onSuccess,
}: WebsiteUrlsDialogProps) {
  const [urlsDialogOpen, setUrlsDialogOpen] = useState(false)
  const [urls, setUrls] = useState<string[]>(website.urls)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { mutate, loading } = useUpdateWebsiteUrls(website._id)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const cleanedUrls = urls.map((u) => u.trim()).filter(Boolean)
    if (!cleanedUrls.length) {
      setErrorMessage("Add at least one target URL.")
      return
    }

    mutate(
      { urls: cleanedUrls },
      {
        onSuccess: () => {
          onSuccess?.()
          setUrlsDialogOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={urlsDialogOpen} onOpenChange={setUrlsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 px-2 text-[11px]"
          onClick={() => setUrlsDialogOpen(true)}
        >
          <Link2 className="mr-1 size-3" />
          Manage URLs
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Manage target URLs</DialogTitle>
          </DialogHeader>

          <WebsiteUrlsEditor
            urls={urls}
            onChange={(next) => {
              setUrls(next)
              if (errorMessage) setErrorMessage(undefined)
            }}
            errorMessage={errorMessage}
          />

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUrlsDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={loading}>
              Save URLs
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WebsiteUrlsDialog
