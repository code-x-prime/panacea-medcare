"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function NetworkOfTopHospitals({ locale }) {
    const t = useTranslations("networkHospitals");
    const isRTL = locale === "ar";

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

    // International hospitals - Only India, Nepal, Turkey, Thailand
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

    // Helper function to get hospital image - returns image path or placeholder
    const getHospitalImage = (slug) => {
        // Image mapping for hospitals with actual images
        const imageMap = {
            // Delhi NCR
            "asian-hospital-delhi": "/hospitals/asian-hospital.jpg",
            "marengo-asia-hospital-gurgaon": "/hospitals/marengo-asia-hospital-gurgaon.jpg",
            "indraprastha-apollo-hospital-new-delhi": "/hospitals/indraprastha-apollo-hospital-new-delhi.jpg",
            "apollo-hospitals-all": "/hospitals/apollo-hospitals-all.jpg",
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

        // Return image if exists, otherwise return placeholder
        return imageMap[slug] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format";
    };

    return (
        <section
            className="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-panacea-light/20"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className={`text-center mb-12 md:mb-16 ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                            {t("badge") || "Partner Hospitals"}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {t("title") || "Hospitals by Country & City"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle") || "World-class healthcare facilities across the globe"}
                    </p>
                </div>

                <div className="space-y-12">
                    {/* India Section */}
                    <div>
                        <div className={`flex items-center gap-3 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="text-3xl">🇮🇳</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {t("india") || "India"}
                            </h3>
                        </div>

                        {/* Delhi NCR */}
                        <div className="mb-10">
                            <h4 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("delhiNcr") || "Delhi NCR"}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
                                {[...indiaHospitals["delhi-ncr"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-32 md:h-36 overflow-hidden bg-gray-100">
                                            <Image
                                                src={getHospitalImage(hospital.slug)}
                                                alt={hospital.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                {hospital.name}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Chennai */}
                        <div className="mb-10">
                            <h4 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("chennai") || "Chennai"}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
                                {[...indiaHospitals["chennai"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-32 md:h-36 overflow-hidden bg-gray-100">
                                            <Image
                                                src={getHospitalImage(hospital.slug)}
                                                alt={hospital.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                {hospital.name}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mumbai */}
                        <div className="mb-10">
                            <h4 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("mumbai") || "Mumbai"}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
                                {[...indiaHospitals["mumbai"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-32 md:h-36 overflow-hidden bg-gray-100">
                                            <Image
                                                src={getHospitalImage(hospital.slug)}
                                                alt={hospital.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                {hospital.name}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Hyderabad */}
                        <div className="mb-10">
                            <h4 className={`text-xl md:text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("hyderabad") || "Hyderabad"}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
                                {[...indiaHospitals["hyderabad"]].sort((a, b) => a.name.localeCompare(b.name)).map((hospital, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-32 md:h-36 overflow-hidden bg-gray-100">
                                            <Image
                                                src={getHospitalImage(hospital.slug)}
                                                alt={hospital.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                {hospital.name}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* International Section */}
                    <div>
                        <div className={`flex items-center gap-3 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <span className="text-3xl">🌍</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {t("international") || "International"}
                            </h3>
                        </div>

                        {/* Flatten and sort all international hospitals alphabetically */}
                        {(() => {
                            const allInternationalHospitals = [
                                ...internationalHospitals["nepal"].map(h => ({ ...h, country: "nepal", countryName: t("nepal") || "Nepal", flag: "🇳🇵" })),
                                ...internationalHospitals["thailand"].map(h => ({ ...h, country: "thailand", countryName: t("thailand") || "Thailand", flag: "🇹🇭" })),
                                ...internationalHospitals["turkey"].map(h => ({ ...h, country: "turkey", countryName: t("turkey") || "Turkey", flag: "🇹🇷" })),
                            ].sort((a, b) => a.name.localeCompare(b.name));

                            return (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {allInternationalHospitals.map((hospital, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            <div className="relative h-40 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={getHospitalImage(hospital.slug)}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop&auto=format";
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                                                    {hospital.flag} {hospital.countryName}
                                                </div>
                                            </div>
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2">
                                                    {hospital.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Bottom Accreditation Section */}
                <div className="mt-16 bg-gradient-to-br from-panacea-light via-white to-panacea-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                            <span className="text-sm md:text-base font-semibold text-gray-700">
                                {t("accreditation") || "Hospitals with highest accreditation"}
                            </span>
                        </div>
                        <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                            <button className="px-6 md:px-8 py-3 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                {t("contactHospital") || "Contact Hospital"}
                            </button>
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 md:px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                <span>{t("chat") || "Chat"}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
