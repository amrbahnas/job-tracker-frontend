"use client"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import useFirebaseNotifications from "@/hooks/useFirebaseNotifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { Toaster as SonnerToaster } from "sonner"
import { ThemeProvider } from "../theme-provider"

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      {isRecaptchaEnabled ? (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        >
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      ) : (
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      )}
    </QueryClientProvider>
  )
}

const Toaster = () => {
  const { theme } = useTheme()
  useFirebaseNotifications()

  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      theme={theme as "system" | "light" | "dark"}
    />
  )
}

export default ClientSideLayout
