import { Button } from "@/components/ui/button"
import { useJobActions } from "../_api/mutations"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

const ScrapeBTN = () => {
  const { scrapeJobs, isScrapingJobs } = useJobActions()
  const t = useTranslations("jobs.scrape")

  return (
    <Button
      onClick={() =>
        scrapeJobs(
          {},
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
      {t("button")}
    </Button>
  )
}

export default ScrapeBTN
