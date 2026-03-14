import { useIsFetching, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export const useRefetch = (query: string | string[]) => {
  const queryClient = useQueryClient()
  const queryKey = Array.isArray(query) ? query : [query]
  const t = useTranslations("common")
  return {
    refetch: () =>
      queryClient.invalidateQueries({ queryKey }).then(() => {
        toast.success(t("refetchedSuccessfully"))
      }),
    loading: Boolean(useIsFetching({ queryKey })),
  }
}
