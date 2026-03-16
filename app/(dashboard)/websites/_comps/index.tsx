"use client"

import Header from "./header"
import { WebsitesList } from "./websitesList"

function WebsitesView() {
  return (
    <main
      className="flex flex-col gap-6"
      aria-labelledby="websites-dashboard-heading"
    >
      <section className="flex flex-col gap-2">
        <Header />
      </section>
      <WebsitesList />
    </main>
  )
}

export default WebsitesView
