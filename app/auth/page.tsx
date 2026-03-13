import Auth from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.meta")

  return {
    title: t("loginTitle"),
    description: t("loginDescription"),
    robots: { index: true, follow: true },
    alternates: { canonical: "/auth" },
  }
}

export default function AuthPage() {
  return <Auth />
}
