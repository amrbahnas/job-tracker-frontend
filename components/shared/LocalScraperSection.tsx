"use client"

import { Copy, Download, Key, Laptop } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const DOWNLOAD_PATH = "/downloads/dawarly-scraper-setup.exe"

export type LocalScraperSectionProps = {
  token: string
  loading: boolean
  onGetToken: () => void
  onCopyToken: () => void
  /** Show the main header (title + description). Set false when embedded in onboarding. */
  showHeader?: boolean
  /** Optional class for the root element */
  className?: string
}

export default function LocalScraperSection({
  token,
  loading,
  onGetToken,
  onCopyToken,
  showHeader = true,
  className,
}: LocalScraperSectionProps) {
  const t = useTranslations("scrapeLocally")

  return (
    <div className={className ? `space-y-8 ${className}` : "space-y-8"}>
      {showHeader && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("header.title")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("header.description")}
          </p>
        </div>
      )}

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Key className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t("token.title")}
          </h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("token.description")}
        </p>
        <div className="mt-4 space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={onGetToken}
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
                onClick={onCopyToken}
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
          <h3 className="text-lg font-semibold text-foreground">
            {t("download.title")}
          </h3>
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
    </div>
  )
}
