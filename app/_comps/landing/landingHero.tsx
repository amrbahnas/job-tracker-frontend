import { Avatar, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"
import Link from "next/link"

const HERO_IMAGE = "/images/HeroSectionEn.png"
const HERO_IMAGE_AR = "/images/HeroSectionAr.png"
export async function LandingHero() {
  const t = await getTranslations("landing.hero")
  const locale = await getLocale()

  return (
    <section
      className="relative mb-16 flex h-svh items-center justify-start overflow-hidden text-start"
      aria-labelledby="hero-heading"
    >
      {/* Background image with dark purple overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={locale === "ar" ? HERO_IMAGE_AR : HERO_IMAGE}
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-right"
        />
        <div className="absolute inset-0 z-10 bg-black/50" />
      </div>
      <Container className="z-10 mt-20 flex h-full flex-col justify-center">
        <section>
          <h1
            id="hero-heading"
            className="text-center font-sans text-6xl leading-tight font-bold text-white sm:text-start sm:text-8xl"
          >
            {t.rich("title", {
              span: (chunks) => (
                <span className="text-gradient block sm:inline">{chunks}</span>
              ),
            })}
          </h1>
          <p className="mt-8 max-w-[40rem] text-center text-lg text-white/95 sm:text-start">
            {t("description")}
          </p>
          <div
            className="mt-8 flex flex-wrap justify-start gap-4"
            role="group"
            aria-label="Primary actions"
          >
            <Button
              size="lg"
              asChild
              className="w-full border-0 bg-primary px-12 py-6 font-bold text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Link href="/auth?tab=signup">{t("primaryCta")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full border-white/80 bg-transparent px-8 py-6 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Link href="#about">{t("secondaryCta")}</Link>
            </Button>
          </div>
        </section>
        <section
          className="flex max-w-4xl items-center gap-4 py-8"
          aria-label="Social proof "
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AvatarGroup>
              {[1, 2, 3].map((name) => (
                <Avatar key={name}>
                  <AvatarImage src={`/images/avatars/${name}.png`} />
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
          <p className="text-sm text-white">
            <strong>{t("socialProofPrefix")}</strong> {t("socialProofSuffix")}
          </p>
        </section>
      </Container>
    </section>
  )
}
