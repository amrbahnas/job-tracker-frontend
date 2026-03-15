import { Lock, LayoutGrid, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"
import Typology from "./typology"

export async function LandingFeatures() {
  const t = await getTranslations("landing.features")

  const featureItems = [
    {
      icon: Lock,
      title: t("items.allFeaturesTitle"),
      description: t("items.allFeaturesDescription"),
    },
    {
      icon: LayoutGrid,
      title: t("items.multiPlatformTitle"),
      description: t("items.multiPlatformDescription"),
    },
    {
      icon: Bell,
      title: t("items.alertsTitle"),
      description: t("items.alertsDescription"),
    },
  ] as const

  return (
    <Container
      id="features"
      className="- my-12 rounded-3xl border-t bg-muted/30 py-16"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-4xl sm:px-6">
        <Typology.eyebrow>{t("eyebrow")}</Typology.eyebrow>

        <Typology.title>{t("title")}</Typology.title>

        <Typology.description>{t("description")}</Typology.description>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {featureItems.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className={cn(
                "rounded-xl border bg-card p-6 shadow-sm",
                i === 2 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <span
                className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
