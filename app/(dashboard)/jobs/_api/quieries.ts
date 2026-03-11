import useInfiniteQuery from "@/api_config/useInfiniteQuery"

export const useGetJobs = ({ params }: { params: any }) => {
  return useInfiniteQuery<Job[]>("/jobs", {
    params,
  })
}
