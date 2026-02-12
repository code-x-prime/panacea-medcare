"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TeleconsultationContent({ locale }) {
    const t = useTranslations("teleconsultation");
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="teleconsultation"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>
                </div>

                {/* Features */}
                <div className="mb-16">
                    <h3 className={`text-2xl md:text-3xl font-bold text-panacea-primary mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("features")}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.video")}</h4>
                            <p className="text-gray-700">{t("featuresList.videoDesc")}</p>
                        </div>
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.secure")}</h4>
                            <p className="text-gray-700">{t("featuresList.secureDesc")}</p>
                        </div>
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.records")}</h4>
                            <p className="text-gray-700">{t("featuresList.recordsDesc")}</p>
                        </div>
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.followup")}</h4>
                            <p className="text-gray-700">{t("featuresList.followupDesc")}</p>
                        </div>
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.multilingual")}</h4>
                            <p className="text-gray-700">{t("featuresList.multilingualDesc")}</p>
                        </div>
                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-accent mb-3">{t("featuresList.affordable")}</h4>
                            <p className="text-gray-700">{t("featuresList.affordableDesc")}</p>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
                    <h3 className={`text-2xl md:text-3xl font-bold text-panacea-primary mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("howItWorks")}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <div className="w-12 h-12 bg-panacea-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                1
                            </div>
                            <h4 className="text-xl font-bold text-panacea-primary mb-2">{t("steps.step1")}</h4>
                            <p className="text-gray-600">{t("steps.step1Desc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <div className="w-12 h-12 bg-panacea-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                2
                            </div>
                            <h4 className="text-xl font-bold text-panacea-primary mb-2">{t("steps.step2")}</h4>
                            <p className="text-gray-600">{t("steps.step2Desc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <div className="w-12 h-12 bg-panacea-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                3
                            </div>
                            <h4 className="text-xl font-bold text-panacea-primary mb-2">{t("steps.step3")}</h4>
                            <p className="text-gray-600">{t("steps.step3Desc")}</p>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <div className="w-12 h-12 bg-panacea-accent text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                4
                            </div>
                            <h4 className="text-xl font-bold text-panacea-primary mb-2">{t("steps.step4")}</h4>
                            <p className="text-gray-600">{t("steps.step4Desc")}</p>
                        </div>
                    </div>
                </div>

                {/* CTA – Get your free consultation now → consult-online form */}
                <div className={`mt-16 bg-gradient-to-br from-panacea-primary via-panacea-primary to-panacea-dark rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg ${isRTL ? "text-right" : "text-center"}`}>
                    <h3 className="text-2xl md:text-4xl font-bold mb-3">
                        {t("cta.title")}
                    </h3>
                    <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                        {t("cta.subtitle")}
                    </p>
                    <Link
                        href={`/${locale}/consult-online`}
                        className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-panacea-accent hover:bg-panacea-accent/90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                        {t("cta.button")}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
