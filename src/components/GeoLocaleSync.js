"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  GEO_COUNTRY_COOKIE,
  getLocaleFromCountry,
  switchPathLocale,
  LOCALES,
} from "@/lib/locale/geo";

const MANUAL_COOKIE = "locale_manual";
/** Short cache only to avoid duplicate calls in the same second */
const REFETCH_MS = 45 * 1000;

function hasCookie(name) {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${name}=`));
}

function setGeoCountryCookie(countryCode) {
  const maxAge = 60 * 10;
  document.cookie = `${GEO_COUNTRY_COOKIE}=${countryCode}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

async function fetchCountryFromIp() {
  let code = "";

  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.success !== false) {
        code = String(data?.country_code || "").trim().toUpperCase();
      }
    }
  } catch {
    /* fallback */
  }

  if (!code) {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) throw new Error("geo lookup failed");
    const data = await res.json();
    code = String(data?.country_code || "").trim().toUpperCase();
  }

  if (!code) throw new Error("no country code");
  return code;
}

export default function GeoLocaleSync() {
  const pathname = usePathname();
  const lastFetchRef = useRef(0);
  const inflightRef = useRef(null);

  useEffect(() => {
    if (hasCookie(MANUAL_COOKIE)) return;

    let cancelled = false;

    const syncLocale = async (force = false) => {
      if (inflightRef.current) return inflightRef.current;

      const run = (async () => {
        const now = Date.now();
        if (!force && now - lastFetchRef.current < REFETCH_MS) {
          return;
        }

        const countryCode = await fetchCountryFromIp();
        if (cancelled) return;

        lastFetchRef.current = Date.now();
        setGeoCountryCookie(countryCode);

        const geoLocale = getLocaleFromCountry(countryCode);
        const pathLocale = pathname?.split("/").filter(Boolean)[0];
        const currentLocale = LOCALES.includes(pathLocale) ? pathLocale : "en";

        if (geoLocale !== currentLocale) {
          const nextPath = switchPathLocale(pathname || "/", geoLocale);
          window.location.replace(nextPath);
        }
      })();

      inflightRef.current = run;
      try {
        await run;
      } catch {
        /* keep current locale */
      } finally {
        inflightRef.current = null;
      }
    };

    syncLocale(true);

    const onFocus = () => syncLocale(true);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        syncLocale(true);
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname]);

  return null;
}
