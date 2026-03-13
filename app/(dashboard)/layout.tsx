import Container from "@/components/ui/container"
import Navbar from "./_comps/navbar"
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
    <>
      <Navbar />
      <div className="min-h-[calc(100svh-60.8px)] bg-muted/30 pb-16">
        <Container className="py-6">{children}</Container>
      </div>
    </>
  )
}
