'use server'

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
// TODO: Testing for now
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validateFields.data as { email: string; password: string }
  try {
    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        case "EmailSignInError":
          return { error: "Email not verified!" }
        case "InvalidProvider":
          return { error: "Invalid provider!" }
        default:
          return { error: "An error occurred!" }
      }
    } throw error;
  }
};
