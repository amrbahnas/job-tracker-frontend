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
              const { message, newJobsCount } = res.data
              toast.success(message, {
                description: newJobsCount
                  ? `${newJobsCount} new jobs found`
                  : "No new jobs found",
              })
            },
            onError: (err) => {
              toast.error(err.response?.data.message)
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
