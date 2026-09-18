import { NextRequest, NextResponse } from "next/server";

const MODE_COOKIE = "talkive-meeting-mode";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const response = NextResponse.next();

  let mode: "general" | "business" | "coding" | null = null;

  if (
    pathname === "/dashboard/business" ||
    pathname.startsWith("/dashboard/business/")
  ) {
    mode = "business";
  } else if (
    pathname === "/dashboard/coding" ||
    pathname.startsWith("/dashboard/coding/")
  ) {
    mode = "coding";
  } else if (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/")
  ) {
    mode = "general";
  }

  const queryMode = searchParams.get("mode");

  if (
    queryMode === "business" ||
    queryMode === "coding" ||
    queryMode === "general"
  ) {
    mode = queryMode;
  }

  if (mode) {
    response.cookies.set(MODE_COOKIE, mode, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/meeting/:path*",
    "/room/:path*",
  ],
};