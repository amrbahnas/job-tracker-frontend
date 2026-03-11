"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Settings" },
] as const

export function AuthFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border p-8 text-center text-xs text-muted-foreground",
        className
      )}
    >
      <span>
        © {new Date().getFullYear()} Job Tracker. Built with care for your
        career.
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
