import { LOCALES, getLocaleFromCountry, getCountryFromRequest } from "@/lib/locale/geo";

const EXCLUDED_PREFIXES = new Set(["api", "admin", "n-admin", "_next", "_vercel"]);

/**
 * Public URLs must start with /en, /ar, or /fr (e.g. /en/doctors/id — not /doctors/id).
 */
export function pathNeedsLocalePrefix(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return true;
  if (LOCALES.includes(segments[0])) return false;
  if (EXCLUDED_PREFIXES.has(segments[0])) return false;
  return true;
}

export function buildLocalizedPath(pathname, locale) {
  const safeLocale = LOCALES.includes(locale) ? locale : "en";
  if (!pathname || pathname === "/") {
    return `/${safeLocale}`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${safeLocale}${path}`;
}

/**
 * Locale used when redirecting legacy URLs without a prefix (e.g. /doctors/x → /en/doctors/x).
 */
export function getPreferredLocaleForRedirect(request, isManualLocale) {
  if (isManualLocale) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (LOCALES.includes(cookieLocale)) return cookieLocale;
  }

  const country = getCountryFromRequest(request);
  if (country) return getLocaleFromCountry(country);

  return "en";
}
