import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getBaseUrl(request) {
  const host = request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    'www.panaceamedcare.com';
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

// Port 3000 fix — koi bhi redirect mein :3000 ho to hata do
function fixRedirect(response) {
  if ([301, 302, 307, 308].includes(response.status)) {
    const location = response.headers.get('location');
    if (location && location.includes(':3000')) {
      const fixed = location.replace(':3000', '');
      return NextResponse.redirect(fixed, response.status);
    }
  }
  return response;
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
      const newPath = pathname === "/" || pathname === ""
        ? `/${savedLocale}`
        : `/${savedLocale}${pathname}`;
      return NextResponse.redirect(new URL(newPath, getBaseUrl(request)));
    }

    if (firstSegment !== savedLocale && validLocales.includes(firstSegment)) {
      const response = intlMiddleware(request);
      response.cookies.set("NEXT_LOCALE", firstSegment, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return fixRedirect(response);
    }
  }

  return fixRedirect(intlMiddleware(request));
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|blog|.*\\..*).*)"],
};