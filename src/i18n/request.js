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
    contactCTA: (await import(`../../messages/${validLocale}/contactCTA.json`)).default,
    services: (await import(`../../messages/${validLocale}/services.json`)).default,
    teleconsultation: (await import(`../../messages/${validLocale}/teleconsultation.json`)).default,
    destinations: (await import(`../../messages/${validLocale}/destinations.json`)).default,
    specialties: (await import(`../../messages/${validLocale}/specialties.json`)).default,
    whyChoose: (await import(`../../messages/${validLocale}/whyChoose.json`)).default,
    whyIndia: (await import(`../../messages/${validLocale}/whyIndia.json`)).default,
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
    treatments: (await import(`../../messages/${validLocale}/treatments.json`)).default,
    treatmentsCardiac: (await import(`../../messages/${validLocale}/treatmentsCardiac.json`)).default,
    treatmentsOncology: (await import(`../../messages/${validLocale}/treatmentsOncology.json`)).default,
    treatmentsBMT: (await import(`../../messages/${validLocale}/treatmentsBMT.json`)).default,
    treatmentsOrthopedics: (await import(`../../messages/${validLocale}/treatmentsOrthopedics.json`)).default,
    treatmentsNeurosurgery: (await import(`../../messages/${validLocale}/treatmentsNeurosurgery.json`)).default,
    treatmentsRobotic: (await import(`../../messages/${validLocale}/treatmentsRobotic.json`)).default,
    treatmentsOrganTransplant: (await import(`../../messages/${validLocale}/treatmentsOrganTransplant.json`)).default,
    treatmentsGastroenterology: (await import(`../../messages/${validLocale}/treatmentsGastroenterology.json`)).default,
    treatmentsGynecology: (await import(`../../messages/${validLocale}/treatmentsGynecology.json`)).default,
    treatmentsPediatrics: (await import(`../../messages/${validLocale}/treatmentsPediatrics.json`)).default,
    treatmentsLaparoscopic: (await import(`../../messages/${validLocale}/treatmentsLaparoscopic.json`)).default,
    treatmentsOphthalmology: (await import(`../../messages/${validLocale}/treatmentsOphthalmology.json`)).default,
    treatmentsDental: (await import(`../../messages/${validLocale}/treatmentsDental.json`)).default,
    treatmentsAesthetic: (await import(`../../messages/${validLocale}/treatmentsAesthetic.json`)).default,
    treatmentsMentalHealth: (await import(`../../messages/${validLocale}/treatmentsMentalHealth.json`)).default,
    treatmentsDiagnostics: (await import(`../../messages/${validLocale}/treatmentsDiagnostics.json`)).default,
    treatmentsRehabilitation: (await import(`../../messages/${validLocale}/treatmentsRehabilitation.json`)).default,
    treatmentsAyurveda: (await import(`../../messages/${validLocale}/treatmentsAyurveda.json`)).default,
    tourismLeisure: (await import(`../../messages/${validLocale}/tourismLeisure.json`)).default,
    partnerWithUs: (await import(`../../messages/${validLocale}/partnerWithUs.json`)).default,
  };

  return {
    locale: validLocale,
    messages,
  };
});