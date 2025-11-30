"use client";

import { useTranslations } from "next-intl";
import {
    FileText,
    Plane,
    CreditCard,
    DollarSign,
    Languages,
    Car,
    Home,
    ClipboardList,
    HeartPulse,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function OurServices({ locale }) {
    const t = useTranslations("ourServices");
    const isRTL = locale === "ar";

    const services = [
        { id: "medicalOpinion", icon: FileText },
        { id: "preTravelConsult", icon: Plane },
        { id: "visaSupport", icon: ClipboardList },
        { id: "currencyExchange", icon: DollarSign },
        { id: "interpreters", icon: Languages },
        { id: "transportation", icon: Car },
        { id: "accommodation", icon: Home },
        { id: "admissionSupport", icon: CreditCard },
        { id: "nursingCare", icon: HeartPulse },
    ];

    return (
        <section
            className=" py-12 md:py-16  bg-gradient-to-br from-gray-50 via-white to-panacea-light/20"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 max-w-7xl">
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {services.map((service, idx) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={idx}
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 bg-panacea-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-panacea-primary/10 transition-colors duration-300">
                                    <IconComponent className="w-7 h-7 text-panacea-primary" />
                                </div>

                                {/* Service Title */}
                                <h3 className={`text-lg md:text-xl font-bold text-gray-900 mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                                    {t(`services.${service.id}.title`)}
                                </h3>

                                {/* Service Description */}
                                <p className={`text-gray-600 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                    {t(`services.${service.id}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Notice & CTA */}
                <div className="bg-gradient-to-br from-panacea-light via-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
                    <div className="text-center mb-6">
                        <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                            {t("freeNotice")}
                        </p>
                    </div>

                    <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                            <FaWhatsapp className="w-5 h-5" />
                            <span>{t("chatWithUs")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
