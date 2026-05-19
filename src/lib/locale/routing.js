import { LOCALES, getLocaleFromCountry, getCountryFromRequest } from "@/lib/locale/geo";
import { DEFAULT_LOCALE } from "@/i18n/routing";

const EXCLUDED_PREFIXES = new Set(["api", "admin", "n-admin", "_next", "_vercel"]);
const SITE_URL = "https://www.panaceamedcare.com";

/**
 * Strip /en, /ar, /fr from the start of a pathname.
 */
export function stripLocaleFromPath(pathname) {
  const segments = (pathname || "/").split("/").filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname?.startsWith("/") ? pathname : `/${pathname || ""}`;
}

/**
 * Build a public URL path for a locale.
 * en → /hospitals/foo  |  fr → /fr/hospitals/foo  |  ar → /ar/hospitals/foo
 */
export function localePath(locale, path = "/") {
  const safeLocale = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  let normalized = path || "/";
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = stripLocaleFromPath(normalized);

  if (safeLocale === DEFAULT_LOCALE) {
    return normalized === "/" ? "/" : normalized;
  }
  if (normalized === "/") return `/${safeLocale}`;
  return `/${safeLocale}${normalized}`;
}

/** Full canonical URL for metadata */
export function siteUrl(locale, path = "/") {
  const p = localePath(locale, path);
  return `${SITE_URL}${p === "/" ? "" : p}`;
}

/** hreflang alternates for page metadata */
export function alternateLanguages(path = "/") {
  return {
    en: siteUrl("en", path),
    fr: siteUrl("fr", path),
    ar: siteUrl("ar", path),
  };
}

/**
 * Paths without a locale prefix that need /ar or /fr when geo/manual prefers those locales.
 * English (default) uses unprefixed URLs — no redirect to /en.
 */
export function pathNeedsLocalePrefix(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;
  if (LOCALES.includes(segments[0])) return false;
  if (EXCLUDED_PREFIXES.has(segments[0])) return false;
  return true;
}

export function buildLocalizedPath(pathname, locale) {
  return localePath(locale, stripLocaleFromPath(pathname));
}

export function getPreferredLocaleForRedirect(request, isManualLocale) {
  if (isManualLocale) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (LOCALES.includes(cookieLocale)) return cookieLocale;
  }

  const country = getCountryFromRequest(request);
  if (country) return getLocaleFromCountry(country);

  return DEFAULT_LOCALE;
}
