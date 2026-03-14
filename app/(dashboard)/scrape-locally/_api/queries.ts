import useQuery from "@/api_config/useQuery"
import SCRAPE_LOCALLY_KEYS from "./keys"

export type TokenForDesktopResponse = { token: string }

export const useGetTokenForDesktop = () => {
  return useQuery<TokenForDesktopResponse>(SCRAPE_LOCALLY_KEYS.tokenForDesktop, {
    skip: true,
    refetchOnWindowFocus: false,
  })
}
