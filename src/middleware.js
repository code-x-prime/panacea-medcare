import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Port 3000 fix — koi bhi redirect mein :3000 ho to hata do (Sirf production mein)
function fixRedirect(request, response) {
  if ([301, 302, 307, 308].includes(response.status)) {
    const location = response.headers.get('location');
    if (location && location.includes(':3000')) {
      const host = request.headers.get('host') || "";
      // Agar local environment hai (localhost), toh redirect mein :3000 rehne do
      if (host.includes('localhost')) {
        return response;
      }
      const fixed = location.replace(':3000', '');
      return NextResponse.redirect(new URL(fixed, request.url), response.status);
    }
  }
  return response;
}

const intlMiddleware = createMiddleware({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: 'always'
});

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Skip paths that shouldn't be processed by i18n
  if (pathname.startsWith('/blog') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/n-admin')) {

    // Admin session check
    if (pathname.startsWith('/admin') && !pathname.startsWith('/n-admin')) {
      const sessionToken = request.cookies.get('admin_session')?.value;
      if (!sessionToken) {
        return NextResponse.redirect(new URL('/n-admin/auth', request.url));
      }
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(sessionToken, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL('/n-admin/auth', request.url));
      }
    }
    return NextResponse.next();
  }

  const validLocales = ["en", "ar", "fr"];
  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  // 2. Handle locale prefixing and cookie syncing
  if (validLocales.includes(firstSegment)) {
    // URL has a valid locale, sync the cookie if needed
    const response = intlMiddleware(request);
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;

    if (savedLocale !== firstSegment) {
      response.cookies.set("NEXT_LOCALE", firstSegment, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }
    return fixRedirect(request, response);
  }

  // 3. No valid locale in URL, let next-intl handle it (it will use cookie/headers and prefix 'always')
  return fixRedirect(request, intlMiddleware(request));
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|blog|.*\\..*).*)"],
};