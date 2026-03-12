"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { WebsiteUrlsEditor } from "./websiteUrlsEditor"

import { Link2 } from "lucide-react"
import { toast } from "sonner"
import { useWebsitesActions } from "../_api/mutations"
import getPlatformBadge from "@/utilies/getPlatformBadge"

type WebsiteUrlsDialogProps = {
  website: Website
}

export function WebsiteUrlsDialog({ website }: WebsiteUrlsDialogProps) {
  const [urlsDialogOpen, setUrlsDialogOpen] = useState(false)
  const [urls, setUrls] = useState<string[]>(website.urls)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { updateUrls, updateUrlsLoading } = useWebsitesActions(website._id)

  const handleClose = () => {
    setUrlsDialogOpen(false)
    setUrls(website.urls)
    setErrorMessage(undefined)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const cleanedUrls = urls.map((u) => u.trim()).filter(Boolean)
    if (!cleanedUrls.length) {
      setErrorMessage("Add at least one target URL.")
      return
    }

    updateUrls(
      { urls: cleanedUrls },
      {
        onSuccess: () => {
          toast.success("Website URLs updated successfully")
          handleClose()
        },
      }
    )
  }

  return (
    <Dialog
      open={urlsDialogOpen}
      onOpenChange={(value) =>
        value ? setUrlsDialogOpen(true) : handleClose()
      }
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="px-2 text-[11px]"
          onClick={() => setUrlsDialogOpen(true)}
        >
          <Link2 className="mr-1 size-3" />
          Manage URLs
        </Button>
      </DialogTrigger>
      <DialogContent className="py-0 sm:max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="py-6">
            <DialogTitle className="text-md flex items-center gap-1 leading-tight font-semibold">
              {getPlatformBadge(website.name, 8)}
              <span className="capitalize">{website.name}</span>
              <span>URLs</span>
            </DialogTitle>
          </DialogHeader>

          <WebsiteUrlsEditor
            urls={urls}
            onChange={(next) => {
              setUrls(next)
              if (errorMessage) setErrorMessage(undefined)
            }}
            errorMessage={errorMessage}
          />
          <DialogDescription>
            These pages will be scraped on the configured interval.
          </DialogDescription>
          <DialogFooter className="mt-12 py-6">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={updateUrlsLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={updateUrlsLoading}
              loading={updateUrlsLoading}
            >
              Save URLs
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WebsiteUrlsDialog
