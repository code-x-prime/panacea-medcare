"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ServicesPage({ params }) {
    const { locale } = params;
    const t = useTranslations("services");
    const isRTL = locale === "ar";

    const services = [
        {
            key: "teleconsultation",
            href: "/services/teleconsultation",
            icon: "💻"
        },
        {
            key: "teleRadiology",
            href: "/services/tele-radiology",
            icon: "🔬"
        },
        {
            key: "telePathology",
            href: "/services/tele-pathology",
            icon: "🧬"
        },
        {
            key: "aiSolutions",
            href: "/services/ai-solutions",
            icon: "🤖"
        },
        {
            key: "medicalTourism",
            href: "/services/medical-tourism",
            icon: "✈️"
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="services"
                backgroundImage="/images/services-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Link
                            key={service.key}
                            href={`/${locale}${service.href}`}
                            className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-panacea-primary"
                        >
                            <div className={`text-5xl mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {service.icon}
                            </div>
                            <h3 className={`text-2xl font-bold text-panacea-primary mb-3 group-hover:text-panacea-accent transition-colors ${isRTL ? "text-right" : "text-left"}`}>
                                {t(`servicesList.${service.key}`)}
                            </h3>
                            <p className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                                {t(`servicesList.${service.key}Desc`)}
                            </p>
                            <div className={`mt-4 text-panacea-accent font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                                {t("cta")} →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
