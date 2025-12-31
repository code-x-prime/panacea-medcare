"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
        { svg: "/why-choose/expert-medical-network.svg", key: "feature1" },
        { svg: "/why-choose/global-reach-local-care.svg", key: "feature2" },
        { svg: "/why-choose/accredited-excellenc.svg", key: "feature3" },
        { svg: "/why-choose/compassionate-support.svg", key: "feature4" },
        { svg: "/why-choose/transparent-pricing.svg", key: "feature5" },
    ];

    return (
        <section
            className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-panacea-light relative overflow-hidden"
        >
            {/* Background Pattern - Using new primary color */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #0B4D5E 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 xl:max-w-7xl relative z-10">
                <div
                    ref={containerRef}
                    className="flex flex-col lg:flex-row gap-16 items-center"
                >

                    {/* Left Side - Image Section */}
                    <div className="relative flex-1">
                        {/* Main Image Container */}
                        <div className="relative">
                            {/* Decorative Background Shape */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-3xl transform rotate-3 opacity-10"></div>

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


                            </div>

                            {/* Decorative Dots - Using new accent color */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-panacea-accent/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-panacea-secondary/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1">
                        {/* Badge */}
                        <div className="inline-block mb-6">
                            <span className="px-4 py-2 bg-panacea-light text-panacea-primary rounded-full text-sm font-semibold border-2 border-panacea-teal-200">
                                {t("badge")}
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-extrabold text-panacea-dark mb-6 leading-tight">
                            {t("title")}
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            {t("description")}
                        </p>

                        {/* Features List */}
                        <div className="space-y-5 mb-10">
                            {features.map((feature) => {
                                return (
                                    <div
                                        key={feature.key}
                                        className={`flex items-start gap-4 group ${isRTL ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={feature.svg}
                                                alt={feature.key}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                            <h3 className="text-lg font-bold text-panacea-dark mb-1">
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

                        {/* CTA Buttons - Orange for primary CTA */}
                        <div className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <Link
                                href={`/${locale}/about`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-panacea-accent to-panacea-orange-400 hover:from-panacea-orange-600 hover:to-panacea-accent text-white font-bold rounded-full shadow-panacea-orange hover:shadow-xl transition-all duration-300 hover:scale-105"
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
