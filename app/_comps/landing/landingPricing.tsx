import { Check } from "lucide-react"
import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"

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
      className="border-y bg-background/60 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <p className="text-md mb-2 text-center font-medium tracking-wider text-muted-foreground uppercase">
          {t("eyebrow")}
        </p>
        <h2
          id="pricing-heading"
          className="text-gradient mb-4 text-center text-2xl font-semibold sm:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          {t("description")}
        </p>

        <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{t("planTitle")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("planDescription")}
              </p>
            </div>
            <p className="text-3xl font-bold">
              {t("priceLabel")}
              <span className="text-base font-normal text-muted-foreground">
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
