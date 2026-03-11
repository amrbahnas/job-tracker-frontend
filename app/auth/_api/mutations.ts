"use client"

import useMutation from "@/api_config/useMutation"
import { useAuthControl } from "@/hooks/useAuthControl"

export const useAuthActions = () => {
  const { authSuccess } = useAuthControl()
  const { mutate: login, loading: loginLoading } = useMutation("/auth/login", {
    onSuccess: (res) => {
      authSuccess(res.data)
    },
  })
  const { mutate: signup, loading: signupLoading } = useMutation(
    "/auth/signup",
    {
      onSuccess: (res) => {
        console.log("🚀 ~ file: mutations.ts:17 ~ res:", res)
        authSuccess(res.data)
      },
    }
  )

  return {
    login,
    signup,
    loginLoading,
    signupLoading,
    loading: loginLoading || signupLoading,
  }
}

export const useSendResetCode = (options?: {
  onSuccess?: (res: any) => void
}) => {
  return useMutation("/auth/send-otp", {
    onSuccess: options?.onSuccess,
  })
}

export const useResendCode = (options?: { onSuccess?: (res: any) => void }) => {
  return useMutation("/auth/send-otp", {
    onSuccess: options?.onSuccess,
  })
}

export const useVerifyCode = (options?: {
  onSuccess?: (res: any) => void
}) => {
  return useMutation("/auth/verify-otp", {
    onSuccess: options?.onSuccess,
  })
}

export const useResetPasswordMutation = (options?: {
  onSuccess?: (res: any) => void
}) => {
  return useMutation("/auth/reset-password", {
    onSuccess: options?.onSuccess,
  })
}
