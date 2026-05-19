import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import {
  LOCALES,
  getGeoLocale,
  getLocaleFromPath,
  switchPathLocale,
} from "@/lib/locale/geo";
import {
  pathNeedsLocalePrefix,
  buildLocalizedPath,
  getPreferredLocaleForRedirect,
} from "@/lib/locale/routing";

const LOCALE_COOKIE = "NEXT_LOCALE";
const MANUAL_COOKIE = "locale_manual";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

function isManualLocale(request) {
  return request.cookies.get(MANUAL_COOKIE)?.value === "1";
}

function applyLocaleCookies(response, locale, manual) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  if (manual) {
    response.cookies.set(MANUAL_COOKIE, "1", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
}

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const manual = isManualLocale(request);

  if (pathNeedsLocalePrefix(pathname)) {
    const locale = getPreferredLocaleForRedirect(request, manual);
    const url = request.nextUrl.clone();
    url.pathname = buildLocalizedPath(pathname, locale);
    const response = NextResponse.redirect(url, 308);
    applyLocaleCookies(response, locale, manual);
    return response;
  }

  if (manual) {
    const response = intlMiddleware(request);
    const pathLocale = getLocaleFromPath(pathname);
    if (pathLocale) {
      applyLocaleCookies(response, pathLocale, true);
    }
    return response;
  }

  const countryCode =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country-code");
  const hasCdnGeo = Boolean(
    countryCode && countryCode !== "XX" && countryCode !== "T1"
  );

  if (hasCdnGeo) {
    const geoLocale = getGeoLocale(request);
    const pathLocale = getLocaleFromPath(pathname);

    if (!pathLocale || pathLocale !== geoLocale) {
      const url = request.nextUrl.clone();
      url.pathname = switchPathLocale(pathname, geoLocale);
      const response = NextResponse.redirect(url, 308);
      applyLocaleCookies(response, geoLocale, false);
      return response;
    }

    const response = intlMiddleware(request);
    applyLocaleCookies(response, geoLocale, false);
    return response;
  }

  const response = intlMiddleware(request);
  const pathLocale = getLocaleFromPath(pathname);
  if (pathLocale) {
    applyLocaleCookies(response, pathLocale, false);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
