import { Figtree, Geist_Mono } from "next/font/google"

import ClientSideLayout from "@/components/layouts/clientSideLayout"
import { cn } from "@/lib/utils"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"

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
          <ClientSideLayout>{children}</ClientSideLayout>
        </NuqsAdapter>
      </body>
    </html>
  )
}
