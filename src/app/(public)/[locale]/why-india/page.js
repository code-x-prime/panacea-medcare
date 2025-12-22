"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

export default function WhyIndiaPage({ params }) {
    const { locale } = params;
    const t = useTranslations("whyIndia");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.whyIndia") || "Why India", href: `/${locale}/why-india` }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="whyIndia"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading") || "Why Choose India for Medical Treatment?"}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro") || "India has emerged as a leading destination for medical tourism, offering world-class healthcare at affordable prices."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🏥</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.worldClass") || "World-Class Healthcare"}</h3>
                        <p className="text-gray-600">{t("benefits.worldClassDesc") || "JCI-accredited hospitals with state-of-the-art medical facilities and technology."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">💰</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.affordable") || "Affordable Treatment"}</h3>
                        <p className="text-gray-600">{t("benefits.affordableDesc") || "Significantly lower costs compared to Western countries without compromising quality."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">👨‍⚕️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.experts") || "Expert Doctors"}</h3>
                        <p className="text-gray-600">{t("benefits.expertsDesc") || "Internationally trained and experienced medical professionals."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.noWaiting") || "No Waiting Times"}</h3>
                        <p className="text-gray-600">{t("benefits.noWaitingDesc") || "Immediate access to treatment without long waiting periods."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🌍</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.multilingual") || "Multilingual Support"}</h3>
                        <p className="text-gray-600">{t("benefits.multilingualDesc") || "Support in multiple languages for international patients."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">✈️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("benefits.travel") || "Easy Travel"}</h3>
                        <p className="text-gray-600">{t("benefits.travelDesc") || "Simplified visa process and travel arrangements for medical tourists."}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

