import Container from "@/components/ui/container"

import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-svh bg-muted/30">
      <Container className="py-6">{children}</Container>
    </div>
  )
}
