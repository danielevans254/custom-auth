"use server"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import { createHash } from "crypto"
import { db } from "@/utils/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from '@/lib/mail';
import { hashWithSalt } from '@/lib/password-hash';
export const register = async (values: z.infer<typeof RegisterSchema>) => {


  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Something went wrong!" }
  }

  const { email, name, password } = validatedFields.data

  const existingEmail = await getUserByEmail(email)

  if (existingEmail) {
    return { error: "Email is already taken" }
  }

  const hashedPassword = hashWithSalt(password, email)
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(email)

  // TODO: Send Verification Email
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: `Verification email sent.`
  }
}
