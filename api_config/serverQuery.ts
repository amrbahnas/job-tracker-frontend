import { AxiosRequestConfig } from "axios"
import AxiosInstance from "./apiServer"

export const serverQuery = async <T>(
  endpoint: string,
  config: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = (await AxiosInstance.get<T>(endpoint, config)) as any

    return { data: response.data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
