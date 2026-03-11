import { useInfiniteQuery as reactUseInfiniteQuery } from "@tanstack/react-query"

import proxyClient from "@/api_config/proxyClient"
import { serverQuery } from "@/api_config/serverQuery"
import { useAuthControl } from "@/hooks/useAuthControl"
import useAppStore from "@/store/useAppStore"
import { useEffect, useMemo } from "react"
import { toast } from "sonner"
import { AxiosInstance } from "axios"

// ex:usage
// export const useGetCalibrationCertificated = (id: string) => {
//   const { data, isLoading, error } = useInfiniteQuery(
//     `/calibrations/${id}/certificates`
//   );
//   return { certificates: data as CertificateType[] ||[], isLoading,error };
// };

function useInfiniteQuery<T>(endpoint: string, options?: QueryOptionsType) {
  const { authLogout } = useAuthControl()
  const user = useAppStore((s) => s.user)
  const instance = options?.disableProxy ? serverQuery : proxyClient
  const pageSize = options?.pageSize || 12

  const fetchPage = async ({ pageParam = 1 }: any) => {
    const res = await (instance as AxiosInstance).get(endpoint, {
      params: {
        pageSize,
        page: pageParam,
        ...options?.params,
      },
    })
    return res.data
  }

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    ...result
  } = reactUseInfiniteQuery<any, CustomError>({
    queryKey: [endpoint, options?.params || "", pageSize],
    queryFn: fetchPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.pagination
      if (pagination?.currentPage < pagination?.totalPages) {
        return pagination.currentPage + 1
      }
      return undefined
    },
    staleTime: options?.staleTime || 60 * 1000, // 1 minute
    retry: options?.retry || 3,
    initialData: options?.initialData,
    enabled: !options?.skip,

    refetchOnWindowFocus: options?.refetchOnWindowFocus || true,
  })

  useEffect(() => {
    if (error) {
      const handleError = async () => {
        process.env.NEXT_PUBLIC_ENV === "development" &&
          toast.error(
            JSON.stringify(
              error.response?.data?.message || "Internal Server Error"
            )
          )

        if (user) {
          if (error.response?.status === 401) {
            await authLogout()
            return
          }
          if (error.response?.status === 403) {
            await authLogout()
            return
          }
        }
      }
      handleError()
    }
  }, [error])

  // Flatten the pages data for easier consumption
  const lists = useMemo(() => {
    const items = data?.pages?.flatMap((page) => page?.list) || []
    return options?.reverse ? items.reverse() : items
  }, [data, options?.reverse])

  // Get pagination info from the latest page
  const pagination = useMemo(() => {
    const latestPage = data?.pages[data.pages.length - 1]
    const pagination = latestPage?.pagination
    return pagination
  }, [data])

  return {
    data: (lists || []) as T,
    pagination: {
      current: pagination?.currentPage,
      pageSize: pagination?.pageSize,
      total: pagination?.total,
      hasMore: hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } as InfinitePaginationType,
    error,
    isLoading,
    refetch,
    ...result,
  }
}

export default useInfiniteQuery
