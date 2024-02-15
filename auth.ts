import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./utils/db"
import { getUserById } from "./data/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      // NOTE: Why do you have to specific the token.id as string???
      // TODO: Fix the types  token role & customField...
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        (session.user as any).role = token.role as string
      }
      (session.user as any).customField = token.customField as string[]

      console.log(session.user.id)
      return session
    },
    async jwt({ token }) {
      // TODO: Add custom fields to token
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      token.customField = {
        metaData: {
          browserAgent: token.agent,
          ipAddress: token.ip,
          timestamp: Date.now(),
        },
      }
      console.log(token.sub)
      return token
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  },
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
})