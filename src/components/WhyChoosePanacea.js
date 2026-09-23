"use client";
import { localePath } from "@/lib/locale/routing";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WhyChoosePanacea({ locale }) {
    const t = useTranslations("whyChoose");
    const isRTL = locale === "ar";

    const features = [
        { svg: "/why-choose/expert-medical-network.svg", key: "feature1" },
        { svg: "/why-choose/global-reach-local-care.svg", key: "feature2" },
        { svg: "/why-choose/accredited-excellenc.svg", key: "feature3" },
        { svg: "/why-choose/compassionate-support.svg", key: "feature4" },
        { svg: "/why-choose/transparent-pricing.svg", key: "feature5" },
    ];

    return (
        <section
            className="py-14 md:py-20 bg-gradient-to-br from-gray-50 via-white to-panacea-light/40 relative overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #0B4D5E 1px, transparent 0)`,
                        backgroundSize: "36px 36px",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 xl:max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
                    {/* Left Side - Image */}
                    <div className="relative w-full lg:w-[42%] lg:sticky lg:top-24">
                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-3xl transform rotate-2 opacity-15"></div>

                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5]">
                                <Image
                                    src="/medical-consultation.jpg"
                                    alt="Medical Team Consultation"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-panacea-primary/70 via-transparent to-transparent"></div>

                                {/* Floating stat chip */}
                                <div className={`absolute bottom-5 ${isRTL ? "right-4" : "left-4"} bg-white/95 backdrop-blur rounded-2xl px-5 py-3 shadow-xl`}>
                                    <p className="text-xs text-gray-500 font-medium">{t("patients")}</p>
                                    <p className="text-xl font-extrabold text-panacea-primary">500+</p>
                                </div>
                            </div>

                            <div className="absolute -top-5 -right-5 w-24 h-24 bg-panacea-accent/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-panacea-secondary/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-[58%]">
                        {/* Badge */}
                        <div className="inline-block mb-5">
                            <span className="px-5 py-2.5 bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] text-white rounded-full text-sm md:text-base font-bold shadow-lg">
                                {t("badge")}
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4 leading-tight tracking-tight">
                            {t("title")}
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                            {t("description")}
                        </p>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {features.map((feature) => (
                                <div
                                    key={feature.key}
                                    className="group flex items-start gap-3.5 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-panacea-primary/30 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-panacea-light/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-1.5">
                                        <Image
                                            src={feature.svg}
                                            alt={t(`${feature.key}Title`)}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <CheckCircle2 className="w-4 h-4 text-[#0BA35A] flex-shrink-0" />
                                            <h3 className="text-sm md:text-base font-bold text-panacea-dark leading-snug">
                                                {t(`${feature.key}Title`)}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 text-[13px] md:text-sm leading-relaxed">
                                            {t(`${feature.key}Desc`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <Link
                                href={localePath(locale, `/about`)}
                                className={`inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-panacea-accent to-panacea-orange-400 hover:from-panacea-orange-600 hover:to-panacea-accent text-white font-bold rounded-full shadow-panacea-orange hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                {t("ctaButton")}
                                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                            </Link>

                            <Link
                                href={localePath(locale, `/consult-online`)}
                                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border-2 border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm md:text-base"
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
