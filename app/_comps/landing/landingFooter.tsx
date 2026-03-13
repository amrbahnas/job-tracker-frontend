import Logo from "@/components/common/logo"
import Container from "@/components/ui/container"
import Link from "next/link"

export function LandingFooter() {
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
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of service
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
        <p className="text-sm text-muted-foreground">
          © {year} Dorly. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
