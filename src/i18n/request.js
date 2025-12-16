import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar", "fr"];

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale) ? locale : "en";

  const messages = {
    navbar: (await import(`../../messages/${validLocale}/navbar.json`)).default,
    heroSection: (await import(`../../messages/${validLocale}/heroSection.json`)).default,
    quoteForm: (await import(`../../messages/${validLocale}/quoteForm.json`)).default,
    home: (await import(`../../messages/${validLocale}/home.json`)).default,
    about: (await import(`../../messages/${validLocale}/about.json`)).default,
    internationalPatients: (await import(`../../messages/${validLocale}/internationalPatients.json`)).default,
    contact: (await import(`../../messages/${validLocale}/contact.json`)).default,
    services: (await import(`../../messages/${validLocale}/services.json`)).default,
    teleconsultation: (await import(`../../messages/${validLocale}/teleconsultation.json`)).default,
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
    patientStories: (await import(`../../messages/${validLocale}/patientStories.json`)).default,
    whatsapp: (await import(`../../messages/${validLocale}/whatsapp.json`)).default,
    caseStudies: (await import(`../../messages/${validLocale}/caseStudies.json`)).default,
    blog: (await import(`../../messages/${validLocale}/blog.json`)).default,
    ourOffices: (await import(`../../messages/${validLocale}/ourOffices.json`)).default,
    treatmentPackages: (await import(`../../messages/${validLocale}/treatmentPackages.json`)).default,
    hospitals: (await import(`../../messages/${validLocale}/hospitals.json`)).default,
  };

  return {
    locale: validLocale,
    messages,
  };
});