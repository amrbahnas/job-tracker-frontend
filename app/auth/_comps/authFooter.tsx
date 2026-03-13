"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function AuthFooter({ className }: { className?: string }) {
  const t = useTranslations("auth.footer")

  const LINKS = [
    { href: "/privacy", label: t("privacy") },
    { href: "/terms", label: t("terms") },
    { href: "/cookies", label: t("cookies") },
  ] as const

  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border p-8 text-center text-xs text-muted-foreground",
        className
      )}
    >
      <span>
        © {new Date().getFullYear()} Job Tracker. {t("brandLine")}
      </span>
      <nav aria-label="Legal">
        <ul className="flex flex-wrap items-center justify-center gap-x-1">
          {LINKS.map((item, i) => (
            <li key={item.href}>
              {i > 0 && (
                <span className="px-1" aria-hidden>
                  ·
                </span>
              )}
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
