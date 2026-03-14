"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const AUTH_HERO_IMAGE = "/images/auth.png"

export function AuthPromo({ className }: { className?: string }) {
  const t = useTranslations("auth.promo")

  const FEATURES = [
    t("featurePipeline"),
    t("featureReminders"),
    t("featureSalary"),
  ] as const

  return (
    <section
      className={cn(
        "flex flex-col justify-center gap-6 rounded-l-2xl bg-primary/10 p-8 md:p-10 dark:bg-muted/10",
        className
      )}
      aria-labelledby="auth-promo-heading"
    >
      <figure className="flex flex-col gap-4">
        <div className="relative h-50 overflow-hidden rounded-lg border border-border bg-white p-1">
          <Image
            src={AUTH_HERO_IMAGE}
            alt="Professional working on laptop"
            fill
            className="h-full w-full rounded-lg object-cover p-1"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        <figcaption className="flex flex-col gap-2">
          <h2
            id="auth-promo-heading"
            className="text-2xl font-bold tracking-tight text-foreground md:text-3xl rtl:leading-12"
          >
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </figcaption>
      </figure>
      <ul className="flex flex-col gap-2" role="list">
        {FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-hidden
            >
              <svg
                className="size-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
