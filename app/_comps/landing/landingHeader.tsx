"use client"

import { LanguageToggle } from "@/components/common/language-toggle"
import Logo from "@/components/common/logo"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import DarkModeToggle from "../../../components/common/darkModeToggle"

export function LandingHeader() {
  const t = useTranslations("landing.header")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-background/95 py-4 transition-colors",
        scrolled
          ? "light:text-white border-b backdrop-blur supports-backdrop-filter:bg-background/60"
          : "bg-transparent"
      )}
      role="banner"
    >
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-white dark:text-foreground",
            scrolled && "text-foreground dark:text-white"
          )}
        >
          <Logo />
        </Link>
        <nav
          className={cn(
            "flex items-center gap-2 text-white sm:gap-6",
            scrolled && "text-black dark:text-white"
          )}
          aria-label="Main"
        >
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("navFeatures")}
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("navPricing")}
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("navAbout")}
            </Link>
          </div>

          <LanguageToggle />
          <DarkModeToggle />

          <div className="flex items-center gap-2">
            <Button className="px-4" asChild>
              <Link href="/auth?tab=signup">{t("signUp")}</Link>
            </Button>
            <Button
              variant="outline"
              className="hidden bg-transparent px-4 sm:block"
              asChild
            >
              <Link href="/auth">{t("login")}</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
