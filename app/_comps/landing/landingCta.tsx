import Link from "next/link"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"

export function LandingCta() {
  return (
    <Container className="py-20" aria-labelledby="cta-heading">
      <section className="rounded-2xl bg-[#131a38] px-6 py-24 text-center text-primary-foreground shadow-lg">
        <h2 id="cta-heading" className="text-2xl font-semibold sm:text-5xl">
          Ready to organize your career?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
          Join thousands of job seekers who have streamlined their search and
          landed roles at top tech companies.
        </p>
        <div
          className="mt-8 flex flex-wrap justify-center gap-4"
          role="group"
          aria-label="Get started"
        >
          <Button size="lg" asChild>
            <Link href="/auth?tab=signup" className="px-12 py-6">
              Get Started Now
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="px-8 py-6">
            <Link href="/auth">View Demo</Link>
          </Button>
        </div>
      </section>
    </Container>
  )
}
