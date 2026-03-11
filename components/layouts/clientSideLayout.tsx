"use client"

import useFirebaseNotifications from "@/hooks/useFirebaseNotifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { Toaster } from "sonner"
import { ThemeProvider } from "../theme-provider"

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  const { theme } = useTheme()
  useFirebaseNotifications()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        richColors
        theme={theme as "system" | "light" | "dark"}
      />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </GoogleReCaptchaProvider>
    </QueryClientProvider>
  )
}

export default ClientSideLayout
