'use server'

import * as z from "zod"

import { ResetPasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/password-token"

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validateFields = ResetPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid email!" }
  }
  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email) {
    return { error: "Email not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return {
    success: `Reset email link sent`
  }
}