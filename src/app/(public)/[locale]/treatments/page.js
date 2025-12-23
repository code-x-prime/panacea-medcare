"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function TreatmentsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("treatments");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.treatments") || "Treatments", href: `/${locale}/treatments` }
    ];

    const treatments = [
        {
            key: "cardiac",
            name: t("treatments.cardiac") || "Cardiac Treatment",
            icon: "🫀",
            slug: "/treatments/cardiac"
        },
        {
            key: "oncology",
            name: t("treatments.oncology") || "Oncology",
            icon: "🧬",
            slug: "/treatments/oncology"
        },
        {
            key: "orthopedics",
            name: t("treatments.orthopedics") || "Orthopedics",
            icon: "🦴",
            slug: "/treatments/orthopedics"
        },
        {
            key: "neurosurgery",
            name: t("treatments.neurosurgery") || "Neurosurgery",
            icon: "🧠",
            slug: "/treatments/neurosurgery"
        },
        {
            key: "bmt",
            name: t("treatments.bmt") || "Bone Marrow Transplant",
            icon: "🧪",
            slug: "/treatments/bmt"
        },
        {
            key: "robotic",
            name: t("treatments.robotic") || "Robotic Surgery",
            icon: "🤖",
            slug: "/treatments/robotic"
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="treatments"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading") || "Medical Treatments in India"}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro") || "Comprehensive medical treatments across various specialties with world-class facilities and expert care."}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((treatment) => (
                        <Link
                            key={treatment.key}
                            href={`/${locale}${treatment.slug}`}
                            className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-panacea-primary"
                        >
                            <div className={`text-5xl mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {treatment.icon}
                            </div>
                            <h3 className={`text-2xl font-bold text-panacea-primary mb-3 group-hover:text-panacea-accent transition-colors ${isRTL ? "text-right" : "text-left"}`}>
                                {treatment.name}
                            </h3>
                            <p className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                                {t(`treatments.${treatment.key}Desc`) || `Learn more about ${treatment.name}`}
                            </p>
                            <div className={`mt-4 text-panacea-accent font-semibold ${isRTL ? "text-right" : "text-left"}`}>
                                {t("cta") || "Learn More"} →
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}


