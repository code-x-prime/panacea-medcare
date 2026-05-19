import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  /** English: /about — French/Arabic: /fr/about, /ar/about */
  localePrefix: "as-needed",
});

export const DEFAULT_LOCALE = routing.defaultLocale;
