"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "../../../components/common/darkModeToggle"
import Container from "@/components/ui/container"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function LandingHeader() {
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
          <span
            className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
            aria-hidden
          >
            <Send className="size-5" />
          </span>
          <span className="text-lg font-semibold">Dorly</span>
        </Link>
        <nav
          className={cn(
            "flex items-center gap-6 text-white",
            scrolled && "text-black dark:text-white"
          )}
          aria-label="Main"
        >
          <Link
            href="#features"
            className="text-sm font-medium transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium transition-colors hover:text-foreground"
          >
            About
          </Link>
          <DarkModeToggle />
          <div className="flex items-center gap-2">
            <Button className="px-4" asChild>
              <Link href="/auth?tab=signup">Sign Up</Link>
            </Button>
            <Button variant="secondary" className="px-4" asChild>
              <Link href="/auth">Login</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
