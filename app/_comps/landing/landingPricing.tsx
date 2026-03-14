import { Check } from "lucide-react"
import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"
import Typology from "./typology"

export async function LandingPricing() {
  const t = await getTranslations("landing.pricing")

  const benefitKeys = [
    "unlimitedSearches",
    "autoScraping",
    "unifiedFeed",
    "statusTracking",
    "emailExport",
  ] as const

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-y bg-muted/40 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <Typology.eyebrow>{t("eyebrow")}</Typology.eyebrow>
        <Typology.title>{t("title")}</Typology.title>
        <Typology.description>{t("description")}</Typology.description>

        <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">{t("planTitle")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("planDescription")}
              </p>
            </div>
            <p className="text-3xl font-bold">
              {t("priceLabel")}
              <span className="ms-1 text-base font-normal text-muted-foreground">
                {t("priceSuffix")}
              </span>
            </p>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {benefitKeys.map((key) => (
              <li key={key} className="flex items-start gap-2">
                <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                  <Check className="size-3" />
                </span>
                <span>{t(`benefits.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
