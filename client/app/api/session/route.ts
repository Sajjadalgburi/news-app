import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // Awaiting since it's now a Promise
  const token = cookieStore.get("accessToken")?.value;
  return NextResponse.json({ token });
}
