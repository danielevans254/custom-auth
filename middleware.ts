import authConfig from "./auth.config"
import NextAuth from "next-auth"

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
} from "@/routes"

const { auth } = NextAuth(authConfig)
// NOTE: We can add more routes, based on different roles, for example, we can have an admin route, that only allows admin users to access, super admin, etc.
// TODO: Tf is this error?
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthPrefixRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthPrefixRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.toString()))
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackURL = nextUrl.pathname;
    if (nextUrl.search) {
      callbackURL += nextUrl.search;
    }
    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return Response.redirect(new URL(`/login?${encodedCallbackURL}`, nextUrl.toString()));
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}