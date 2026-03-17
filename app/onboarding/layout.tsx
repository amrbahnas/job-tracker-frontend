import Container from "@/components/ui/container"

import type { Metadata } from "next"
import OnboardingHeader from "./_comps/onboardingHeader"

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OnboardingHeader />
      <div className="bg-muted/30">
        <Container className="py-4">{children}</Container>
      </div>
    </>
  )
}
