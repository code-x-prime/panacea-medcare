// src/components/LocaleProvider.js
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import GeoLocaleSync from "@/components/GeoLocaleSync";

const VALID_LOCALES = ["en", "ar", "fr"];

export default function LocaleProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const pathLocale = pathname?.split("/").filter(Boolean)[0];
    const currentLocale = VALID_LOCALES.includes(pathLocale) ? pathLocale : "en";

    const dir = currentLocale === "ar" ? "rtl" : "ltr";
    const fontClass = currentLocale === "ar" ? "font-rtl" : "font-ltr";

    document.documentElement.lang = currentLocale;
    document.documentElement.dir = dir;
    document.body.className = fontClass;
  }, [pathname]);

  return (
    <>
      <GeoLocaleSync />
      {children}
    </>
  );
}
