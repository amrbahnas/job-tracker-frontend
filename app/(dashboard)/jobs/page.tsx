import JobsView from "./_comps"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jobs",
  description: "Your unified job feed from LinkedIn, Indeed, Bayt and more. Track applications and see new roles first.",
  robots: { index: false, follow: true },
}

export default function JobsPage() {
  return <JobsView />;
}
