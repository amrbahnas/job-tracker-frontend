interface BaseParamsType {
  [key: string]: any // Allow any other keys
}

type ParamsType = Omit<BaseParamsType, "skip">

type Params = Promise<any>

type Pagination = {
  current: number
  pageSize: number
  total: number
  showSizeChanger: boolean
  showTotal: (total: number) => React.ReactNode
  onChange: (page: number, pageSize?: number) => void
  onShowSizeChange: (current: number, size: number) => void
}

interface InfinitePaginationType {
  current: number
  pageSize: number
  total: number
  hasMore: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
}

interface CustomError extends Error {
  response: {
    data: {
      message: string
      error: string
      statusCode: number
    }
    status: number
  }
}

type QueryOptionsType = {
  params?: Record<string, any>
  initialData?: any
  skip?: boolean
  retry?: number
  refetchOnWindowFocus?: boolean
  pageSize?: number
  disableProxy?: boolean
  staleTime?: string | any
  keepPreviousData?: boolean
  reverse?: boolean
  dataKey?: string
}

interface User {
  _id: string
  fullName: string
  firstName?: string
  lastName?: string
  email: string
  createdAt: string
  isActive: boolean
}

interface Website {
  _id: string
  userId: string
  name: string
  urls: string[]
  selectors: Record<string, string>
  scrapeIntervalMinutes?: number
  lastScrapedAt?: string | null
  enabled: boolean
  createdAt?: string
}

type JobStatus = "new" | "applied" | "archived"

interface Job {
  _id: string
  userId: string
  website: { _id: string; name: string }
  title: string
  company: string
  location?: string
  description?: string
  link: string
  salary?: string
  status: JobStatus
  createdAt: string
  datePosted?: string
  externalId?: string | null
  scrapedFrom?: string
}
