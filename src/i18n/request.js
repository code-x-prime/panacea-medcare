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
    hospitalDetail: (await import(`../../messages/${validLocale}/hospitalDetail.json`)).default,
    networkHospitals: (await import(`../../messages/${validLocale}/networkHospitals.json`)).default,
    lowestQuotes: (await import(`../../messages/${validLocale}/lowestQuotes.json`)).default,
    howWeWork: (await import(`../../messages/${validLocale}/howWeWork.json`)).default,
    ourServices: (await import(`../../messages/${validLocale}/ourServices.json`)).default,
    faq: (await import(`../../messages/${validLocale}/faq.json`)).default,
    footer: (await import(`../../messages/${validLocale}/footer.json`)).default,
    notFound: (await import(`../../messages/${validLocale}/notFound.json`)).default,
    chatbot: (await import(`../../messages/${validLocale}/chatbot.json`)).default,
  };

  return {
    locale: validLocale,
    messages,
  };
});