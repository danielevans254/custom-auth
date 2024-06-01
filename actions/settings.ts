"use server";

import { SettingsSchema } from "@/schemas";
import * as z from "zod";

import { db } from "@/utils/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {

  const user = await currentUser();

  if (!user) {
    return { error: "You are not logged in!" }
  }

  const dbUser = await getUserById(user.id || "");

  if (!dbUser) {
    return { error: "User not found!" }
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values
    }
  })
  return { success: "Settings updated!" }
}


