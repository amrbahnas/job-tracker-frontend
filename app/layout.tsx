import { Figtree, Geist_Mono } from "next/font/google"
import type { Metadata, Viewport } from "next"

import ClientSideLayout from "@/components/layouts/clientSideLayout"
import { cn } from "@/lib/utils"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://dorly.io")

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "Dorly",
  title: { template: "%s | Dorly", default: "Dorly — Find New Jobs Before Everyone Else" },
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false },
}

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
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[100] rounded bg-primary px-4 py-2 text-primary-foreground focus:left-4 focus:outline-none"
        >
          Skip to main content
        </a>
        <NuqsAdapter>
          <ClientSideLayout>{children}</ClientSideLayout>
        </NuqsAdapter>
      </body>
    </html>
  )
}
