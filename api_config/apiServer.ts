"use server"
import axios from "axios"
import { cookies } from "next/headers"

const ServerAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

ServerAxiosInstance.interceptors.request.use(async (config) => {
  const locale = (await cookies()).get("locale")?.value
  if (locale) {
    config.headers["Accept-Language"] = locale
  }
  return config
})
export default ServerAxiosInstance
