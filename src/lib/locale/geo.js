/** @typedef {'en' | 'ar' | 'fr'} SiteLocale */

export const LOCALES = ["en", "ar", "fr"];

/** ISO 3166-1 alpha-2 → site locale (IP / CDN country header) */
const ARABIC_COUNTRIES = new Set([
  "AE", "SA", "QA", "KW", "BH", "OM", "JO", "LB", "EG", "IQ", "MA", "DZ",
  "TN", "LY", "YE", "SY", "PS", "SD", "MR", "DJ", "KM", "TD", "ER", "SO",
]);

/** Francophone regions → French site */
const FRENCH_COUNTRIES = new Set([
  "FR", "BE", "LU", "MC", "SN", "CI", "ML", "BF", "NE", "TG", "BJ", "GA",
  "CG", "CD", "CM", "MG", "HT", "RW", "BI", "CF", "GN",
]);

/** Bangladesh, India, USA, UK, etc. → English (default when not in AR/FR lists) */

/**
 * @param {import('next/server').NextRequest} request
 * @returns {string | null} ISO country code or null
 */
export const GEO_COUNTRY_COOKIE = "geo_country";

export function getCountryFromRequest(request) {
  const raw =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-geo-country") ||
    request.geo?.country ||
    "";

  const code = String(raw).trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return null;
  return code;
}

/**
 * @param {string | null} countryCode
 * @returns {SiteLocale}
 */
export function getLocaleFromCountry(countryCode) {
  if (!countryCode) return "en";
  if (ARABIC_COUNTRIES.has(countryCode)) return "ar";
  if (FRENCH_COUNTRIES.has(countryCode)) return "fr";
  return "en";
}

/**
 * @param {import('next/server').NextRequest} request
 * @returns {SiteLocale}
 */
export function getGeoLocale(request) {
  return getLocaleFromCountry(getCountryFromRequest(request));
}

/**
 * @param {string} pathname
 * @param {SiteLocale} newLocale
 * @returns {string}
 */
export function switchPathLocale(pathname, newLocale) {
  const segments = pathname.split("/").filter(Boolean);
  let pathWithoutLocale = pathname || "/";

  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    const rest = segments.slice(1).join("/");
    pathWithoutLocale = rest ? `/${rest}` : "/";
  }

  if (newLocale === "en") {
    return pathWithoutLocale === "" ? "/" : pathWithoutLocale;
  }
  if (pathWithoutLocale === "/" || pathWithoutLocale === "") {
    return `/${newLocale}`;
  }
  return `/${newLocale}${pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`}`;
}

/**
 * @param {string} pathname
 * @returns {SiteLocale | null}
 */
export function getLocaleFromPath(pathname) {
  const first = pathname.split("/").filter(Boolean)[0];
  if (LOCALES.includes(first)) return first;
  return "en";
}
