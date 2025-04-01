import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function GET() {
  const token: string | undefined = (await cookies()).get("accessToken")?.value;
  return NextResponse.json({ token });
}
