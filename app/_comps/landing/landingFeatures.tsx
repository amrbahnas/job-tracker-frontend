import { Lock, LayoutGrid, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import Container from "@/components/ui/container"

const features = [
  {
    icon: Lock,
    title: "100% Free",
    description:
      "Access all core tracking and management features without ever opening your wallet. No hidden fees.",
  },
  {
    icon: LayoutGrid,
    title: "Multi-platform",
    description:
      "One-click sync for applications from LinkedIn, Indeed, Glassdoor, and dozens of other job boards.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get timely alerts for follow-ups, upcoming interviews, and when it's time to reach out to recruiters.",
  },
] as const

export function LandingFeatures() {
  return (
    <Container
      className="rounded-3xl border-t bg-muted/30 py-16"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-2 text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Why JobTracker
        </p>
        <h2
          id="features-heading"
          className="mb-4 text-center text-2xl font-semibold sm:text-3xl"
        >
          Streamline Your Career Search
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Our tools are designed to take the stress out of job hunting by
          automating the busy work.
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
              <span className="mb-2 block font-semibold">{title}</span>
              <p className="text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
