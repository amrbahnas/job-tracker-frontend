"use client"

import { Copy, Download, Key, Laptop } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useGetTokenForDesktop } from "../_api/queries"
import Container from "@/components/ui/container"

const DOWNLOAD_PATH = "/downloads/dawarly-scraper-setup.exe"

export default function ScrapeLocallyView() {
  const t = useTranslations("scrapeLocally")
  const { data, loading, refetch } = useGetTokenForDesktop()
  const token = data?.token ?? ""

  const handleGetToken = () => {
    refetch().then((result) => {
      const tkn = result.data?.token
      if (tkn) {
        navigator.clipboard.writeText(tkn).then(() => {
          toast.success(t("token.toastCopied"))
        })
      }
    })
  }

  const copyToken = async () => {
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      toast.success(t("token.toastCopied"))
    } catch {
      toast.error(t("token.toastCopyError"))
    }
  }

  return (
    <Container className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("header.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("header.description")}
        </p>
      </div>

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Key className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {t("token.title")}
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("token.description")}
        </p>
        <div className="mt-4 space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleGetToken}
            disabled={loading}
            loading={loading}
          >
            {t("token.getButton")}
          </Button>
          {token ? (
            <div className="flex max-w-xl gap-2">
              <Input readOnly value={token} className="font-mono text-sm" />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={copyToken}
                title={t("token.copyTitle")}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Laptop className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {t("download.title")}
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("download.description")}
        </p>
        <div className="mt-4">
          <a href={DOWNLOAD_PATH} download className="inline-flex">
            <Button type="button" variant="default" asChild>
              <span className="flex items-center gap-2">
                <Download className="size-4" />
                {t("download.button")}
              </span>
            </Button>
          </a>
        </div>
      </section>
    </Container>
  )
}
