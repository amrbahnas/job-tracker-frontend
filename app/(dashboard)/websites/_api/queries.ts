import useInfiniteQuery from "@/api_config/useInfiniteQuery"
import WEBSITES_KEYS from "./keys"

export const useGetWebsites = () => {
  return useInfiniteQuery<Website[]>(WEBSITES_KEYS.getWebsites)
}
