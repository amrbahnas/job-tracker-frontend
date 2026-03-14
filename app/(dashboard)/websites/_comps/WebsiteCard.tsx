"use client"

import { Button } from "@/components/ui/button"

import { DangerConfirmButton } from "@/components/common/DangerConfirmButton"
import { cn } from "@/lib/utils"
import getPlatformBadge from "@/utilies/getPlatformBadge"
import dayjs from "dayjs"
import { Clock, History, Link, SquarePenIcon, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useWebsitesActions } from "../_api/mutations"
import { WebsiteUrlsDialog } from "./websiteUrlsDialog"
import { useLocale } from "next-intl"
import formatInterval from "@/utilies/formatInterval"

type WebsiteCardProps = {
  website: Website
  onEditWebsite?: (website: Website) => void
  refetch?: () => void
}

export function WebsiteCard({ website, onEditWebsite }: WebsiteCardProps) {
  const { deleteWebsite, deleteWebsiteLoading } = useWebsitesActions(
    website._id
  )
  const t = useTranslations("websites.card")
  const urlsCount = website.urls?.length ?? 0
  const local = useLocale()
  const CardBody = [
    {
      icon: History,
      label: t("lastScrapedLabel"),
      value: website.lastScrapedAt
        ? dayjs(website.lastScrapedAt).fromNow()
        : t("never"),
    },
    {
      icon: Clock,
      label: t("intervalLabel"),
      value:
        website.scrapeIntervalMinutes && website.scrapeIntervalMinutes > 0
          ? formatInterval(website.scrapeIntervalMinutes, local)
          : t("customInterval"),
    },
    {
      icon: Link,
      label: t("trackedLabel"),
      value: urlsCount,
      extra: urlsCount <= 1 ? t("urlSuffix") : t("urlsSuffix"),
    },
  ]

  const handleDelete = () => {
    deleteWebsite(
      {},
      {
        onSuccess: () => {
          toast.success(t("deletedToast"))
        },
      }
    )
  }

  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border bg-card p-4 transition-colors hover:border-primary/30">
      <header>
        <div className="flex items-start gap-2">
          {getPlatformBadge(website.name, 8)}
          <div className="flex flex-col">
            <h2 className="text-md leading-tight font-semibold capitalize">
              {website.name}
            </h2>
            <WebsiteStatusBadge website={website} />
          </div>
        </div>
        <dl className="my-4 flex flex-col items-start gap-3 text-xs text-muted-foreground">
          {CardBody.map((item) => (
            <dt className="flex items-center gap-2" key={item.label}>
              <item.icon className="size-3.5 shrink-0" aria-hidden="true" />
              <dd>
                {item.label}
                <span className="ms-1 font-medium text-foreground">
                  {item.value}
                  {item.extra && (
                    <span className="ms-1 text-[10px]">{item.extra}</span>
                  )}
                </span>
              </dd>
            </dt>
          ))}
        </dl>
      </header>

      <section
        className="flex items-center justify-between gap-2 border-t py-4 text-xs"
        dir="ltr"
      >
        <WebsiteUrlsDialog website={website} />
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-blue-600"
            aria-label={`Edit ${website.name}`}
            onClick={() => onEditWebsite?.(website)}
          >
            <SquarePenIcon className="size-3.5" />
          </Button>
          <DangerConfirmButton
            aria-label={`Delete ${website.name}`}
            className="size-7 text-muted-foreground hover:text-destructive"
            onConfirm={handleDelete}
            disabled={deleteWebsiteLoading}
            title={t("deleteTitle")}
            description={t("deleteDescription", { name: website.name })}
            confirmText={t("deleteConfirm")}
            cancelText={t("deleteCancel")}
          >
            <Trash2 className="size-3.5" />
          </DangerConfirmButton>
        </div>
      </section>
    </article>
  )
}

const WebsiteStatusBadge = ({ website }: { website: Website }) => {
  const t = useTranslations("websites.card")
  return (
    <span className="flex items-center gap-1 text-[10px] font-medium">
      <span
        className={cn(
          "size-1.5 rounded-full",
          website.enabled ? "bg-emerald-500" : "bg-muted-foreground"
        )}
      />
      <span
        className={cn(
          website.enabled ? "text-emerald-600" : "text-muted-foreground"
        )}
      >
        {website.enabled ? t("statusActive") : t("statusPaused")}
      </span>
    </span>
  )
}
