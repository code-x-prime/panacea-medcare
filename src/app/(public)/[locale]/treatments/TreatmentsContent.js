"use client";
import { localePath } from "@/lib/locale/routing";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { treatmentsData } from "@/data/treatmentsData";

export default function TreatmentsContent({ locale }) {
    const t = useTranslations("treatments");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: localePath(locale, '/') },
        { label: t("breadcrumb.treatments") || "Treatments", href: localePath(locale, `/treatments`) }
    ];

    const treatments = Object.values(treatmentsData).map(treatment => ({
        ...treatment,
        name: t(`treatments.${treatment.id}`), // Dynamic translation lookup
        description: t(`treatments.${treatment.id}Desc`)
    }));

    return (
        <main dir={isRTL ? "rtl" : "ltr"} className="bg-panacea-light">
            <TopBanner
                locale={locale}
                namespace="treatments"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            {/* Intro Section */}
            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-base sm:text-lg md:text-xl text-panacea-gray font-medium break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.6' }}>
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {/* Treatments Grid */}
            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {treatments.map((treatment) => (
                        <Link
                            key={treatment.id}
                            href={localePath(locale, `/treatments/${treatment.slug}`)}
                            className={`group bg-white p-6 md:p-8 rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all duration-300 border-2 ${treatment.borderColor} transform hover:-translate-y-1 h-full flex flex-col`}
                        >
                            <div className={`mb-4 ${isRTL ? "text-right" : "text-left"} flex-shrink-0 w-16 h-16 md:w-20 md:h-20 relative`}>
                                <Image
                                    src={treatment.icon}
                                    alt={treatment.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-panacea-dark mb-3 group-hover:text-panacea-primary transition-colors ${isRTL ? "text-right" : "text-left"} break-words`} style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.3' }}>
                                {treatment.name}
                            </h3>
                            <p className={`text-panacea-gray text-sm md:text-base mb-4 flex-grow ${isRTL ? "text-right" : "text-left"} break-words`} style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.6' }}>
                                {treatment.description}
                            </p>
                            <div className={`mt-auto text-panacea-accent font-semibold text-sm md:text-base flex items-center gap-2 ${isRTL ? "justify-end" : "justify-start"}`}>
                                <span>{t("cta")}</span>
                                <span className={`transition-transform ${isRTL ? "rotate-180" : ""} group-hover:translate-x-1`}>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
