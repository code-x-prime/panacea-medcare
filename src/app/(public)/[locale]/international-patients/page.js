"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";

export default function InternationalPatientsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("internationalPatients");
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="internationalPatients"
                variant="gradient"
                size="md"
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
