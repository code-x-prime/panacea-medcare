"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumb";

export default function InternationalPatientsContent({ locale }) {
    const t = useTranslations("internationalPatients");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.internationalPatients") || "International Patients", href: `/${locale}/international-patients` }
    ];

    const concerns = t.raw("topConcerns.concerns");
    const steps = t.raw("stepByStepGuide.steps");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="internationalPatients"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Intro Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-6">
                        {t("heading")}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {t("intro")}
                    </p>
                </div>

                {/* Top Concerns Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4`}>
                            {t("topConcerns.title")}
                        </h2>
                        <p className="text-center text-white/90 text-lg">
                            {t("topConcerns.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {concerns.map((concern, idx) => (
                            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all border-l-4 border-panacea-accent group">
                                <AlertCircle className="w-6 h-6 text-panacea-accent flex-shrink-0 mt-1" />
                                <p className={`text-gray-700 font-medium ${isRTL ? "text-right" : "text-left"}`}>
                                    {concern}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step-by-Step Guide Section */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-4">
                            {t("stepByStepGuide.title")}
                        </h2>
                        <p className="text-xl text-panacea-accent font-semibold">
                            {t("stepByStepGuide.subtitle")}
                        </p>
                        <p className="text-gray-600 mt-2">
                            {t("stepByStepGuide.description")}
                        </p>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className={`hidden md:block absolute top-0 bottom-0 w-0.5 bg-gray-200 ${isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"}`}></div>

                        {steps.map((step, idx) => (
                            <div key={idx} className={`relative flex items-center md:justify-between gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                                {/* Step Number Badge (Center) */}
                                <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-panacea-primary text-white rounded-full items-center justify-center font-bold z-10 border-4 border-white shadow-lg ${isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"}`}>
                                    {step.number}
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? (isRTL ? "md:mr-auto" : "md:ml-auto") : (isRTL ? "md:ml-auto" : "md:mr-auto")}`}>
                                    <div className={`bg-white p-6 rounded-2xl shadow-panacea hover:shadow-panacea-lg transition-all border border-gray-100 relative ${isRTL ? "text-right" : "text-left"}`}>
                                        {/* Mobile Step Number */}
                                        <div className={`md:hidden absolute -top-4 ${isRTL ? "left-4" : "right-4"} w-8 h-8 bg-panacea-primary text-white rounded-full flex items-center justify-center font-bold shadow-md`}>
                                            {step.number}
                                        </div>

                                        <h3 className="text-xl font-bold text-panacea-primary mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                {t("cta.title")}
                            </h2>
                            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                                {t("cta.subtitle")}
                            </p>
                            <a
                                href="https://wa.me/919999999999" // Replace with actual number
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg group"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                                <span>{t("cta.whatsappButton")}</span>
                            </a>
                        </div>

                        {/* Decorative Background Circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
