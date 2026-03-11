"use client"

import useFirebaseNotifications from "@/hooks/useFirebaseNotifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  useFirebaseNotifications()

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        {children}
      </GoogleReCaptchaProvider>
    </QueryClientProvider>
  )
}

export default ClientSideLayout
