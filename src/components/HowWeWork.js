"use client";
import { useState } from "react";
import { localePath } from "@/lib/locale/routing";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function HowWeWork({ locale }) {
    const [playVideo, setPlayVideo] = useState(false);
    const t = useTranslations("howWeWork");
    const isRTL = locale === "ar";

    const steps = [
        {
            id: "step1",
            svg: "/process/share-your-medical-needs.svg",
        },
        {
            id: "step2",
            svg: "/process/receive-expert-consultation.svg",
        },
        {
            id: "step3",
            svg: "/process/travel-arrangements.svg",
        },
        {
            id: "step4",
            svg: "/process/treatment-sftercare.svg",
        },
    ];

    return (
        <section
            className=" py-8 md:py-12  bg-gradient-to-br from-white via-panacea-light/30 to-gray-50"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 xl:max-w-7xl ">
                {/* Header */}
                <div className={`text-center mb-12 md:mb-16 ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="inline-block mb-4">
                        <span className="px-6 py-3 bg-gradient-to-r from-[#066F89] via-[#066F89] to-[#FF6B35] text-white rounded-full text-base md:text-lg font-bold shadow-lg">
                            {t("badge")}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl  font-extrabold bg-gradient-to-r from-panacea-primary to-panacea-secondary bg-clip-text text-transparent mb-6 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xl  text-panacea-gray max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Left Side - Steps */}
                    <div className="space-y-6">
                        {steps.map((step, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="group flex items-start gap-6 bg-gradient-to-br from-white to-panacea-light/30 p-6  rounded-3xl shadow-panacea hover:shadow-panacea-lg transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-panacea-primary/30"
                                >
                                    {/* Step Number & Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24  bg-gradient-to-br from-panacea-primary to-panacea-secondary flex items-center justify-center shadow-panacea rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={step.svg}
                                                alt={t(`steps.${step.id}.title`)}
                                                width={96}
                                                height={96}
                                                className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-0 invert"
                                            />
                                        </div>
                                        <div className="mt-3 text-center">
                                            <span className="text-sm md:text-base font-bold bg-gradient-to-r from-panacea-primary to-panacea-secondary bg-clip-text text-transparent">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        <h3 className="text-2xl  font-bold bg-gradient-to-r from-panacea-primary to-panacea-secondary bg-clip-text text-transparent mb-3">
                                            {t(`steps.${step.id}.title`)}
                                        </h3>
                                        <p className="text-lg  text-panacea-gray leading-relaxed">
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
                            <div className="bg-black rounded-2xl overflow-hidden aspect-video relative">
                                {playVideo ? (
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/kA_19g5gu04?autoplay=1"
                                        title={t("videoTitle")}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <>
                                        <Image
                                            src="https://img.youtube.com/vi/kA_19g5gu04/hqdefault.jpg"
                                            alt={t("videoTitle") || "Video preview"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <button
                                            onClick={() => setPlayVideo(true)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 group/play"
                                            aria-label="Play video"
                                        >
                                            <div className="w-16 h-16 bg-[#F5841F] rounded-full flex items-center justify-center shadow-2xl transform group-hover/play:scale-110 transition-transform duration-300">
                                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-panacea-accent/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-panacea-primary/20 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* Bottom CTA Buttons */}
                <div className={`flex flex-wrap gap-4 justify-center mt-12 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Link
                        href={localePath(locale, `/contact`)}
                        className="px-8 py-3 bg-[#F5841F] hover:bg-[#E07316] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 block text-center"
                    >
                        {t("getStarted")}
                    </Link>
                    <a
                        href="https://api.whatsapp.com/send/?phone=919958800961&text=Hello%2C+I+need+medical+assistance+from+Panacea+Medcare&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        <span>{t("chatWithUs")}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
