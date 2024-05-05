'use server'

import * as z from "zod"
import { db } from "@/utils/db";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { SetNewPasswordSchema } from "@/schemas";
import { hashWithSalt } from "@/lib/password-hash";

export const setNewPassword = async (values: z.infer<typeof SetNewPasswordSchema>, token: string | null) => {

  if (!token) return { error: "Missing token" }

  const validatedFields = SetNewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords don't match!" }
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "Token doesn't exist" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token expired" }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email doesn't exist" }
  }

  const hashedPassword = hashWithSalt(password, existingToken.email)

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  await db.resetPasswordToken.delete({
    where: {
      id: existingToken.id
    }
  })

  return { success: "Password updated successfully" }
}


