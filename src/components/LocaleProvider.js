// src/components/LocaleProvider.js
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LocaleProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Get locale from pathname
    const pathLocale = pathname?.split("/").filter(Boolean)[0];
    const validLocales = ["en", "ar", "fr"];
    const currentLocale = validLocales.includes(pathLocale) ? pathLocale : "en";

    // Sync localStorage and cookie with current locale from URL
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-locale", currentLocale);
      document.cookie = `NEXT_LOCALE=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    const dir = currentLocale === "ar" ? "rtl" : "ltr";
    const fontClass = currentLocale === "ar" ? "font-rtl" : "font-ltr";

    document.documentElement.lang = currentLocale;
    document.documentElement.dir = dir;
    document.body.className = fontClass;
  }, [pathname]);

  return <>{children}</>;
}
