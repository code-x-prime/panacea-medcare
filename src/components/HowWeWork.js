"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, FileText, Plane, HeartPulse } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function HowWeWork({ locale }) {
    const t = useTranslations("howWeWork");
    const isRTL = locale === "ar";

    const steps = [
        {
            id: "step1",
            icon: MessageCircle,
            color: "from-panacea-primary to-panacea-cyan-500",
        },
        {
            id: "step2",
            icon: FileText,
            color: "from-panacea-accent to-red-500",
        },
        {
            id: "step3",
            icon: Plane,
            color: "from-purple-500 to-pink-500",
        },
        {
            id: "step4",
            icon: HeartPulse,
            color: "from-green-500 to-emerald-500",
        },
    ];

    return (
        <section
            className=" py-12 md:py-16  bg-gradient-to-br from-white via-panacea-light/30 to-gray-50"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 ">
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

                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Left Side - Steps */}
                    <div className="space-y-6">
                        {steps.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    {/* Step Number & Icon */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <span className="text-xs font-bold text-gray-400">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                            {t(`steps.${step.id}.title`)}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {t(`steps.${step.id}.description`)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side - Video */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-panacea-primary to-panacea-dark rounded-3xl p-2 shadow-2xl">
                            <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/kA_19g5gu04"
                                    title={t("videoTitle")}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-panacea-accent/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-panacea-primary/20 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className={`flex flex-wrap gap-4 justify-center mt-12 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <button className="px-8 py-3 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        {t("getStarted")}
                    </button>
                    <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                        <FaWhatsapp className="w-5 h-5" />
                        <span>{t("chatWithUs")}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
