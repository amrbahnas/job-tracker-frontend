import { Lock, LayoutGrid, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "@/components/ui/container"

const features = [
  {
    icon: Lock,
    title: "All Features, Always Free",
    description:
      "Dorly is built for job seekers, not recruiters. You get every feature, unlimited boards, and unlimited searches — with zero cost.",
  },
  {
    icon: LayoutGrid,
    title: "Multi‑platform Job Aggregation",
    description:
      "Connect searches from LinkedIn, Indeed, Bayt, and other job boards so new roles appear in a single, unified job feed.",
  },
  {
    icon: Bell,
    title: "Instant New‑Job Alerts",
    description:
      "Get notified as soon as new matching jobs appear so you can be among the very first to apply.",
  },
] as const

export function LandingFeatures() {
  return (
    <Container
      id="features"
      className="rounded-3xl border-t bg-muted/30 py-16"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-2 text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Why Dorly
        </p>
        <h2
          id="features-heading"
          className="mb-4 text-center text-2xl font-semibold sm:text-3xl"
        >
          Beat Other Candidates to New Roles
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Dorly automates the repetitive parts of job hunting — checking
          multiple sites, refreshing tabs, and copying links — so you can focus
          on sending stronger applications earlier than everyone else.
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {features.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className={cn(
                "rounded-xl border bg-card p-6 shadow-sm",
                i === 2 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <span
                className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
