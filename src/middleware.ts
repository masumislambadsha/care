import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For now, just pass through - auth is handled in individual pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/booking/:path*",
    "/my-bookings/:path*",
    "/profile/:path*",
    "/caregiver/:path*",
    "/admin/:path*",
  ],
};
