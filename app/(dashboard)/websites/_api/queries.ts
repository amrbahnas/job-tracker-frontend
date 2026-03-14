import useInfiniteQuery from "@/api_config/useInfiniteQuery"
import useQuery from "@/api_config/useQuery"
import WEBSITES_KEYS from "./keys"

export const useGetWebsites = () => {
  return useInfiniteQuery<Website[]>(WEBSITES_KEYS.getWebsites, {
    staleTime: 60 * 60 * 60 * 10000, // 10 days
  })
}

export const useGetWebsiteUrls = (websiteId: string | null) => {
  return useQuery<Website>(`website-urls/${websiteId ?? ""}`, {
    skip: !websiteId,
  })
}
