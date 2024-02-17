import NextAuth, { User } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./utils/db";
import { getUserById } from "./data/user";
import { AdapterUser } from "@auth/core/adapters";

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
    async signIn({ user }) {
      const existingUser = await getUserById(user?.id || "");
      // NOTE: Remove check for now
      if (!existingUser || !existingUser.emailVerified) return false;
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as string;
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
      token.role = existingUser.role;
      token.metaData = {
        browserAgent: token.agent,
        ipAddress: token.ip,
        timestamp: Date.now(),
      };
      console.log(token, "Token");
      return token;
    },
  },
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
