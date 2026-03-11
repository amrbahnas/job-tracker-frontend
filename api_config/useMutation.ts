import { useMutation as reactUseMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { toast } from "sonner"
import useAppStore from "@/store/useAppStore"
import axiosInstance from "./proxyClient"
import { useAuthControl } from "@/hooks/useAuthControl"

const useMutation = (
  endpoint: string,
  options?: {
    method?: "post" | "put" | "delete" | "patch"
    onSuccess?: (a: any, b: any, c: any) => void
    onError?: (a: any, b: any, c: any) => void
    headers?: any
  }
) => {
  const method = options?.method || "post"
  const isLogin = useAppStore((state) => state.isLogin)

  const { authLogout } = useAuthControl()

  const { error, ...result } = reactUseMutation<
    AxiosResponse<any, any>,
    CustomError,
    any,
    unknown
  >({
    mutationFn: (body: any) => {
      if (options?.method === "delete") {
        return axiosInstance.delete(endpoint)
      }
      return axiosInstance[method](endpoint, body as any, {
        headers: options?.headers,
      })
    },

    onSuccess: (result, variables, context) => {
      // variables => body sended
      // context => {queryClient, queryKey, queryVariables}
      // result => response from server
      options?.onSuccess && options.onSuccess(result, variables, context)
    },

    onError: (error, variables, context) => {
      toast.error(errorMessageHandler(error))

      if (isLogin) {
        if (error.response?.status === 401) {
          return authLogout()
        }
      }
      options?.onError && options.onError(error, variables, context)
    },
  })

  const renderedError = errorMessageHandler(error)

  return {
    error: renderedError,
    loading: result.isPending,
    ...result,
  }
}

export default useMutation

const errorMessageHandler = (error: any) => {
  if (error && error.response?.data?.message) {
    return (
      error.response?.data?.message ||
      error.response?.data ||
      "Internal Server Error"
    )
  }
  return null
}
