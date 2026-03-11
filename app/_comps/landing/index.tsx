import { LandingHeader } from "./landingHeader"
import { LandingHero } from "./landingHero"

import { LandingFeatures } from "./landingFeatures"
import { LandingCta } from "./landingCta"
import { LandingFooter } from "./landingFooter"

export function Landing() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />

        <LandingFeatures />
        <LandingCta />
      </main>
      <LandingFooter />
    </>
  )
}

export { LandingHeader } from "./landingHeader"
export { LandingHero } from "./landingHero"

export { LandingFeatures } from "./landingFeatures"
export { LandingCta } from "./landingCta"
export { LandingFooter } from "./landingFooter"
