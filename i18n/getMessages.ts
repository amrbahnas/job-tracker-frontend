import type { Locale } from "../i18n"

export async function getMessages(locale: Locale) {
  switch (locale) {
    case "ar":
      return (await import("../messages/ar")).default
    case "en":
    default:
      return (await import("../messages/en")).default
  }
}
