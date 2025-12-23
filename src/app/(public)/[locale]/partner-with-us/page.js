"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

export default function PartnerWithUsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("partnerWithUs");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.partner") || "Partner With Us", href: `/${locale}/partner-with-us` }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="partnerWithUs"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading") || "Partner With Us"}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro") || "Join us in providing world-class healthcare solutions to patients worldwide. We offer partnership opportunities for hospitals, clinics, and healthcare providers."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className={`bg-panacea-light p-8 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold text-panacea-primary mb-4">{t("benefits.title") || "Partnership Benefits"}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-panacea-accent text-xl">✓</span>
                                <span>{t("benefits.item1") || "Access to international patient network"}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-panacea-accent text-xl">✓</span>
                                <span>{t("benefits.item2") || "Marketing and promotional support"}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-panacea-accent text-xl">✓</span>
                                <span>{t("benefits.item3") || "Streamlined patient coordination"}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-panacea-accent text-xl">✓</span>
                                <span>{t("benefits.item4") || "Revenue sharing opportunities"}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold text-panacea-primary mb-4">{t("contact.title") || "Get in Touch"}</h3>
                        <p className="text-gray-700 mb-6">{t("contact.desc") || "Interested in partnering with us? Contact our partnership team."}</p>
                        <a
                            href={`/${locale}/contact`}
                            className="inline-block bg-panacea-accent hover:bg-panacea-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            {t("contact.cta") || "Contact Us"}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}


