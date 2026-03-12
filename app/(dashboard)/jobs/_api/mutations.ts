import useMutation from "@/api_config/useMutation"
import JOBS_KEYS from "./keys"

export const useJobActions = ({ id }: { id?: string } = {}) => {
  const { mutate: updateJobStatus, isPending: isUpdatingJobStatus } =
    useMutation(`/jobs/${id}/status`, {
      method: "patch",
      invalidateQueries: [JOBS_KEYS.getJobs],
    })
  const { mutate: deleteJob, isPending: isDeletingJob } = useMutation(
    `/jobs/${id}`,
    {
      method: "delete",
      invalidateQueries: [JOBS_KEYS.getJobs],
    }
  )
  const { mutate: scrapeJobs, isPending: isScrapingJobs } = useMutation(
    `/jobs/scrape`,
    {
      invalidateQueries: [JOBS_KEYS.getJobs],
    }
  )

  return {
    updateJobStatus,
    deleteJob,
    isUpdatingJobStatus,
    isDeletingJob,
    scrapeJobs,
    isScrapingJobs,
  }
}
