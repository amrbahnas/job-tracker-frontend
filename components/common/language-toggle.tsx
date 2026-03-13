"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

const supportedLocales = ["en", "ar"] as const

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const [pendingLocale, setPendingLocale] = useState<
    (typeof supportedLocales)[number] | null
  >(null)

  useEffect(() => {
    if (!pendingLocale || pendingLocale === locale) return

    document.cookie = `locale=${pendingLocale}; path=/`
    router.refresh()
  }, [pendingLocale, locale, router])

  const handleChangeLocale = (
    nextLocale: (typeof supportedLocales)[number]
  ) => {
    if (nextLocale === locale) return
    setPendingLocale(nextLocale)
  }

  return (
    <button
      type="button"
      onClick={() => handleChangeLocale(locale === "ar" ? "en" : "ar")}
      className="flex cursor-pointer items-center gap-1.25 text-sm font-medium"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  )
}
