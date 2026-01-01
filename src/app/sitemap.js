import doctors from "@/data/doctors.json";
import caseStudies from "@/data/caseStudies.json";

export default function sitemap() {
    const baseUrl = 'https://panaceamedcare.com';
    const locales = ['en', 'ar', 'fr'];

    // Static routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/case-studies',
        '/consent',
        '/consult-online',
        '/contact',
        '/doctors',
        '/equipment',
        '/faq',
        '/hospitals',
        '/international-patients',
        '/our-offices',
        '/partner-with-us',
        '/privacy',
        '/services',
        '/terms',
        '/tourism-leisure',
        '/treatment-packages',
        '/treatments',
        '/why-india',
    ];

    // Services sub-pages
    const services = [
        'ai-solutions',
        'medical-tourism',
        'tele-pathology',
        'tele-radiology',
        'teleconsultation'
    ];

    // Treatment sub-pages
    const treatments = [
        'aesthetic',
        'ayurveda',
        'bmt',
        'cardiac',
        'dental',
        'diagnostics',
        'gastroenterology',
        'gynecology',
        'laparoscopic',
        'mental-health',
        'neurosurgery',
        'oncology',
        'ophthalmology',
        'organ-transplant',
        'orthopedics',
        'pediatrics',
        'rehabilitation',
        'robotic'
    ];

    // Hospital slugs (extracted from hospitals/page.js)
    const hospitals = [
        // Delhi NCR
        "asian-hospital-delhi",
        "marengo-asia-hospital-gurgaon",
        "indraprastha-apollo-hospital-new-delhi",
        "fortis-hospital-gurgaon",
        "max-hospital-saket",
        "blk-max-hospital-pusa-road",
        "medanta-hospital-gurgaon",
        "neelkanth-maternity-ivf-hospital-gurgaon",
        "manipal-hospital-dwarka",
        // Chennai
        "apollo-hospital-greams-road-chennai",
        // Mumbai
        "stem-rx-hospital-mumbai",
        "apollo-hospital-mumbai",
        "fortis-hospital-mumbai",
        // Hyderabad
        "tx-hospital-hyderabad",
        "apollo-hospital-hyderabad",
        // International
        "memorial-hospital-turkey",
        "bumrungrad-hospital-thailand",
        "nepal-mediciti",
    ];

    const sitemapEntries = [];

    // Generate entries for each locale
    locales.forEach(locale => {
        // 1. Static Routes
        routes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });

        // 2. Services
        services.forEach(slug => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/services/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });

        // 3. Treatments
        treatments.forEach(slug => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/treatments/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            });
        });

        // 4. Hospitals (Dynamic)
        hospitals.forEach(slug => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/hospitals/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });

        // 5. Doctors (Dynamic from JSON)
        doctors.forEach(doctor => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/doctors/${doctor.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });

        // 6. Case Studies (Dynamic from JSON)
        caseStudies.forEach(study => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/case-studies/${study.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
