"use client"
import DarkModeToggle from "@/components/common/darkModeToggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import Logo from "@/components/common/logo"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { useAuthControl } from "@/hooks/useAuthControl"
import { LogOutIcon } from "lucide-react"
import Link from "next/link"

const OnboardingHeader = () => {
  const { authLogout } = useAuthControl()
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-background">
      <Container className="flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/onboarding" className="flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <DarkModeToggle />
          <Button variant="outline" onClick={authLogout}>
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default OnboardingHeader
