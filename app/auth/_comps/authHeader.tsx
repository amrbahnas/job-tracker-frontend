import DarkModeToggle from "@/components/common/darkModeToggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import Logo from "@/components/common/logo"
import Container from "@/components/ui/container"
import Link from "next/link"

export function AuthHeader() {
  return (
    <header
      className="border-b bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2">
          <LanguageToggle />
          <DarkModeToggle />
          {/* <Button variant="link" asChild>
            <Link href="/login">Support</Link>
          </Button> */}
        </nav>
      </Container>
    </header>
  )
}
