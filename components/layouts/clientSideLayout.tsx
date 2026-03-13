"use client"

import useFirebaseNotifications from "@/hooks/useFirebaseNotifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import React from "react"

import { Toaster as SonnerToaster } from "sonner"
import { ThemeProvider } from "../theme-provider"

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}

      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>
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
