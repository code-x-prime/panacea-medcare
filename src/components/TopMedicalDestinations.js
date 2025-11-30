"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import QuoteForm from "./QuoteForm";
import Image from "next/image";

export default function TopMedicalDestinations({ locale }) {
    const t = useTranslations("destinations");
    const isRTL = locale === "ar";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");

    const countries = [
        {
            id: "india",
            flag: "🇮🇳",
            name: t("india"),
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
            color: "from-orange-500 to-green-600"
        },
        {
            id: "turkey",
            flag: "🇹🇷",
            name: t("turkey"),
            image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            color: "from-red-500 to-red-600"
        },
        {
            id: "thailand",
            flag: "🇹🇭",
            name: t("thailand"),
            image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
            color: "from-blue-500 to-red-500"
        },
        {
            id: "uae",
            flag: "🇦🇪",
            name: t("uae"),
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
            color: "from-green-600 to-red-600"
        },
        {
            id: "egypt",
            flag: "🇪🇬",
            name: t("egypt"),
            image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&h=300&fit=crop",
            color: "from-yellow-500 to-red-600"
        },
        {
            id: "germany",
            flag: "🇩🇪",
            name: t("germany"),
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
            color: "from-gray-800 to-red-600"
        },
    ];

    const handleCountryClick = (country) => {
        setSelectedCountry(country.name);
        setIsModalOpen(true);
        console.log(`Country clicked: ${country.name}`);
    };

    const handleFormSubmit = (formData) => {
        console.log("Form submitted with data:", formData);
        console.log("Selected country:", selectedCountry);
        setIsModalOpen(false);
    };

    return (
        <>
            <section
                className="py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden"
                dir={isRTL ? "rtl" : "ltr"}
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10"></div>

                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}>
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

                    {/* Country Cards Grid - 2 cols mobile, 3 cols tablet, 6 cols desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                        {countries.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => handleCountryClick(country)}
                                className={`group relative bg-white rounded overflow-hidden shadow-md hover:shadow transition-all duration-500 transform hover:-translate-y-2   ${isRTL ? "text-right" : "text-left"
                                    }`}
                            >
                                {/* Image Container */}
                                <div className="relative h-32 overflow-hidden">
                                    <Image
                                        src={country.image}
                                        alt={country.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${country.color} opacity-50 group-hover:opacity-40 transition-opacity duration-300`}></div>

                                    {/* Flag Badge */}
                                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-md">
                                        {country.flag}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors text-center">
                                        {country.name}
                                    </h3>

                                    {/* CTA */}
                                    <div className={`flex items-center justify-center gap-1 text-teal-600 text-xs font-semibold ${isRTL ? "flex-row-reverse" : ""
                                        }`}>
                                        <span>{t("getQuote")}</span>
                                        <svg
                                            className={`w-3 h-3 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500 rounded-xl transition-all duration-300 pointer-events-none"></div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* QuoteForm Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-panacea-accent hover:bg-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Form Content */}
                        <div className="p-8 md:p-10">
                            <QuoteForm
                                embedded={true}
                                onSubmit={handleFormSubmit}
                                selectedCountry={selectedCountry}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
