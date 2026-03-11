import { Landing } from "@/app/_comps/landing"

export const metadata = {
  title: "Job Tracker — Find Your Next Job Faster",
  description:
    "Keep track of every application, interview, and follow-up across all platforms in one centralized dashboard.",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Landing />
    </div>
  )
}
