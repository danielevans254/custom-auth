import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import CryptoJS from "crypto-js"
import { getUserByEmail } from "@/data/user"

export default {
  providers: [
    GitHub,
    Credentials({
      async authorize(credentials: any) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const saltedPassword = password + email;
        const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();

        if (hashedPassword === user.password) {
          return user;
        }

        return null;
      },
    }),
  ],
} as NextAuthConfig;
