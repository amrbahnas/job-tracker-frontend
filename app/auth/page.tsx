import Auth from "./_comps"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in or create a free Dorly account to track job applications and get new role alerts from LinkedIn, Indeed, and Bayt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/auth" },
}

export default function AuthPage() {
  return <Auth />
}
