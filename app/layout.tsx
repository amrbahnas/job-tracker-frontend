import ClientSideLayout from "@/components/layouts/clientSideLayout"
import { defaultLocale, locales, type Locale } from "@/i18n"
import { getMessages } from "@/i18n/getMessages"
import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { Inter, Cairo } from "next/font/google"
import { cookies } from "next/headers"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://dawarly.io")

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
  applicationName: "Dawarly",
  title: {
    template: "%s | Dawarly",
    default: "Dawarly — Find New Jobs Before Everyone Else",
  },
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false },
  icons: {
    icon: "/favicon.ico",
  },
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const cairo_arabic = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
})

async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies()
  const cookieLocale = store.get("locale")?.value as Locale | undefined

  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale
  }

  return defaultLocale
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getCurrentLocale()
  const messages = await getMessages(locale)
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`antialiased ${
        locale === "ar" ? cairo_arabic.className : inter.className
      }`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <ClientSideLayout>{children}</ClientSideLayout>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
