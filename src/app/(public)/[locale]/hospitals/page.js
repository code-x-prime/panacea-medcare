"use client";

import TopBanner from "@/components/TopBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Award, MapPin, Building2 } from "lucide-react";

export default function HospitalsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("networkHospitals");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
        { label: locale === "ar" ? "المستشفيات" : locale === "fr" ? "Hôpitaux" : "Hospitals", href: `/${locale}/hospitals` }
    ];

    const indiaHospitals = {
        "delhi-ncr": [
            { name: "Asian Hospital", slug: "asian-hospital-delhi" },
            { name: "Marengo Asia Hospital, Gurgaon", slug: "marengo-asia-hospital-gurgaon" },
            { name: "Indraprastha Apollo Hospital", slug: "indraprastha-apollo-hospital-new-delhi" },
            { name: "Fortis Hospital Gurgaon", slug: "fortis-hospital-gurgaon" },
            { name: "Max Hospital Saket", slug: "max-hospital-saket" },
            { name: "BLK Max Hospital Pusa Road", slug: "blk-max-hospital-pusa-road" },
            { name: "Medanta Hospital, Gurgaon", slug: "medanta-hospital-gurgaon" },
            { name: "Neelkanth Maternity & IVF Hospital Gurgaon", slug: "neelkanth-maternity-ivf-hospital-gurgaon" },
            { name: "Manipal Hospital Dwarka", slug: "manipal-hospital-dwarka" },
        ],
        "chennai": [
            { name: "Apollo Hospital Greams Road", slug: "apollo-hospital-greams-road-chennai" },
        ],
        "mumbai": [
            { name: "Stem Rx Hospital", slug: "stem-rx-hospital-mumbai" },
            { name: "Apollo Hospital", slug: "apollo-hospital-mumbai" },
            { name: "Fortis Hospital", slug: "fortis-hospital-mumbai" },
        ],
        "hyderabad": [
            { name: "TX Hospital", slug: "tx-hospital-hyderabad" },
            { name: "Apollo Hospital", slug: "apollo-hospital-hyderabad" },
        ],
    };

    const internationalHospitals = {
        "turkey": [
            { name: "Memorial Hospital", slug: "memorial-hospital-turkey" },
        ],
        "thailand": [
            { name: "Bumrungrad Hospital", slug: "bumrungrad-hospital-thailand" },
        ],
        "nepal": [
            { name: "Nepal Mediciti", slug: "nepal-mediciti" },
        ],
    };

    // Helper function to get hospital image
    const getHospitalImage = (slug) => {
        const imageMap = {
            // Delhi NCR
            "asian-hospital-delhi": "/hospitals/asian-hospital.jpg",
            "marengo-asia-hospital-gurgaon": "/hospitals/marengo-asia-hospital-gurgaon.jpg",
            "indraprastha-apollo-hospital-new-delhi": "/hospitals/indraprastha-apollo-hospital-new-delhi.jpg",
            "fortis-hospital-gurgaon": "/hospitals/fortis-hospital-gurgaon.jpg",
            "max-hospital-saket": "/hospitals/max-hospital-saket.jpg",
            "blk-max-hospital-pusa-road": "/hospitals/blk-max-hospital-pusa-road.jpg",
            "medanta-hospital-gurgaon": "/hospitals/medanta-hospital-gurgaon.jpg",
            "neelkanth-maternity-ivf-hospital-gurgaon": "/hospitals/neelkanth-maternity-ivf-hospital-gurgaon.jpg",
            "manipal-hospital-dwarka": "/hospitals/manipal-hospital-dwarka.jpg",
            // Chennai
            "apollo-hospital-greams-road-chennai": "/hospitals/apollo-hospital-greams-road-chennai.jpg",
            // Mumbai
            "stem-rx-hospital-mumbai": "/hospitals/stem-rx-hospital-mumbai.jpg",
            "apollo-hospital-mumbai": "/hospitals/apollo-hospital-mumbai.jpg",
            "fortis-hospital-mumbai": "/hospitals/fortis-hospital-mumbai.jpg",
            // Hyderabad
            "tx-hospital-hyderabad": "/hospitals/tx-hospital-hyderabad.jpg",
            "apollo-hospital-hyderabad": "/hospitals/apollo-hospital-hyderabad.jpg",
            // International
            "memorial-hospital-turkey": "/hospitals/memorial-hospital-turkey.jpg",
            "bumrungrad-hospital-thailand": "/hospitals/bumrungrad-hospital-thailand.jpg",
            "nepal-mediciti": "/hospitals/nepal-mediciti.jpg",
        };
        return imageMap[slug] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format";
    };

    const whatsappNumber = "919958800961";
    const whatsappMessage = encodeURIComponent(
        locale === "ar" ? "مرحباً، أحتاج إلى معلومات حول المستشفيات" :
            locale === "fr" ? "Bonjour, j'ai besoin d'informations sur les hôpitaux" :
                "Hello, I need information about hospitals"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="networkHospitals"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-5">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 ">
                {/* Header Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-panacea-primary/10 text-panacea-primary rounded-full text-sm font-semibold">
                                {t("badge") || "Trusted Medical Partners"}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {t("title") || "Premier Hospital Network"}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t("subtitle") || "Every hospital in our network undergoes strict quality assessment to guarantee exceptional patient care. Our partnerships span across continents, bringing you access to world-renowned medical facilities."}
                        </p>
                    </div>

                    {/* Accreditation Badge */}
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-2xl p-6 md:p-8 text-white shadow-panacea-lg">
                        <div className="flex items-center gap-4 justify-center">
                            <Award className="w-8 h-8 md:w-10 md:h-10" />
                            <p className="text-lg md:text-xl font-semibold">
                                {t("accreditation") || "Hospitals with highest accreditation"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* India Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className={`flex items-center gap-4 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {t("india") || "India"}
                        </h2>
                    </div>

                    {/* Delhi NCR */}
                    <div className="mb-12">
                        <h3 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                            {t("delhiNcr") || "Delhi NCR"}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {[...indiaHospitals["delhi-ncr"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                <Link
                                    key={idx}
                                    href={`/${locale}/hospitals/${hospital.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="relative h-40 md:h-44 overflow-hidden bg-gray-100">
                                        <Image
                                            src={getHospitalImage(hospital.slug)}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                            {hospital.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Chennai */}
                    <div className="mb-12">
                        <h3 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                            {t("chennai") || "Chennai"}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {[...indiaHospitals["chennai"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                <Link
                                    key={idx}
                                    href={`/${locale}/hospitals/${hospital.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="relative h-40 md:h-44 overflow-hidden bg-gray-100">
                                        <Image
                                            src={getHospitalImage(hospital.slug)}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                            {hospital.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mumbai */}
                    <div className="mb-12">
                        <h3 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                            {t("mumbai") || "Mumbai"}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {[...indiaHospitals["mumbai"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                <Link
                                    key={idx}
                                    href={`/${locale}/hospitals/${hospital.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="relative h-40 md:h-44 overflow-hidden bg-gray-100">
                                        <Image
                                            src={getHospitalImage(hospital.slug)}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                            {hospital.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Hyderabad */}
                    <div className="mb-12">
                        <h3 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                            {t("hyderabad") || "Hyderabad"}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {[...indiaHospitals["hyderabad"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                <Link
                                    key={idx}
                                    href={`/${locale}/hospitals/${hospital.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="relative h-40 md:h-44 overflow-hidden bg-gray-100">
                                        <Image
                                            src={getHospitalImage(hospital.slug)}
                                            alt={hospital.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                            {hospital.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* International Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className={`flex items-center gap-4 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-panacea-accent to-panacea-orange-600 rounded-xl flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {t("international") || "International"}
                        </h2>
                    </div>

                    {(() => {
                        const allInternationalHospitals = [
                            ...internationalHospitals["nepal"].map(h => ({ ...h, country: "nepal", countryName: t("nepal") || "Nepal", flag: "🇳🇵" })),
                            ...internationalHospitals["thailand"].map(h => ({ ...h, country: "thailand", countryName: t("thailand") || "Thailand", flag: "🇹🇭" })),
                            ...internationalHospitals["turkey"].map(h => ({ ...h, country: "turkey", countryName: t("turkey") || "Turkey", flag: "🇹🇷" })),
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {allInternationalHospitals.map((hospital, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-40 md:h-44 overflow-hidden bg-gray-100">
                                            <Image
                                                src={getHospitalImage(hospital.slug)}
                                                alt={hospital.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                                                {hospital.flag} {hospital.countryName}
                                            </div>
                                        </div>
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2">
                                                {hospital.name}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        );
                    })()}
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                {t("accreditation") || "Hospitals with highest accreditation"}
                            </h3>
                            <p className="text-lg text-white/90 mb-6">
                                {locale === "ar" ? "تواصل معنا للحصول على معلومات حول مستشفياتنا الشريكة" :
                                    locale === "fr" ? "Contactez-nous pour obtenir des informations sur nos hôpitaux partenaires" :
                                        "Contact us for information about our partner hospitals"}
                            </p>
                        </div>
                        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                            <Link
                                href={`/${locale}/contact`}
                                className="px-8 py-4 bg-white text-panacea-primary rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-center"
                            >
                                {t("contactHospital") || "Contact Hospital"}
                            </Link>
                            <a
                                href="https://api.whatsapp.com/send/?phone=919958800961&text=Hello%2C+I+need+medical+assistance+from+Panacea+Medcare&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                <span>{t("chat") || "Chat"}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
