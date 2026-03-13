import { AuthFooter } from "./_comps/authFooter"
import { AuthHeader } from "./_comps/authHeader"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col gap-6 bg-muted/30">
      <AuthHeader />
      {children}
      <AuthFooter />
    </div>
  )
}
