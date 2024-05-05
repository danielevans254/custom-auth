'use server'

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
// TODO: Testing for now
// TODO: If the user somehow manages to not click the link for the verification email and it expires 1 hour, we should have a way to resend the verification email
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }
  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email not found!" }
  }

  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    console.log(verificationToken, "Verification Token")

    const timer = setTimeout(() => {
      console.log('This is taking longer than expected...');
      return { error: "This is taking longer than expected..." }
    }, 5000);

    try {
      await sendVerificationEmail(verificationToken.email, verificationToken.token)
      clearTimeout(timer);
    } catch (error) {
      // If there's an error in sending the email, clear the timer
      clearTimeout(timer);
      console.error(error);
    }
    return {
      error: `Please verify your email!`
    }
  }

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
        // NOTE: This is thrown when the signIn callback returns false, that's the expected behavior, however when a given provider is already active, i.e (github, google, etc) and the user is deleted, the "AuthorizedCallbackError" is still thrown, even if the user is deleted, and the email is not verified, the "AuthorizedCallbackError" is still thrown, so we need to handle this error correctly
        case "AuthorizedCallbackError":
          return { error: "Email not verified!" }
        case "InvalidProvider":
          return { error: "Invalid provider!" }
        case "OAuthCallbackError":
          return { error: "OAuthCallbackError occurred!" }
        case "OAuthAccountNotLinked":
          return { error: "Email in use already with a different provider" }
        // TODO: Im not sure what other errors this gets triggered on the callback, but for now. I know if the signin callback returns false, it will throw this error
        default:
          return { error: "An error occurred!" }
      }
    } throw error;
  }
};
