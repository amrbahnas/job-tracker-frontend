import DarkModeToggle from "@/components/common/darkModeToggle"
import Container from "@/components/ui/container"
import { Send } from "lucide-react"
import Link from "next/link"

export function AuthHeader() {
  return (
    <header
      className="border-b bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span
            className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"
            aria-hidden
          >
            <Send className="size-5" />
          </span>
          <span className="text-lg font-semibold">JobTracker</span>
        </Link>
        <nav className="flex items-center gap-2">
          <DarkModeToggle />
          {/* <Button variant="link" asChild>
            <Link href="/login">Support</Link>
          </Button> */}
        </nav>
      </Container>
    </header>
  )
}
