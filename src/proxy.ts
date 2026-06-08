import { NextRequest, NextResponse } from "next/server";

// Route protection for admin dashboard — Next.js 16 "proxy" convention
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/dashboard")) {
    // Supabase stores session in sb-* cookies
    const hasSession = Array.from(request.cookies.getAll()).some(
      (cookie) =>
        cookie.name.startsWith("sb-") &&
        cookie.name.endsWith("-auth-token")
    );

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isDemoMode = !supabaseUrl || supabaseUrl === "your-supabase-url";

    if (!isDemoMode && !hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
