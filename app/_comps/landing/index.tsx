import { LandingHeader } from "./landingHeader"
import { LandingHero } from "./landingHero"
import { LandingFeatures } from "./landingFeatures"
import { LandingPricing } from "./landingPricing"
import { LandingAbout } from "./landingAbout"
import { LandingCta } from "./landingCta"
import { LandingFooter } from "./landingFooter"

export function Landing() {
  return (
    <>
      <LandingHeader />
      <main id="main-content" className="flex-1" role="main">
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
        <LandingAbout />
        <LandingCta />
      </main>
      <LandingFooter />
    </>
  )
}

export { LandingHeader } from "./landingHeader"
export { LandingHero } from "./landingHero"
export { LandingFeatures } from "./landingFeatures"
export { LandingPricing } from "./landingPricing"
export { LandingAbout } from "./landingAbout"
export { LandingCta } from "./landingCta"
export { LandingFooter } from "./landingFooter"
