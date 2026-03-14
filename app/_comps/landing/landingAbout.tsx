import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"
import Typology from "./typology"

export async function LandingAbout() {
  const t = await getTranslations("landing.about")

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-muted/20 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <Typology.eyebrow>{t("eyebrow")}</Typology.eyebrow>
        <Typology.title>{t("title")}</Typology.title>
        <Typology.description>{t("description")}</Typology.description>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">{t("missionTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("missionDescription")}
            </p>
          </div>
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">{t("whoTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("whoDescription")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
