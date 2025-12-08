"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";

export default function AboutPage({ params }) {
    const { locale } = params;
    const t = useTranslations("about");
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="about"
                backgroundImage="/images/about-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Who We Are */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("description")}
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className={`bg-panacea-light p-8 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold text-panacea-primary mb-4">{t("mission")}</h3>
                        <p className="text-gray-700 leading-relaxed">{t("missionText")}</p>
                    </div>
                    <div className={`bg-panacea-light p-8 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold text-panacea-primary mb-4">{t("vision")}</h3>
                        <p className="text-gray-700 leading-relaxed">{t("visionText")}</p>
                    </div>
                </div>

                {/* Our Values */}
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("values")}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.quality")}</h4>
                            <p className="text-gray-600">{t("valuesItems.qualityDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.transparency")}</h4>
                            <p className="text-gray-600">{t("valuesItems.transparencyDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.support")}</h4>
                            <p className="text-gray-600">{t("valuesItems.supportDesc")}</p>
                        </div>
                        <div className={`p-6 border-2 border-panacea-primary rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h4 className="text-xl font-bold text-panacea-primary mb-3">{t("valuesItems.affordability")}</h4>
                            <p className="text-gray-600">{t("valuesItems.affordabilityDesc")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
