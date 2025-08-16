import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  if (!token) {
    url.pathname = "Auth/login"; // Change this to your login page
    return NextResponse.redirect(url);
  }
//    const role = token.
  if (request.nextUrl.pathname === url.pathname) {
        return NextResponse.next();
    }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/app/Admin/:path*", "/app/Application/:path*"],
};
