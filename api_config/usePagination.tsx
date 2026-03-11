"use client"

import {
  keepPreviousData as keepPreviousDataPlaceholder,
  useQuery as reactUseQuery,
} from "@tanstack/react-query"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import useAppStore from "@/store/useAppStore"
import axiosInstance from "./proxyClient"
import { useAuthControl } from "@/hooks/useAuthControl"

function usePagination<T>(endpoint: string, options?: QueryOptionsType) {
  const { authLogout } = useAuthControl()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(options?.pageSize || 10)
  const prevParamsRef = useRef(options?.params)
  const isLogin = useAppStore((state) => state.isLogin)

  useEffect(() => {
    if (
      JSON.stringify(prevParamsRef.current) !== JSON.stringify(options?.params)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(1)
      prevParamsRef.current = options?.params
    }
  }, [options?.params])

  const queryFn = async () => {
    const res = await axiosInstance.get(endpoint, {
      params: {
        limit: pageSize,
        page,
        ...options?.params,
      },
    })
    return res.data
  }

  const { data, isLoading, ...result } = reactUseQuery<any, CustomError>({
    queryKey: [endpoint, page, options?.params || "", pageSize],
    queryFn,
    staleTime: options?.staleTime || "5s",
    retryDelay: (retryCount: number) => retryCount * 2000,
    retry: options?.retry || 3,
    initialData: options?.initialData,
    enabled: !Boolean(options?.skip),
    placeholderData: options?.keepPreviousData
      ? keepPreviousDataPlaceholder
      : undefined,
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false,
  })

  useEffect(() => {
    if (result.error) {
      const handleError = async () => {
        process.env.NEXT_PUBLIC_ENV === "development" &&
          toast.error(
            JSON.stringify(
              result.error.response?.data || "Internal Server Error"
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
    pagination: {
      current: page,
      pageSize,
      total: data?.pagination?.total,
      showSizeChanger: true,
      showTotal: (total: number) => (
        <span className="font-medium">{`Total ${total} items`}</span>
      ),
      onChange: (page: number, nextPageSize?: number) => {
        if (pageSize !== nextPageSize) {
          setPageSize(nextPageSize!)
          setPage(1)
        } else {
          setPage(page)
        }
      },
    } as Pagination,
    hasMore: data?.pagination?.totalPages > page,
    page,
    setPage,
    nextPage: () => {
      if (data?.pagination?.totalPages > page) {
        setPage((prevPage) => prevPage + 1)
      }
    },
    data: (data?.[options?.dataKey || "list"] as T) || [],
    isLoading,
    ...result,
    refetch: (data?: any) => result.refetch(),
  }
}

export default usePagination
