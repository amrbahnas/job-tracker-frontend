"use client"
import DarkModeToggle from "@/components/common/darkModeToggle"
import { LanguageToggle } from "@/components/common/language-toggle"
import Logo from "@/components/common/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Container from "@/components/ui/container"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthControl } from "@/hooks/useAuthControl"
import { cn } from "@/lib/utils"
import useAppStore from "@/store/useAppStore"
import { Briefcase, Globe, Laptop, LogOut, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useTranslations } from "next-intl"

const Navbar = () => {
  const t = useTranslations("common.navbar")
  const [openProfile, setOpenProfile] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const user = useAppStore((s) => s.user)
  const { authLogout } = useAuthControl()
  const pathname = usePathname()

  const NAV_LINKS = [
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

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-background">
      <Container className="flex items-center justify-between gap-6 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile: burger + drawer */}
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            direction="left"
          >
            <DrawerTrigger asChild>
              <button
                type="button"
                className="text-foreground hover:bg-muted md:hidden"
                aria-label={t("openMenu")}
              >
                <Menu className="size-5" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="flex h-full max-w-[280px] flex-col rounded-e-xl border-e">
              <DrawerHeader className="gap-3 pb-8">
                {user && (
                  <Link href="/profile" className="flex items-center gap-3">
                    <Avatar className="size-12 shrink-0">
                      <AvatarFallback className="text-base">
                        {user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">
                        {user.fullName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </Link>
                )}
              </DrawerHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-auto px-4">
                {NAV_LINKS.map((link) => (
                  <DrawerClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                        pathname === link.href &&
                          "bg-primary/10 text-primary hover:bg-primary/15"
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </DrawerClose>
                ))}
              </nav>
              <DrawerFooter className="border-t pt-4">
                <DrawerClose asChild>
                  <button
                    type="button"
                    onClick={() => authLogout()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <LogOut className="size-5 text-red-500" />
                    {t("signOut")}
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Link href="/jobs" className="flex items-center gap-3">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          {/* Desktop nav links */}
          <div className="text-md hidden items-center gap-6 md:flex">
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
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <DarkModeToggle />
          {user && (
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
          )}
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
