import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
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
  ...routing,
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

/** Legacy /en/* → /* (301) for SEO — English lives at root */
function redirectLegacyEnPrefix(request) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/en")) return null;
  if (pathname === "/en") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  return null;
}

const HOSPITAL_IMAGE_RE =
  /^\/(en|ar|fr)\/hospitals\/(.+\.(?:jpe?g|png|webp|avif|gif))$/i;

/** Wrong img URLs like /en/hospitals/foo.jpg → /hospitals/foo.jpg */
function rewriteLocaleHospitalImage(request) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(HOSPITAL_IMAGE_RE);
  if (!match) return null;
  const url = request.nextUrl.clone();
  url.pathname = `/hospitals/${match[2]}`;
  return NextResponse.rewrite(url);
}

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  const legacyEn = redirectLegacyEnPrefix(request);
  if (legacyEn) return legacyEn;

  const imageRewrite = rewriteLocaleHospitalImage(request);
  if (imageRewrite) return imageRewrite;

  const manual = isManualLocale(request);

  if (pathNeedsLocalePrefix(pathname)) {
    const locale = getPreferredLocaleForRedirect(request, manual);
    if (locale !== "en") {
      const url = request.nextUrl.clone();
      url.pathname = buildLocalizedPath(pathname, locale);
      const response = NextResponse.redirect(url, 308);
      applyLocaleCookies(response, locale, manual);
      return response;
    }
  }

  if (manual) {
    const response = intlMiddleware(request);
    const pathLocale = getLocaleFromPath(pathname);
    applyLocaleCookies(response, pathLocale, true);
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

    if (pathLocale !== geoLocale) {
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
  applyLocaleCookies(response, pathLocale, false);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
    "/(en|ar|fr)/hospitals/:path*",
  ],
};
