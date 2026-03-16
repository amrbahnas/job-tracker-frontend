"use client"

import { toast } from "sonner"
import { useGetTokenForDesktop } from "../_api/queries"
import LocalScraperSection from "@/components/shared/LocalScraperSection"
import { useTranslations } from "next-intl"

export default function ScrapeLocallyView() {
  const t = useTranslations("scrapeLocally")
  const { data, loading, refetch } = useGetTokenForDesktop()
  const token = data?.token ?? ""

  const handleGetToken = () => {
    refetch().then((result) => {
      const tkn = result.data?.token
      if (tkn) {
        navigator.clipboard.writeText(tkn).then(() => {
          toast.success(t("token.toastCopied"))
        })
      }
    })
  }

  const copyToken = async () => {
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      toast.success(t("token.toastCopied"))
    } catch {
      toast.error(t("token.toastCopyError"))
    }
  }

  return (
    <main>
      <LocalScraperSection
        token={token}
        loading={loading}
        onGetToken={handleGetToken}
        onCopyToken={copyToken}
        showHeader={true}
      />
    </main>
  )
}
