import proxyClient from "@/api_config/proxyClient"
import useAppStore from "@/store/useAppStore"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuthControl = () => {
  const { setIsLogin, resetAppData, setUser } = useAppStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const authSuccess = async (data: any, register = false) => {
    setIsLogin(true)
    setUser(data.user)
    toast.success(register ? "Registration successful" : "Login successful")
    router.replace("/jobs")
  }

  const authLogout = async () => {
    await proxyClient.post("/auth/logout")
    resetAppData()
    // queryClient.clear()
    router.replace("/")
  }

  return {
    authSuccess,
    authLogout,
  }
}
