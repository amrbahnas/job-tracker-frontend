import JobsView from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("jobs.meta")

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
  }
}

export default function JobsPage() {
  return <JobsView />
}
