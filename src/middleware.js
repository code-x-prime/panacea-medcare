// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];

  // If path already starts with /en or /ar, continue
  if (locale === "en" || locale === "ar") {
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Skip middleware for admin routes and API routes
  if (
    pathname.startsWith("/n-admin") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api")
  ) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // Check cookie first
  const cookieLang = request.cookies.get("lang")?.value;
  let selectedLocale = "en";

  if (cookieLang === "en" || cookieLang === "ar") {
    selectedLocale = cookieLang;
  } else {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.startsWith("ar")) {
      selectedLocale = "ar";
    }
  }

  // Set cookie and redirect
  const response = NextResponse.redirect(
    new URL(`/${selectedLocale}${pathname}`, request.url)
  );
  response.cookies.set("lang", selectedLocale, { maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
