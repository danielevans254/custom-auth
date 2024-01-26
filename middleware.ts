import authConfig from "./auth.config"
import NextAuth from "next-auth"
export const { auth: middleware } = NextAuth(authConfig)

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth)
  console.log("Path", req.nextUrl.pathname)
  console.log(isLoggedIn)
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}