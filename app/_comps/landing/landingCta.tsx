import Link from "next/link"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { getTranslations } from "next-intl/server"

export async function LandingCta() {
  const t = await getTranslations("landing.cta")

  return (
    <Container className="py-20" aria-labelledby="cta-heading">
      <section className="rounded-2xl bg-[#131a38] px-6 py-24 text-center text-primary-foreground shadow-lg">
        <h2 id="cta-heading" className="text-2xl font-semibold sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
          {t("description")}
        </p>
        <div
          className="mt-8 flex flex-wrap justify-center gap-4"
          role="group"
          aria-label="Get started"
        >
          <Button size="lg" asChild className="px-12 py-6!">
            <Link href="/auth?tab=signup">{t("primaryCta")}</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="px-8 py-6">
            <Link href="#about">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </section>
    </Container>
  )
}
