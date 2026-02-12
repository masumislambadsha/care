export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/booking/:path*",
    "/my-bookings/:path*",
    "/profile/:path*",
    "/caregiver/:path*",
    "/admin/:path*",
  ],
};
