import Link from "next/link"
import { Send } from "lucide-react"
import Container from "@/components/ui/container"

export function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/20 py-6" role="contentinfo">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            className="flex size-8 items-center justify-center rounded bg-primary/80 text-primary-foreground"
            aria-hidden
          >
            <Send className="size-4" />
          </span>
          <span className="font-semibold">JobTracker</span>
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
          © {year} JobTracker Inc. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
