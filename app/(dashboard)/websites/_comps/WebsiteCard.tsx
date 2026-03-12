"use client"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import getPlatformBadge from "@/utilies/getPlatformBadge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Clock, History, Link, SquarePenIcon, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { DangerConfirmButton } from "@/components/common/DangerConfirmButton"
import { useWebsitesActions } from "../_api/mutations"
import { WebsiteUrlsDialog } from "./websiteUrlsDialog"
dayjs.extend(relativeTime)

type WebsiteCardProps = {
  website: Website
  onEditWebsite?: (website: Website) => void
  refetch?: () => void
}

function formatInterval(minutes?: number) {
  if (!minutes || minutes <= 0) return "Custom interval"
  if (minutes % 60 === 0) {
    const hours = minutes / 60
    return `${hours}h `
  }
  return `${minutes}m`
}

export function WebsiteCard({ website, onEditWebsite }: WebsiteCardProps) {
  const { deleteWebsite, deleteWebsiteLoading } = useWebsitesActions()
  const urlsCount = website.urls?.length ?? 0
  const CardBody = [
    {
      icon: History,
      label: "last scraped:",
      value: dayjs(website.lastScrapedAt).fromNow(),
    },
    {
      icon: Clock,
      label: "Interval:",
      value: formatInterval(website.scrapeIntervalMinutes),
    },
    {
      icon: Link,
      label: "Tracked:",
      value: urlsCount,
      extra: urlsCount === 1 ? "URL" : "URLs",
    },
  ]

  const handleDelete = () => {
    deleteWebsite(
      {},
      {
        onSuccess: () => {
          toast.success("Website deleted successfully")
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
                <span className="ml-1 font-medium text-foreground">
                  {item.value}
                  {item.extra && (
                    <span className="ml-1 text-[10px]">{item.extra}</span>
                  )}
                </span>
              </dd>
            </dt>
          ))}
        </dl>
      </header>

      <section className="flex items-center justify-between gap-2 border-t py-4 text-xs">
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
            title="Delete website?"
            description={`This will permanently remove ${website.name} and its tracked URLs.`}
            confirmText="Delete"
            cancelText="Cancel"
          >
            <Trash2 className="size-3.5" />
          </DangerConfirmButton>
        </div>
      </section>
    </article>
  )
}

const WebsiteStatusBadge = ({ website }: { website: Website }) => {
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
        {website.enabled ? "ACTIVE" : "PAUSED"}
      </span>
    </span>
  )
}
