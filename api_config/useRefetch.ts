import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useRefetch = (query: string | string[]) => {
  const queryClient = useQueryClient()
  const queryKey = Array.isArray(query) ? query : [query]
  return {
    refetch: () =>
      queryClient.invalidateQueries({ queryKey }).then(() => {
        toast.success("Refetched successfully")
      }),
    loading: Boolean(useIsFetching({ queryKey })),
  }
}
