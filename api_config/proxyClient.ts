import axios from "axios"

const proxyAxiosInstance = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
})

export default proxyAxiosInstance
