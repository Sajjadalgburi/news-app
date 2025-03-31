import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  const pathName = request.nextUrl.pathname;

  const isAuthPage =
    pathName.startsWith("/login") || pathName.startsWith("/register");

  // If user is logged in and trying to access login/register, redirect to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // Allow request to proceed
  return NextResponse.next();
}
