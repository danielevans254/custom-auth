import NextAuth, { User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./utils/db";
import { getUserById } from "./data/user";
import { AdapterUser } from "@auth/core/adapters";
import { UserRole } from "@prisma/client";

// TODO: Fix the types
declare module "next-auth" {
  interface User extends AdapterUser {
    role: string;
    metaData: {
      browserAgent: string;
      ipAddress: string;
      timestamp: number;
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // TODO: Even if the user is already deleted with the same email, from the given provider, the "AuthorizedCallbackError" is still thrown
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // NOTE: This fixed the issue with the "OAuthAccountNotLinked" being thrown when the email provided is already in use with a different provider
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user?.id || "");
      // NOTE: Remove check for now
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
        if (token.metaData) {
          session.user.metaData = {
            ...session.user.metaData,
            ...token.metaData,
          };
        }
      }
      console.log(session, "Session");
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.metaData = {
        browserAgent: token.agent,
        ipAddress: token.ip,
        timestamp: Date.now(),
      };
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      console.log(token, "Token");
      return token;
    },
  },
  ...authConfig,
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
});
