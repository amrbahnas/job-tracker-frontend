import proxyClient from "@/api_config/proxyClient"
import useAppStore from "@/store/useAppStore"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useAuthControl = () => {
  const { setIsLogin, resetAppData, setUser } = useAppStore()
  const router = useRouter()
  const t = useTranslations("auth")

  const authSuccess = async (data: any, register = false) => {
    setIsLogin(true)
    setUser(data.user)
    toast.success(register ? t("registrationSuccessful") : t("loginSuccessful"))
    router.replace(register ? "/onboarding" : "/jobs")
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
