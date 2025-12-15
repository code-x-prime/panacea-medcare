"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function NetworkOfTopHospitals({ locale }) {
    const t = useTranslations("networkHospitals");
    const isRTL = locale === "ar";

    // India hospitals organized by city
    const indiaHospitals = {
        "delhi-ncr": [
            { name: "Asian Hospital", slug: "asian-hospital-delhi" },
            { name: "Marengo Asia Hospital, Gurgaon", slug: "marengo-asia-hospital-gurgaon" },
            { name: "Indraprastha Apollo Hospital", slug: "indraprastha-apollo-hospital-new-delhi" },
            { name: "All Apollo Hospitals (All Cities)", slug: "apollo-hospitals-all" },
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

    // International hospitals
    const internationalHospitals = {
        "turkey": [
            { name: "Memorial Hospital", slug: "memorial-hospital-turkey" },
        ],
        "thailand": [
            { name: "Bumrungrad Hospital", slug: "bumrungrad-hospital-thailand" },
        ],
        "israel": [
            { name: "Sheeba Hospital", slug: "sheeba-hospital-israel" },
        ],
        "nepal": [
            { name: "Nepal Mediciti", slug: "nepal-mediciti" },
        ],
    };

    // Helper function to get hospital image
    const getHospitalImage = (slug) => {
        return `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop`;
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {indiaHospitals["delhi-ncr"].map((hospital, idx) => (
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {indiaHospitals["chennai"].map((hospital, idx) => (
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {indiaHospitals["mumbai"].map((hospital, idx) => (
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {indiaHospitals["hyderabad"].map((hospital, idx) => (
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Turkey */}
                            <div>
                                <h4 className={`text-xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    🇹🇷 {t("turkey") || "Turkey"}
                                </h4>
                                <div className="space-y-4">
                                    {internationalHospitals["turkey"].map((hospital, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            <div className="relative h-32 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={getHospitalImage(hospital.slug)}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors">
                                                    {hospital.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Thailand */}
                            <div>
                                <h4 className={`text-xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    🇹🇭 {t("thailand") || "Thailand"}
                                </h4>
                                <div className="space-y-4">
                                    {internationalHospitals["thailand"].map((hospital, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            <div className="relative h-32 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={getHospitalImage(hospital.slug)}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors">
                                                    {hospital.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Israel */}
                            <div>
                                <h4 className={`text-xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    🇮🇱 {t("israel") || "Israel"}
                                </h4>
                                <div className="space-y-4">
                                    {internationalHospitals["israel"].map((hospital, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            <div className="relative h-32 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={getHospitalImage(hospital.slug)}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors">
                                                    {hospital.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Nepal */}
                            <div>
                                <h4 className={`text-xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    🇳🇵 {t("nepal") || "Nepal"}
                                </h4>
                                <div className="space-y-4">
                                    {internationalHospitals["nepal"].map((hospital, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            <div className="relative h-32 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={getHospitalImage(hospital.slug)}
                                                    alt={hospital.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h5 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors">
                                                    {hospital.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Accreditation Section */}
                <div className="mt-16 bg-gradient-to-br from-panacea-light via-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
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
