import { db } from "@/utils/db";

export const getAccountByUserId = async (userId: string) => {

  try {
    const account = await db.account.findFirst({
      where: {
        userId
      }
    })
    return account;
  } catch (error) {
    console.error("Account not found", error)
  }

}