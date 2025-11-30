"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function NetworkOfTopHospitals({ locale }) {
    const t = useTranslations("networkHospitals");
    const isRTL = locale === "ar";

    // Hospital data organized by country
    const hospitalsByCountry = [
        {
            countryKey: "india",
            flag: "🇮🇳",
            hospitals: [
                {
                    slug: "medanta-gurgaon",
                    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
                },
                {
                    slug: "indraprastha-apollo-hospital-new-delhi",
                    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=250&fit=crop",
                },
                {
                    slug: "kokilaben-hospital-mumbai",
                    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=250&fit=crop",
                },
                {
                    slug: "apollo-hospital-chennai",
                    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&h=250&fit=crop",
                },
            ],
        },
    ];

    // Countries with 2 hospitals each - will be displayed in 2-column layout
    const twoHospitalCountries = [
        {
            countryKey: "turkey",
            flag: "🇹🇷",
            hospitals: [
                {
                    slug: "medical-park-istanbul",
                    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=250&fit=crop",
                },
                {
                    slug: "memorial-hospitals-istanbul",
                    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=250&fit=crop",
                },
            ],
        },
        {
            countryKey: "uae",
            flag: "🇦🇪",
            hospitals: [
                {
                    slug: "burjeel-abu-dhabi",
                    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
                },
                {
                    slug: "saudi-german-dubai",
                    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=250&fit=crop",
                },
            ],
        },
        {
            countryKey: "thailand",
            flag: "🇹🇭",
            hospitals: [
                {
                    slug: "bumrungrad-bangkok",
                    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=250&fit=crop",
                },
                {
                    slug: "bangkok-hospital-bangkok",
                    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop",
                },
            ],
        },
        {
            countryKey: "germany",
            flag: "🇩🇪",
            hospitals: [
                {
                    slug: "charite-berlin",
                    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
                },
                {
                    slug: "heidelberg-university-heidelberg",
                    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop",
                },
            ],
        },
        {
            countryKey: "egypt",
            flag: "🇪🇬",
            hospitals: [
                {
                    slug: "arab-contractors-medical-centre-cairo",
                    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&h=250&fit=crop",
                },
                {
                    slug: "as-salam-international-hospital-cairo",
                    image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?w=400&h=250&fit=crop",
                },
            ],
        },
    ];

    return (
        <section
            className=" py-12 md:py-16  bg-gradient-to-br from-gray-50 via-white to-panacea-light/20"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header - Matching Top Medical Destinations Style */}
                <div className={`text-center mb-12 md:mb-16 ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                            {t("badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="space-y-10">
                    {/* India Section - 4 hospitals in one row */}
                    {hospitalsByCountry.map((countryGroup, idx) => (
                        <div key={idx}>
                            {/* Country Header */}
                            <div
                                className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <span className="text-2xl">{countryGroup.flag}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {t(`countries.${countryGroup.countryKey}`)}
                                </h3>
                            </div>

                            {/* Hospital Cards Grid - 4 columns */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {countryGroup.hospitals.map((hospital, hospitalIdx) => (
                                    <Link
                                        key={hospitalIdx}
                                        href={`/${locale}/hospitals/${hospital.slug}`}
                                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                    >
                                        {/* Hospital Image */}
                                        <div className="relative h-36 md:h-44 overflow-hidden bg-gray-100">
                                            <Image
                                                src={hospital.image}
                                                alt={t(`hospitals.${hospital.slug}`)}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Hospital Name */}
                                        <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                {t(`hospitals.${hospital.slug}`)}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Two-column layout for countries with 2 hospitals each */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {twoHospitalCountries.map((countryGroup, idx) => (
                            <div key={idx}>
                                {/* Country Header */}
                                <div
                                    className={`flex items-center gap-3 mb-6 ${isRTL ? "flex-row-reverse" : ""
                                        }`}
                                >
                                    <span className="text-2xl">{countryGroup.flag}</span>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        {t(`countries.${countryGroup.countryKey}`)}
                                    </h3>
                                </div>

                                {/* Hospital Cards Grid - 2 rows */}
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {countryGroup.hospitals.map((hospital, hospitalIdx) => (
                                        <Link
                                            key={hospitalIdx}
                                            href={`/${locale}/hospitals/${hospital.slug}`}
                                            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                                        >
                                            {/* Hospital Image */}
                                            <div className="relative h-36 md:h-44 overflow-hidden bg-gray-100">
                                                <Image
                                                    src={hospital.image}
                                                    alt={t(`hospitals.${hospital.slug}`)}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>

                                            {/* Hospital Name */}
                                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                                                    {t(`hospitals.${hospital.slug}`)}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Accreditation Section - Redesigned */}
                <div className="mt-16 bg-gradient-to-br from-panacea-light via-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Left Side - Accreditation Badges */}
                        <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">


                            <span className="text-sm md:text-base font-semibold text-gray-700">
                                Hospitals with highest accreditation
                            </span>
                        </div>

                        {/* Right Side - CTA Buttons */}
                        <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                            <button className="px-6 md:px-8 py-3 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                Contact Hospital
                            </button>
                            <button className="px-6 md:px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                                <FaWhatsapp className="w-5 h-5" />
                                <span>Chat</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
