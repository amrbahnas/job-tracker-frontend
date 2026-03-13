import ResetPassword from "./_comps"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.meta")

  return {
    title: t("resetTitle"),
    description: t("resetDescription"),
  }
}

export default function ResetPasswordPage() {
  return <ResetPassword />
}
