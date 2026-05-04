import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Fix for nginx proxy — port 3000 redirect problem
function getBaseUrl(request) {
  const host = request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    'www.panaceamedcare.com';
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

const intlMiddleware = createMiddleware({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  localeDetection: true,
});

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/blog')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/n-admin')) {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/n-admin/auth', getBaseUrl(request)));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(sessionToken, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/n-admin/auth', getBaseUrl(request)));
    }
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/n-admin')) {
    return NextResponse.next();
  }

  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const validLocales = ["en", "ar", "fr"];

  if (savedLocale && validLocales.includes(savedLocale)) {
    const pathSegments = pathname.split("/").filter(Boolean);
    const firstSegment = pathSegments[0];

    if (!validLocales.includes(firstSegment)) {
      const newUrl = new URL(
        pathname === "/" || pathname === "" ? `/${savedLocale}` : `/${savedLocale}${pathname}`,
        getBaseUrl(request)
      );
      return NextResponse.redirect(newUrl);
    }

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

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|blog|.*\\..*).*)"],
};