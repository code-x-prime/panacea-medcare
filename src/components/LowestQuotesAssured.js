"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import QuoteForm from "./QuoteForm";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function LowestQuotesAssured({ locale }) {
    const t = useTranslations("lowestQuotes");
    const isRTL = locale === "ar";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState("");

    const treatments = [
        { id: "knee-replacement", svg: "/pack/knee-replacement.svg" },
        { id: "hip-replacement", svg: "/pack/hip-replacement.svg" },
        { id: "brain-tumor", svg: "/pack/brain-tumor.svg" },
        { id: "heart-bypass", svg: "/pack/heart-bypass-surgery.svg" },
        { id: "valve-replacement", svg: "/pack/valve-replacement.svg" },
        { id: "breast-cancer", svg: "/pack/breast-cancer.svg" },
        { id: "lung-cancer", svg: "/pack/lung-cancer.svg" },
        { id: "rhinoplasty", svg: "/pack/rhinoplasty.svg" },
        { id: "breast-implants", svg: "/pack/breast-implants.svg" },
        { id: "hair-transplant", svg: "/pack/hair-transplant.svg" },
        { id: "cervical-cancer", svg: "/pack/cervical-cancer.svg" },
        { id: "hysterectomy", svg: "/pack/hysterectomy.svg" },
    ];

    const handleGetQuote = (treatment) => {
        setSelectedTreatment(t(`treatments.${treatment.id}`));
        setIsModalOpen(true);
    };

    return (
        <section
            className=" py-12 md:py-16  bg-gradient-to-br from-white via-gray-50 to-panacea-light/20"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 xl:max-w-7xl ">
                {/* Header */}
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

                {/* Treatment Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-10 mb-12">
                    {treatments.map((treatment, idx) => {
                        return (
                            <div
                                key={idx}
                                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4 group-hover:bg-panacea-primary/10 transition-colors duration-300">
                                    <Image
                                        src={treatment.svg}
                                        alt={t(`treatments.${treatment.id}`)}
                                        width={40}
                                        height={40}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>

                                {/* Treatment Name */}
                                <h3 className={`text-base md:text-lg font-bold text-gray-900 mb-1 min-h-[3rem] ${isRTL ? "text-right" : "text-left"}`}>
                                    {t(`treatments.${treatment.id}`)}
                                </h3>

                                {/* Price - Red Color */}
                                <div className={`mb-1 ${isRTL ? "text-right" : "text-left"}`}>
                                    <p className="text-xs text-gray-500 mb-1">{t("starting")}</p>
                                    <p className="text-2xl font-extrabold text-panacea-accent">
                                        {t(`prices.${treatment.id}`)}
                                    </p>
                                </div>

                                {/* Get Quote Button - Teal Color */}
                                <button
                                    onClick={() => handleGetQuote(treatment)}
                                    className="w-full py-3 bg-panacea-primary hover:bg-panacea-dark text-white rounded-lg font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    {t("getQuote")}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Section */}
                <div className="text-center bg-gradient-to-br from-panacea-light via-white to-panacea-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
                    <p className="text-gray-700 mb-6 text-lg font-semibold">
                        {t("discoverText")}
                    </p>
                    <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t("contactHospital")}
                        </button>
                        <a
                            href="https://api.whatsapp.com/send/?phone=919958800961&text=Hello%2C+I+need+medical+assistance+from+Panacea+Medcare&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            <span>{t("chat")}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Quote Form Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative bg-gradient-to-br from-panacea-light via-white to-panacea-blue-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-panacea-accent hover:bg-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                        >
                            <svg
                                className="w-5 h-5"
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
                            <QuoteForm embedded={true} selectedCountry={selectedTreatment} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
