import WebsitesView from "./_comps"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Websites",
  description: "Manage your job board sources: LinkedIn, Indeed, Bayt and more. Add searches and get new roles in one feed.",
}

export default function PlatformsPage() {
  return <WebsitesView />
}
