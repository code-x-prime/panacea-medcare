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
        {
            id: "medicalOpinion",
            icon: FileText,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
        },
        {
            id: "preTravelConsult",
            icon: Plane,
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop"
        },
        {
            id: "visaSupport",
            icon: ClipboardList,
            image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=300&fit=crop"
        },
        {
            id: "currencyExchange",
            icon: DollarSign,
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
        },
        {
            id: "interpreters",
            icon: Languages,
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop"
        },
        {
            id: "transportation",
            icon: Car,
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop"
        },
        {
            id: "accommodation",
            icon: Home,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
        },
        {
            id: "admissionSupport",
            icon: CreditCard,
            image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop"
        },
        {
            id: "nursingCare",
            icon: HeartPulse,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop"
        },
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

                {/* Services Grid with Background Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 gap-10 mb-12">
                    {services.map((service, idx) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 min-h-[220px]"
                            >
                                {/* Background Image with Overlay */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${service.image})`,
                                    }}
                                >
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-panacea-light/70 group-hover:from-white/90 group-hover:via-white/85 group-hover:to-panacea-light/70 transition-all duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="relative p-6 h-full flex flex-col">
                                    {/* Icon */}
                                    <div className="w-14 h-14 bg-gradient-to-br from-panacea-primary to-panacea-dark rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Service Title */}
                                    <h3 className={`text-lg md:text-xl font-bold text-gray-900 mb-3 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t(`services.${service.id}.title`)}
                                    </h3>

                                    {/* Service Description */}
                                    <p className={`text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t(`services.${service.id}.description`)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Notice & CTA */}
                <div className="bg-gradient-to-br from-panacea-light via-white to-panacea-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-panacea-primary/10">
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
