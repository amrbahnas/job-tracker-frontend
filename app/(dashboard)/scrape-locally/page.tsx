import ScrapeLocallyView from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("scrapeLocally.meta")

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function ScrapeLocallyPage() {
  return <ScrapeLocallyView />
}
