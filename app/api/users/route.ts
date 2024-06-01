import { NextResponse } from "next/server";
import { db } from "@/utils/db";
// TODO: Make sure only admin can access this api route

export async function GET() {
  try {
    const allUsers = await db.user.findMany();
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.error();
  }
}