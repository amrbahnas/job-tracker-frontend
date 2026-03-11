import useInfiniteQuery from "@/api_config/useInfiniteQuery"

export const useGetWebsites = () => {
  return useInfiniteQuery<Website[]>("/websites")
}
