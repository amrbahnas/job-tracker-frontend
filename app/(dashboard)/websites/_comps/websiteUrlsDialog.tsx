"use client"

import WebsiteSelector from "@/components/selectors/WebsiteSelector"
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

import getPlatformBadge from "@/utilies/getPlatformBadge"
import { Link2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useWebsitesActions } from "../_api/mutations"
import { useGetWebsiteUrls } from "../_api/queries"

type WebsiteUrlsDialogProps = {
  /** When provided, dialog edits this website (with trigger). When undefined, dialog is controlled and shows website selector first. */
  website?: Website | null
}

/** Holds urls state; keyed by website so state resets when website changes without using an effect. */
function WebsiteUrlsForm({
  website,
  onClose,
  onSuccess,
}: {
  website: Website | null
  onClose: () => void
  onSuccess: () => void
}) {
  const t = useTranslations("websites.urlsDialog")
  const [urls, setUrls] = useState<string[]>(website?.urls ?? [])
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const { updateUrls, updateUrlsLoading } = useWebsitesActions(website?._id)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const cleanedUrls = urls.map((u) => u.trim()).filter(Boolean)
    if (!cleanedUrls.length) {
      setErrorMessage(t("validationAddOneUrl"))
      return
    }
    if (!website?._id) return

    updateUrls(
      { urls: cleanedUrls },
      {
        onSuccess: () => {
          toast.success(t("toastUpdated"))
          onSuccess()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {website && (
        <>
          <label className="mb-4 block text-sm font-medium">
            {t("titleSuffix")}
          </label>
          <WebsiteUrlsEditor
            urls={urls}
            onChange={(next) => {
              setUrls(next)
              if (errorMessage) setErrorMessage(undefined)
            }}
            errorMessage={errorMessage}
          />
          <DialogDescription>{t("description")}</DialogDescription>
        </>
      )}

      <DialogFooter className="mt-12 py-6">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          disabled={updateUrlsLoading}
        >
          {t("cancel")}
        </Button>

        <Button
          type="submit"
          size="sm"
          disabled={updateUrlsLoading || !website?._id}
          loading={updateUrlsLoading}
        >
          {t("save")}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function WebsiteUrlsDialog({
  website: websiteProp,
}: WebsiteUrlsDialogProps) {
  const t = useTranslations("websites.urlsDialog")
  const [urlsDialogOpen, setUrlsDialogOpen] = useState(false)
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string | null>(
    null
  )
  const { data: fetchedWebsite, loading: loadingUrls } =
    useGetWebsiteUrls(selectedWebsiteId)

  const website = websiteProp ?? fetchedWebsite ?? null

  const handleClose = () => {
    setSelectedWebsiteId(null)
    setUrlsDialogOpen(false)
  }

  return (
    <Dialog
      open={urlsDialogOpen}
      onOpenChange={(value) =>
        value ? setUrlsDialogOpen(true) : handleClose()
      }
    >
      {websiteProp ? (
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="px-2 text-[11px]"
            onClick={() => setUrlsDialogOpen(true)}
          >
            <Link2 className="me-1 size-3" />
            {t("button")}
          </Button>
        </DialogTrigger>
      ) : (
        <Button type="button" size="sm" onClick={() => setUrlsDialogOpen(true)}>
          {t("addUrl")}
        </Button>
      )}
      <DialogContent className="gap-0 py-0 sm:max-w-xl">
        <DialogHeader className="h-fit py-6">
          <DialogTitle className="text-md flex items-center gap-1 leading-tight font-semibold">
            {!websiteProp ? (
              <span className="flex items-center gap-1 text-2xl">
                {t("addUrl")}
              </span>
            ) : (
              <>
                {website && getPlatformBadge(website.name, 8)}
                <span className="capitalize">{website?.name}</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <section className="min-h-34">
          {!websiteProp && (
            <section className="mb-6">
              <label className="mb-4 block text-sm font-medium">
                {t("selectWebsite")}
              </label>
              <WebsiteSelector
                value={selectedWebsiteId}
                onChange={setSelectedWebsiteId}
                allowAll={false}
              />
            </section>
          )}

          {website && (
            <WebsiteUrlsForm
              key={website._id}
              website={website}
              onClose={handleClose}
              onSuccess={handleClose}
            />
          )}

          {loadingUrls && (
            <div className="h-40">
              <p className="mx-auto py-6 text-sm text-muted-foreground">
                {t("loading")}
              </p>
            </div>
          )}
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default WebsiteUrlsDialog
