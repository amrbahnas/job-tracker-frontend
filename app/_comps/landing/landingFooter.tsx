import Logo from "@/components/common/logo"
import Container from "@/components/ui/container"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function LandingFooter() {
  const t = await getTranslations("landing.footer")
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/20 py-6" role="contentinfo">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Logo />
        </Link>
        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          aria-label="Footer"
        >
          <Link href="/privacy" className="hover:underline">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t("terms")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("contact")}
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          {t("copyright", { year })}
        </p>
      </Container>
    </footer>
  )
}
