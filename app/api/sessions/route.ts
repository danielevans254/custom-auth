import { NextResponse } from "next/server";
import { db } from "@/utils/db";

// TODO: 
// FIXME: apparently im not actually storing the session in the database this is fine however this can be helpful to know users problems, and could be good to save these sessions, if expired store it somewhere else

export async function GET() {
  try {
    const allSessions = await db.session.findMany();
    return NextResponse.json(allSessions)
  } catch (error) {
    console.error("Error retrieving sessions:", error);
    return NextResponse.error();
  }
}