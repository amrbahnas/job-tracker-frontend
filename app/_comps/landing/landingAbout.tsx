import Container from "@/components/ui/container"

export function LandingAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-muted/20 py-20"
    >
      <Container className="mx-auto max-w-5xl px-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">
          About Dorly
        </p>
        <h2
          id="about-heading"
          className="mb-4 text-center text-2xl font-semibold sm:text-3xl"
        >
          Built for people serious about their job search
        </h2>
        <p className="mx-auto mb-6 max-w-3xl text-center text-muted-foreground">
          Dorly was created for job seekers who are tired of opening ten tabs
          every morning just to see what&apos;s new. Instead of manually
          checking LinkedIn, Indeed, Bayt, and other platforms, Dorly monitors
          your saved searches and pulls new roles into one simple dashboard.
        </p>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Our mission</h3>
            <p className="text-sm text-muted-foreground">
              Help job seekers apply earlier and stay organized so they can
              focus on preparing stronger applications — not refreshing job
              boards all day.
            </p>
          </div>
          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Who Dorly is for</h3>
            <p className="text-sm text-muted-foreground">
              Fresh graduates, software developers, and professionals who track
              opportunities across multiple platforms and want a single place to
              monitor, review, and manage every application.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

