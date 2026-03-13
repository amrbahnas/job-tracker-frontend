"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ScrapeBTN from "./scraptBTN"

const Header = () => {
  const t = useTranslations("jobs.header")

  return (
    <header className="hidden flex-wrap items-baseline justify-between gap-2 sm:flex">
      <div>
        <h1
          id="jobs-dashboard-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <ScrapeBTN />
    </header>
  )
}

export default Header
