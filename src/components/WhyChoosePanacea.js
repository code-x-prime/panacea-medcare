"use client";

import { useTranslations } from "next-intl";
import { Users, Globe, Award, Heart, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function WhyChoosePanacea({ locale }) {
    const t = useTranslations("whyChoose");
    const isRTL = locale === "ar";
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && isRTL && window.innerWidth >= 1024) {
            containerRef.current.style.flexDirection = 'row-reverse';
        }
    }, [isRTL]);

    const features = [
        { icon: Users, key: "feature1" },
        { icon: Globe, key: "feature2" },
        { icon: Award, key: "feature3" },
        { icon: Heart, key: "feature4" },
        { icon: Shield, key: "feature5" },
    ];

    return (
        <section
            className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #046d8a 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div
                    ref={containerRef}
                    className="flex flex-col lg:flex-row gap-16 items-center"
                >

                    {/* Left Side - Image Section */}
                    <div className="relative flex-1">
                        {/* Main Image Container */}
                        <div className="relative">
                            {/* Decorative Background Shape */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-panacea-primary to-teal-600 rounded-3xl transform rotate-3 opacity-10"></div>

                            {/* Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/medical-consultation.png"
                                    alt="Medical Team Consultation"
                                    width={600}
                                    height={700}
                                    className="w-full h-auto object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-panacea-primary/80 via-transparent to-transparent"></div>

                                {/* Floating Stats Card */}
                                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-extrabold bg-gradient-to-r from-panacea-accent to-red-600 bg-clip-text text-transparent">50+</div>
                                            <div className="text-xs text-gray-600 mt-1 font-semibold">{t("countries")}</div>
                                        </div>
                                        <div className="text-center border-x border-gray-200">
                                            <div className="text-3xl font-extrabold bg-gradient-to-r from-panacea-primary to-teal-600 bg-clip-text text-transparent">10K+</div>
                                            <div className="text-xs text-gray-600 mt-1 font-semibold">{t("patients")}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-extrabold bg-gradient-to-r from-panacea-accent to-red-600 bg-clip-text text-transparent">500+</div>
                                            <div className="text-xs text-gray-600 mt-1 font-semibold">{t("hospitals")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Dots */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-panacea-accent/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1">
                        {/* Badge */}
                        <div className="inline-block mb-6">
                            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold border-2 border-teal-200">
                                {t("badge")}
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {t("title")}
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            {t("description")}
                        </p>

                        {/* Features List */}
                        <div className="space-y-5 mb-10">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={feature.key}
                                        className={`flex items-start gap-4 group ${isRTL ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-panacea-primary to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                                {t(`${feature.key}Title`)}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {t(`${feature.key}Desc`)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Buttons */}
                        <div className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <Link
                                href={`/${locale}/about`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-panacea-accent to-red-600 hover:from-red-700 hover:to-panacea-accent text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                {t("ctaButton")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href={`/${locale}/consult-online`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                {t("consultButton")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
