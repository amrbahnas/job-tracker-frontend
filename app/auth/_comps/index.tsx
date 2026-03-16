"use client"
import Container from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { AuthFormSection } from "./authFormSection"
import { AuthPromo } from "./authPromo"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export default function Auth() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <Container className={cn("flex flex-1 items-center justify-center")}>
        <main
          className={cn(
            "flex h-fit flex-col gap-8 bg-card",
            "w-full gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:max-w-5xl md:flex-row"
          )}
          role="main"
          aria-label="Authentication"
        >
          <aside className="hidden flex-2 sm:block md:shrink-0">
            <AuthPromo className="h-full w-full" />
          </aside>
          <div className="order-1 bg-muted/30 sm:flex-3">
            <AuthFormSection />
          </div>
        </main>
      </Container>
    </GoogleReCaptchaProvider>
  )
}
