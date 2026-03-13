import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"

export async function LandingAbout() {
  const t = await getTranslations("landing.about")

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-muted/20 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <p className="mb-2 text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {t("eyebrow")}
        </p>
        <h2
          id="about-heading"
          className="mb-4 text-center text-2xl font-semibold sm:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-6 max-w-3xl text-center text-muted-foreground">
          {t("description")}
        </p>
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
