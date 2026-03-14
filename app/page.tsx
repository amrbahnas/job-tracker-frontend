import { Landing } from "@/app/_comps/landing"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { LandingJsonLd } from "./_comps/landing/landingJsonLd"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing.meta")

  const title = t("title")
  const description = t("description")

  return {
    title,
    description,
    keywords: [
      "Dawarly",
      "job tracker",
      "job search dashboard",
      "job scraping tool",
      "LinkedIn job tracker",
      "Indeed job tracker",
      "Bayt job alerts",
      "job application tracker",
      "find jobs faster",
      "job aggregation platform",
    ],
    authors: [{ name: "Dawarly", url: "https://dawarly.io" }],
    creator: "Dawarly",
    publisher: "Dawarly",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      siteName: "Dawarly",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: "/" },
  }
}

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingJsonLd />
      <Landing />
    </div>
  )
}
