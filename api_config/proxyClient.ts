import axios from "axios"

const proxyAxiosInstance = axios.create({
  // baseURL: "/api/proxy",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  withCredentials: true,
})

export default proxyAxiosInstance
