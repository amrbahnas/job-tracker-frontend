import ProfileView from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("profile.meta")
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function ProfilePage() {
  return <ProfileView />
}
