const formatInterval = (minutes?: number, locale: string = "en") => {
  if (!minutes || minutes <= 0)
    return locale === "ar" ? "مخصص" : "Custom interval"
  if (minutes % 60 === 0) {
    const hours = minutes / 60
    return `${hours} ${locale === "ar" ? "ساعة" : "h"} `
  }
  return `${minutes} ${locale === "ar" ? "دقائق" : "m"}`
}
export default formatInterval
