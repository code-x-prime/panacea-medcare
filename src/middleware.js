import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar", "fr"],

  // Used when no locale matches
  defaultLocale: "en",

  // Enable locale detection from cookies/headers
  localeDetection: true,
});

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/n-admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/n-admin/auth', request.url));
    }

    try {
      // Verify JWT token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(sessionToken, secret);

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/n-admin/auth', request.url));
    }
  }

  // Skip intl middleware for all admin routes (including login)
  if (pathname.startsWith('/admin') || pathname.startsWith('/n-admin')) {
    return NextResponse.next();
  }

  // Check for saved locale in cookie
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const validLocales = ["en", "ar", "fr"];

  // If we have a saved locale and user is accessing root or a path without locale
  if (savedLocale && validLocales.includes(savedLocale)) {
    const pathSegments = pathname.split("/").filter(Boolean);
    const firstSegment = pathSegments[0];

    // If path doesn't start with a valid locale, redirect to saved locale
    if (!validLocales.includes(firstSegment)) {
      const newUrl = request.nextUrl.clone();
      // Handle root path
      if (pathname === "/" || pathname === "") {
        newUrl.pathname = `/${savedLocale}`;
      } else {
        newUrl.pathname = `/${savedLocale}${pathname}`;
      }
      return NextResponse.redirect(newUrl);
    }

    // If path has a different locale than saved, update cookie to match current path
    if (firstSegment !== savedLocale && validLocales.includes(firstSegment)) {
      const response = intlMiddleware(request);
      response.cookies.set("NEXT_LOCALE", firstSegment, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return response;
    }
  }

  // Use next-intl middleware for everything else
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
