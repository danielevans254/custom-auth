import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import CryptoJS from "crypto-js"
import { getUserByEmail } from "@/data/user"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { hashWithSalt } from '@/lib/password-hash';

export default {

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }
          // Convert email to lowercase because the email is stored in lowercase, and the password is salted with the email.
          const hashedPassword = hashWithSalt(password, email)

          if (hashedPassword === user.password) {
            return user;
          }
          return null;
        }
      },
    }),
  ],
} as NextAuthConfig;
