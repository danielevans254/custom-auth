/**
 * An array of routes that can be accessed by logged out users
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/settings"
]

/**
 * An array of routes that can only accessed by logged in users
 * @type {string[]}
*/
export const privateRoutes: string[] = [
  "/about"
]

/**
 * An array of routes for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
  "/register"
]

/**
 * Prefix for API Auth routes
 * @type {string}
 */
export const apiApiPrefix: string = "/api/auth"

/**
 * This will be where signed in users will be redirected
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/"

/**
 * This will be where signed in users will be redirected
 * @type {string}
 */
// TODO: Create the onboarding page
export const DEFAULT_REGISTER_REDIRECT: string = "/onboard"