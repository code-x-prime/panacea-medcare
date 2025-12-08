"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";

export default function TeleconsultationPage({ params }) {
    const { locale } = params;
    const t = useTranslations("teleconsultation");
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="teleconsultation"
                backgroundImage="/images/teleconsultation-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />

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
            </section>
        </main>
    );
}
