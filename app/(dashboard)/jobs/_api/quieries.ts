import useInfiniteQuery from "@/api_config/useInfiniteQuery"
import JOBS_KEYS from "./keys"

export const useGetJobs = ({ params }: { params: any }) => {
  return useInfiniteQuery<Job[]>(JOBS_KEYS.getJobs, {
    params,
  })
}
