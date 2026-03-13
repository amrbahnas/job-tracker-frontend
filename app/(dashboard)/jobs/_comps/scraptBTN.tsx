import { Button } from "@/components/ui/button"
import { useJobActions } from "../_api/mutations"
import { toast } from "sonner"

const ScrapeBTN = () => {
  const { scrapeJobs, isScrapingJobs } = useJobActions()

  return (
    <Button
      onClick={() =>
        scrapeJobs(
          {},
          {
            onSuccess: (res) => {
              toast.success("Scraping started", {
                description: "You will be notified when it completes.",
                duration: Infinity,
                action: {
                  label: "Close",
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
      Scrape Now
    </Button>
  )
}

export default ScrapeBTN
