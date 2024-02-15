"use server"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import { createHash } from "crypto"
import { db } from "@/utils/db"
import { getUserByEmail } from "@/data/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  const hashWithSalt = (password: string, salt: string): string => {
    const hash = createHash("sha256")
    hash.update(password + salt)
    return hash.digest("hex")
  }

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
  console.log(hashedPassword)
  await db.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    }
  })

  // TODO: Send Verification Email

  return {
    success: `Please verify your email to continue.`
  }
}
