import { useQueryClient } from "@tanstack/react-query"
import useMutation from "@/api_config/useMutation"

export const useCreateWebsite = () => {
  const queryClient = useQueryClient()

  return useMutation("/websites", {
    method: "post",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/websites"] })
    },
  })
}

export const useUpdateWebsite = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(`/websites/${id}`, {
    method: "put",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/websites"] })
    },
  })
}

export const useDeleteWebsite = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(`/websites/${id}`, {
    method: "delete",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/websites"] })
    },
  })
}

export const useUpdateWebsiteUrls = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(`/website-urls/${id}`, {
    method: "patch",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/websites"] })
    },
  })
}

export const useExtractSelectors = () => {
  return useMutation("/ats/extract-selectors")
}
