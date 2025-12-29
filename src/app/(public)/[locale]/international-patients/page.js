"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function InternationalPatientsPage({ params }) {
    const { locale } = params;
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

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>
                </div>

                {/* Top Concerns Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <AlertCircle className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                                {t("topConcerns.title")}
                            </h2>
                        </div>
                        <p className="text-center text-lg md:text-xl text-white/90">
                            {t("topConcerns.subtitle")}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 p-8 md:p-10">
                        <ul className="space-y-4">
                            {concerns.map((concern, idx) => (
                                <li key={idx} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="w-8 h-8 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-lg text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {concern}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Step by Step Guide Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center`}>
                            {t("stepByStepGuide.title")}
                        </h2>
                        <p className="text-center text-xl md:text-2xl font-semibold mb-2">
                            {t("stepByStepGuide.subtitle")}
                        </p>
                        <p className="text-center text-lg text-white/90">
                            {t("stepByStepGuide.description")}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30 group relative overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
                            >
                                {/* Decorative gradient background */}
                                <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-32 h-32 bg-gradient-to-br from-panacea-primary/5 to-transparent ${isRTL ? "rounded-br-full" : "rounded-bl-full"} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                <div className={`flex items-start gap-6 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="w-20 h-20 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md group-hover:shadow-lg">
                                        <span className="text-3xl font-bold text-white">{step.number}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-panacea-primary group-hover:text-panacea-secondary transition-colors mb-3">
                                            {step.title}
                                        </h3>
                                        <p className={`text-gray-700 leading-relaxed text-base md:text-lg ${isRTL ? "text-right" : "text-left"}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="mb-16">
                    <h3 className={`text-2xl md:text-3xl font-bold text-panacea-primary mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("servicesTitle")}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.visa")}</h4>
                            <p className="text-gray-600">{t("services.visaDesc")}</p>
                        </div>
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.travel")}</h4>
                            <p className="text-gray-600">{t("services.travelDesc")}</p>
                        </div>
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.accommodation")}</h4>
                            <p className="text-gray-600">{t("services.accommodationDesc")}</p>
                        </div>
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.interpreter")}</h4>
                            <p className="text-gray-600">{t("services.interpreterDesc")}</p>
                        </div>
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.consultation")}</h4>
                            <p className="text-gray-600">{t("services.consultationDesc")}</p>
                        </div>
                        <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("services.followup")}</h4>
                            <p className="text-gray-600">{t("services.followupDesc")}</p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-panacea-light p-8 md:p-12 rounded-lg">
                    <h3 className={`text-2xl md:text-3xl font-bold text-panacea-primary mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("whyChoose")}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-2">{t("benefits.cost")}</h4>
                            <p className="text-gray-700">{t("benefits.costDesc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-2">{t("benefits.quality")}</h4>
                            <p className="text-gray-700">{t("benefits.qualityDesc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-2">{t("benefits.doctors")}</h4>
                            <p className="text-gray-700">{t("benefits.doctorsDesc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-2">{t("benefits.support")}</h4>
                            <p className="text-gray-700">{t("benefits.supportDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
