import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import { defaultLocale, locales, type Locale } from "../i18n"
import { getMessages } from "./getMessages"

export default getRequestConfig(async () => {
  const store = await cookies()
  const cookieLocale = store.get("locale")?.value as Locale | undefined

  const locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : defaultLocale

  const messages = await getMessages(locale)

  return {
    locale,
    messages,
  }
})
