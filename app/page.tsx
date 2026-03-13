import { Landing } from "@/app/_comps/landing"
import type { Metadata } from "next"
import { LandingJsonLd } from "./_comps/landing/landingJsonLd"

const title = "Dorly — Find New Jobs Before Everyone Else"
const description =
  "Dorly automatically monitors LinkedIn, Indeed, Bayt, and other job platforms to surface the newest roles in one centralized job feed so you can apply first and stay organized."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Dorly",
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
  authors: [{ name: "Dorly", url: "https://dorly.io" }],
  creator: "Dorly",
  publisher: "Dorly",
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
    siteName: "Dorly",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: "/" },
}

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingJsonLd />
      <Landing />
    </div>
  )
}
