"use client"

import { useQueryState, parseAsStringLiteral } from "nuqs"
import { AuthFormTabs } from "./authFormTabs"
import { LoginForm } from "./loginForm"
import { SignupForm } from "./signupForm"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const tabParser = parseAsStringLiteral(["login", "signup"]).withDefault("login")

export function AuthFormSection({ className }: { className?: string }) {
  const [tab] = useQueryState("tab", tabParser)
  const t = useTranslations("auth")

  return (
    <section
      className={cn("flex flex-col bg-muted/30 p-8 md:p-10", className)}
      aria-labelledby="auth-form-heading"
    >
      <header className="mb-6 text-center">
        <h1
          id="auth-form-heading"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          {tab === "login" ? t("login.title") : t("signup.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("login.subtitle")}
        </p>
      </header>
      <AuthFormTabs />
      <div className="mt-4">
        {tab === "login" && <LoginForm />}
        {tab === "signup" && <SignupForm />}
      </div>
    </section>
  )
}
