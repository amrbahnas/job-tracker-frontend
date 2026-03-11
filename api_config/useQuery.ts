"use client"

import { useQuery as reactUseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useEffect } from "react"
import axiosInstance from "./proxyClient"
import useAppStore from "@/store/useAppStore"
import { useAuthControl } from "@/hooks/useAuthControl"

type UseQueryOptionsType = {
  params?: ParamsType
  skip?: boolean
  retry?: number
  staleTime?: number
  refetchOnWindowFocus?: boolean
  initialResults?: any
  disableProxy?: boolean
}

function useQuery<T>(endpoint: string, options?: UseQueryOptionsType) {
  const { authLogout } = useAuthControl()
  const isLogin = useAppStore((state) => state.isLogin)

  const queryFn = () =>
    axiosInstance
      .get(endpoint, {
        params: options?.params,
      })
      .then((res) => res.data)

  const { data, ...result } = reactUseQuery<any, CustomError>({
    queryKey: [endpoint, options?.params || ""],
    queryFn,
    enabled: !Boolean(options?.skip),
    initialData: options?.initialResults,
    retry: options?.retry || 2,
    retryDelay: (retryCount: number) => retryCount * 2000,
    staleTime: options?.staleTime || 60 * 1000, // 1 minute
    refetchOnWindowFocus: options?.refetchOnWindowFocus || true,
  })

  useEffect(() => {
    if (result.error) {
      const handleError = async () => {
        process.env.NEXT_PUBLIC_ENV === "development" &&
          toast.error(
            JSON.stringify(
              result.error.response?.data?.message || "Internal Server Error"
            )
          )

        if (isLogin) {
          if (result.error.response?.status === 401) {
            authLogout()
            return
          }
        }
      }
      handleError()
    }
  }, [result.error])

  return {
    data: data as T | undefined,
    loading: result.isLoading,
    ...result,
    refetch: (data?: any) => result.refetch(),
  }
}

export default useQuery
