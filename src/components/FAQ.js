"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";

export default function FAQ({ locale }) {
    const t = useTranslations("faq");
    const isRTL = locale === "ar";
    const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

    const faqs = t.raw("faqs");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section
            className="py-12 md:py-16 bg-gradient-to-br from-white via-panacea-light/30 to-gray-50"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 xl:max-w-7xl max-w-5xl">
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

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                {/* Question Button */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300 ${isOpen ? "bg-panacea-light/50" : "bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <span className={`text-lg md:text-xl font-bold text-gray-900 flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {faq.question}
                                    </span>

                                    {/* Icon */}
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? "bg-panacea-primary text-white rotate-180"
                                            : "bg-gray-100 text-panacea-primary"
                                            }`}
                                    >
                                        {isOpen ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </div>
                                </button>

                                {/* Answer - Smooth Accordion */}
                                <div
                                    className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        } overflow-hidden`}
                                >
                                    <div className="px-6 pb-6 pt-2">
                                        <p className={`text-gray-700 leading-relaxed text-base md:text-lg ${isRTL ? "text-right" : "text-left"}`}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
