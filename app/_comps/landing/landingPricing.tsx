import { Check } from "lucide-react"
import Container from "@/components/ui/container"

const benefits = [
  "Unlimited job searches and tracked boards",
  "Automatic scraping of new roles from multiple platforms",
  "Unified job feed with filters and search",
  "Application status tracking and notes",
  "Email-friendly export of saved opportunities",
] as const

export function LandingPricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-y bg-background/60 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Pricing
        </p>
        <h2
          id="pricing-heading"
          className="mb-4 text-center text-2xl font-semibold sm:text-3xl"
        >
          All Dorly features are <span className="text-primary">100% free</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          No credit card. No trial period. Dorly is designed for job seekers who
          need a faster way to discover and manage opportunities — not another
          subscription to worry about.
        </p>

        <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Free Forever</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need to find and track jobs early.
              </p>
            </div>
            <p className="text-3xl font-bold">
              $0<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                  <Check className="size-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

