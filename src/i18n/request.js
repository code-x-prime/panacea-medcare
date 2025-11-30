import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar", "fr"];

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale) ? locale : "en";

  const messages = {
    navbar: (await import(`../../messages/${validLocale}/navbar.json`)).default,
    quoteForm: (await import(`../../messages/${validLocale}/quoteForm.json`)).default,
    home: (await import(`../../messages/${validLocale}/home.json`)).default,
    destinations: (await import(`../../messages/${validLocale}/destinations.json`)).default,
    specialties: (await import(`../../messages/${validLocale}/specialties.json`)).default,
    whyChoose: (await import(`../../messages/${validLocale}/whyChoose.json`)).default,
  };

  return {
    locale: validLocale,
    messages,
  };
});