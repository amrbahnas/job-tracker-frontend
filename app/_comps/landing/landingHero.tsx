import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"

const HERO_IMAGE = "/images/HeroSection3.png"

export function LandingHero() {
  return (
    <section
      className="relative mb-16 flex h-svh items-center justify-start overflow-hidden text-start"
      aria-labelledby="hero-heading"
    >
      {/* Background image with dark purple overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center sm:object-right"
        />
        <div className="absolute inset-0 z-10 bg-black/50" />
      </div>
      <Container className="z-10 mt-20 flex h-full flex-col justify-center">
        <section>
          <h1
            id="hero-heading"
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
          >
            Track Job Applications
            <br />
            in One
            <span className="text-primary italic drop-shadow-sm"> Place</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/95">
            Keep track of every application, interview, and follow-up across all
            platforms in one centralized dashboard. Stay organized and land your
            dream role.
          </p>
          <div
            className="mt-8 flex flex-wrap justify-start gap-4"
            role="group"
            aria-label="Primary actions"
          >
            <Button
              size="lg"
              asChild
              className="border-0 bg-primary px-12 py-6 font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/auth?tab=signup">Start Tracking Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/80 bg-transparent px-8 py-6 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/auth">Learn More</Link>
            </Button>
          </div>
        </section>
        <section
          className="flex max-w-4xl items-center gap-4 py-8"
          aria-label="Social proof "
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AvatarGroup>
              {["Alex", "John", "Jane"].map((name) => (
                <Avatar key={name}>
                  <AvatarImage src={`https://github.com/${name}.png`} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
          <p className="text-sm text-white">
            <strong>5,000+</strong> seekers joined this week
          </p>
        </section>
      </Container>
    </section>
  )
}
