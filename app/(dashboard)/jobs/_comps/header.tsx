import React from "react"
import ScrapeBTN from "./scraptBTN"

const Header = () => {
  return (
    <header className="hidden flex-wrap items-baseline justify-between gap-2 sm:flex">
      <div>
        <h1
          id="jobs-dashboard-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Jobs Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage your career opportunities across the web.
        </p>
      </div>
      <ScrapeBTN />
    </header>
  )
}

export default Header
