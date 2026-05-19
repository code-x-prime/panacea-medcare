"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  GEO_COUNTRY_COOKIE,
  getLocaleFromCountry,
  switchPathLocale,
  LOCALES,
} from "@/lib/locale/geo";

const MANUAL_COOKIE = "locale_manual";
const COUNTRY_SESSION_KEY = "pm_geo_country";
const CHECK_TIME_KEY = "pm_geo_checked_at";
/** Re-check after this interval (VPN change / new tab) */
const RECHECK_MS = 2 * 60 * 1000;

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function hasCookie(name) {
  return getCookie(name) != null;
}

function setGeoCountryCookie(countryCode) {
  document.cookie = `${GEO_COUNTRY_COOKIE}=${countryCode}; path=/; max-age=${60 * 30}; SameSite=Lax`;
}

async function tryJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Browser-side first (respects VPN). Server /api/geo only when CDN header exists.
 */
async function detectCountryCode() {
  const geoJs = await tryJson("https://get.geojs.io/v1/ip/country.json");
  if (geoJs?.country) {
    return String(geoJs.country).trim().toUpperCase();
  }

  const whois = await tryJson("https://ipwho.is/");
  if (whois?.success !== false && whois?.country_code) {
    return String(whois.country_code).trim().toUpperCase();
  }

  const api = await tryJson("/api/geo");
  if (api?.countryCode) {
    return String(api.countryCode).trim().toUpperCase();
  }

  return null;
}

function getPathLocale(pathname) {
  const first = pathname?.split("/").filter(Boolean)[0];
  return LOCALES.includes(first) ? first : "en";
}

function shouldSkipCheck(pathLocale) {
  const lastAt = Number(sessionStorage.getItem(CHECK_TIME_KEY) || 0);
  const lastCountry = sessionStorage.getItem(COUNTRY_SESSION_KEY);
  if (!lastAt || !lastCountry) return false;
  if (Date.now() - lastAt > RECHECK_MS) return false;
  return getLocaleFromCountry(lastCountry) === pathLocale;
}

export default function GeoLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (hasCookie(MANUAL_COOKIE)) return;

    const pathLocale = getPathLocale(pathname);
    if (shouldSkipCheck(pathLocale)) return;

    let cancelled = false;

    const sync = async () => {
      const countryCode = await detectCountryCode();
      if (cancelled || !countryCode) return;

      const geoLocale = getLocaleFromCountry(countryCode);
      const prevCountry = sessionStorage.getItem(COUNTRY_SESSION_KEY);

      setGeoCountryCookie(countryCode);
      sessionStorage.setItem(COUNTRY_SESSION_KEY, countryCode);
      sessionStorage.setItem(CHECK_TIME_KEY, String(Date.now()));

      if (geoLocale !== pathLocale) {
        const nextPath = switchPathLocale(pathname || "/", geoLocale);
        window.location.replace(nextPath);
        return;
      }

      if (prevCountry && prevCountry !== countryCode) {
        const prevLocale = getLocaleFromCountry(prevCountry);
        if (prevLocale !== geoLocale) {
          const nextPath = switchPathLocale(pathname || "/", geoLocale);
          window.location.replace(nextPath);
        }
      }
    };

    const timer = setTimeout(sync, 150);

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const lastAt = Number(sessionStorage.getItem(CHECK_TIME_KEY) || 0);
      if (Date.now() - lastAt < RECHECK_MS) return;
      sync();
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname]);

  return null;
}
