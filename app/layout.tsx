import { Geist, Geist_Mono, Figtree } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import ClientSideLayout from "@/components/layouts/clientSideLayout"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "sonner"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body>
        <NuqsAdapter>
          <ClientSideLayout>
            <ThemeProvider>{children}</ThemeProvider>
          </ClientSideLayout>
        </NuqsAdapter>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
