import doctors from "@/data/doctors.json";
import caseStudies from "@/data/caseStudies.json";
import { localePath } from "@/lib/locale/routing";

export default function sitemap() {
    const baseUrl = "https://www.panaceamedcare.com";
    const locales = ["en", "ar", "fr"];

    const routes = [
        "",
        "/about",
        "/blog",
        "/case-studies",
        "/consent",
        "/consult-online",
        "/contact",
        "/doctors",
        "/faq",
        "/hospitals",
        "/international-patients",
        "/our-offices",
        "/partner-with-us",
        "/privacy",
        "/disclaimer",
        "/cookies",
        "/services",
        "/terms",
        "/tourism-leisure",
        "/treatment-packages",
        "/treatments",
        "/why-india",
    ];

    const services = [
        "ai-solutions",
        "medical-tourism",
        "tele-pathology",
        "tele-radiology",
        "teleconsultation",
    ];

    const treatments = [
        "aesthetic",
        "ayurveda",
        "bmt",
        "cardiac",
        "dental",
        "diagnostics",
        "gastroenterology",
        "gynecology",
        "laparoscopic",
        "mental-health",
        "neurosurgery",
        "oncology",
        "ophthalmology",
        "organ-transplant",
        "orthopedics",
        "pediatrics",
        "rehabilitation",
        "robotic",
    ];

    const tourismDestinations = ["agra", "kerala", "goa", "rajasthan"];

    const hospitals = [
        "asian-hospital-delhi",
        "marengo-asia-hospital-gurgaon",
        "indraprastha-apollo-hospital-new-delhi",
        "fortis-hospital-gurgaon",
        "max-hospital-saket",
        "blk-max-hospital-pusa-road",
        "medanta-hospital-gurgaon",
        "neelkanth-maternity-ivf-hospital-gurgaon",
        "manipal-hospital-dwarka",
        "metro-hospital-faridabad",
        "rashi-dental-clinic-gurgaon",
        "yatharth-hospital-greater-noida",
        "apollo-hospital-greams-road-chennai",
        "stem-rx-hospital-mumbai",
        "apollo-hospital-mumbai",
        "fortis-hospital-mumbai",
        "tx-hospital-hyderabad",
        "apollo-hospital-hyderabad",
        "memorial-hospital-turkey",
        "bumrungrad-hospital-thailand",
        "nepal-mediciti",
    ];

    const sitemapEntries = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            const path = localePath(locale, route || "/");
            sitemapEntries.push({
                url: `${baseUrl}${path === "/" ? "" : path}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: route === "" ? 1.0 : 0.8,
            });
        });

        services.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/services/${slug}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            });
        });

        treatments.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/treatments/${slug}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            });
        });

        tourismDestinations.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/tourism-leisure/${slug}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });

        hospitals.forEach((slug) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/hospitals/${slug}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });

        doctors.forEach((doctor) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/doctors/${doctor.id}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });

        caseStudies.forEach((study) => {
            sitemapEntries.push({
                url: `${baseUrl}${localePath(locale, `/case-studies/${study.id}`)}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
