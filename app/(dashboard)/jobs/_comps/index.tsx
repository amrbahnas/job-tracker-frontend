"use client"
import Header from "./header"
import { JobsFilters } from "./jobsFilters"
import { JobsList } from "./jobsList"

export default function JobsView() {
  return (
    <main
      className="flex h-full flex-col gap-6"
      aria-labelledby="jobs-dashboard-heading"
    >
      <section className="flex flex-col gap-2">
        <Header />
        <JobsFilters />
      </section>
      <JobsList />
    </main>
  )
}
