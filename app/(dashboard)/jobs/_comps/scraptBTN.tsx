import { Button } from "@/components/ui/button"
import { useJobActions } from "../_api/mutations"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { useQueryState } from "nuqs"

const ScrapeBTN = () => {
  const [websiteId] = useQueryState("websiteId")
  const { scrapeJobs, isScrapingJobs } = useJobActions()
  const t = useTranslations("jobs.scrape")

  return (
    <Button
      onClick={() =>
        scrapeJobs(
          {
            websiteId,
          },
          {
            onSuccess: (res) => {
              toast.success(t("toastTitle"), {
                description: t("toastDescription"),
                duration: Infinity,
                action: {
                  label: t("toastAction"),
                  onClick: () => {
                    toast.dismiss()
                  },
                },
              })
            },
          }
        )
      }
      loading={isScrapingJobs}
      disabled={isScrapingJobs}
      variant={"outline"}
      size={"lg"}
    >
      {websiteId ? t("scrapeSelectedWebsite") : t("button")}
    </Button>
  )
}

export default memo(ScrapeBTN)
