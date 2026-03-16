import OnboardingView from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("onboarding.meta")
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
  }
}

export default function OnboardingPage() {
  return <OnboardingView />
}
