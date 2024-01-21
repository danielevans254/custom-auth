'use server'

import { LoginSchema } from "@/schemas"
import * as z from "zod"

// TODO: Testing for now
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }

  return { success: "Email Sent!" }
};
