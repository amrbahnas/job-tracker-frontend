import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { serverQuery } from "./api_config/serverQuery"

const protectedRoutes = ["/jobs", "/websites", "/profile", "/scrape-locally"]

async function isTokenValid(token: string) {
  const { error, data } = await serverQuery("/profile", {
    headers: {
      Cookie: `job_tracker_token=${token}`,
    },
  })
  return !error && data?.isActive
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const store = await cookies()
  const token = store.get("job_tracker_token")?.value

  // If user has a token, validate it with backend before treating as authenticated
  let isAuthenticated = false
  if (token) {
    isAuthenticated = await isTokenValid(token)
  }

  // Try to access auth pages while logged in (only if token is valid)
  if (!protectedRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/jobs", request.url))
  }

  // Try to access protected routes without valid auth (no token or invalid token)
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    store.delete("job_tracker_token")
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.[^/]*$).*)"],
}
