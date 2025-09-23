import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Avoid running middleware on the login page
    if (req.nextUrl.pathname === "/auth/login") {
      return NextResponse.next();
    }

    // Redirect unauthorized users
    if (isAdminRoute && !isAdmin) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
      pages:{
          signIn: '/auth/login',
      }
  }
);

export const config = {
  matcher: ["/admin/:path*"], // Matches all /admin paths except /admin/login
};
