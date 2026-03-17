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
      locale: "ar_AR",
      title,
      description,
      siteName: "Dawarly",
      url: "/",
      images: [
        {
          url: "/images/logo/dawarly.png",
          width: 1200,
          height: 630,
          alt: "Dawarly — Find New Jobs Before Everyone Else",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/HeroSectionAr.png"],
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
