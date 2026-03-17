"use client"
import DarkModeToggle from "@/components/common/darkModeToggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import Logo from "@/components/common/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Container from "@/components/ui/container"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthControl } from "@/hooks/useAuthControl"
import { cn } from "@/lib/utils"
import useAppStore from "@/store/useAppStore"
import { Briefcase, Globe, Laptop, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useState } from "react"
import { useTranslations } from "next-intl"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-background">
      <Container className="flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/jobs" className="flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          <DesktopNavLinks />
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <DarkModeToggle />
          <ProfilePopover />
        </div>
      </Container>

      <MobileBottomNav />
    </header>
  )
}

const MobileBottomNav = memo(() => {
  const pathname = usePathname()
  const t = useTranslations("common.navbar")
  const NAV_LINKS = getNavLinks(t)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background pt-2 pb-3 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md justify-around px-6">
        {NAV_LINKS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-xs font-semibold"
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  "text-[11px] tracking-wide transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
})

MobileBottomNav.displayName = "MobileBottomNav"

const DesktopNavLinks = () => {
  const pathname = usePathname()
  const t = useTranslations("common.navbar")
  const NAV_LINKS = getNavLinks(t)
  return (
    <nav className="text-md hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-1 text-sm font-medium hover:text-primary",
            pathname === link.href && "text-primary"
          )}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

const ProfilePopover = () => {
  const user = useAppStore((s) => s.user)
  const t = useTranslations("common.navbar")
  const { authLogout } = useAuthControl()
  const [openProfile, setOpenProfile] = useState(false)
  if (!user) return null
  return (
    <Popover open={openProfile} onOpenChange={setOpenProfile}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded text-sm font-medium text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          onClick={() => setOpenProfile(true)}
        >
          <Avatar className="size-8">
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          {/* {user.fullName} */}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-0">
        <div className="flex flex-col">
          <Link
            onClick={() => setOpenProfile(false)}
            href="/profile"
            className="flex cursor-pointer items-center gap-2 rounded-t-md px-4 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <User className="size-4" />
            {t("profile")}
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpenProfile(false)
              authLogout()
            }}
            className="flex cursor-pointer items-center gap-2 rounded-b-md px-4 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut className="size-4" />
            {t("logout")}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const getNavLinks = (t: any) => {
  return [
    {
      label: t("jobs"),
      href: "/jobs",
      icon: <Briefcase className="size-4" />,
    },
    {
      label: t("websites"),
      href: "/websites",
      icon: <Globe className="size-4" />,
    },
    {
      label: t("scrapeLocally"),
      href: "/scrape-locally",
      icon: <Laptop className="size-4" />,
    },
  ]
}

export default Navbar
