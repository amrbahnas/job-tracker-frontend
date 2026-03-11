import useQuery from "@/api_config/useQuery"

export const useGetProfile = () => {
  return useQuery<{ fullName?: string; email?: string }>("/profile")
}
