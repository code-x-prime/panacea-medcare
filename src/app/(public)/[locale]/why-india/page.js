"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function WhyIndiaPage({ params }) {
    const { locale } = params;
    const t = useTranslations("whyIndia");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.whyIndia") || "Why India", href: `/${locale}/why-india` }
    ];

    const reasons = [
        {
            id: 1,
            icon: "/why-india/high-quality.svg",
            title: t("reasons.highQuality.title"),
            points: [
                t("reasons.highQuality.point1"),
                t("reasons.highQuality.point2")
            ]
        },
        {
            id: 2,
            icon: "/why-india/cost-effective.svg",
            title: t("reasons.costEffective.title"),
            points: [
                t("reasons.costEffective.point1"),
                t("reasons.costEffective.point2")
            ]
        },
        {
            id: 3,
            icon: "/why-india/wide-range.svg",
            title: t("reasons.wideRange.title"),
            points: [
                t("reasons.wideRange.point1"),
                t("reasons.wideRange.point2")
            ]
        },
        {
            id: 4,
            icon: "/why-india/no-waiting.svg",
            title: t("reasons.noWaiting.title"),
            points: [
                t("reasons.noWaiting.point1")
            ]
        },
        {
            id: 5,
            icon: "/why-india/ease-communication.svg",
            title: t("reasons.communication.title"),
            points: [
                t("reasons.communication.point1"),
                t("reasons.communication.point2")
            ]
        },
        {
            id: 6,
            icon: "/why-india/holistic-wellness.svg",
            title: t("reasons.holistic.title"),
            points: [
                t("reasons.holistic.point1"),
                t("reasons.holistic.point2")
            ]
        },
        {
            id: 7,
            icon: "/why-india/tourism-opportunities.svg",
            title: t("reasons.tourism.title"),
            points: [
                t("reasons.tourism.point1"),
                t("reasons.tourism.point2")
            ]
        },
        {
            id: 8,
            icon: "/why-india/supportive-government.svg",
            title: t("reasons.government.title"),
            points: [
                t("reasons.government.point1"),
                t("reasons.government.point2")
            ]
        },
        {
            id: 9,
            icon: "/why-india/positive-outcomes.svg",
            title: t("reasons.success.title"),
            points: [
                t("reasons.success.point1")
            ]
        },
        {
            id: 10,
            icon: "/why-india/global-connectivity.svg",
            title: t("reasons.connectivity.title"),
            points: [
                t("reasons.connectivity.point1")
            ]
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="whyIndia"
                variant="gradient"
                size="md"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction Section - Enhanced */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center`}>
                            {t("mainTitle") || "What is Medical Value Travel & Why Should You Choose India"}
                        </h2>
                    </div>
                    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-panacea-lg border border-gray-100">
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p className={isRTL ? "text-right" : "text-left"}>
                                {t("intro1") || "Medical Value Travel (MVT) is the practice of traveling across international borders to obtain medical care, typically at a lower cost, with higher quality, or access to treatments not available in one's home country. This type of travel includes various medical procedures, from elective surgeries and specialized treatments to wellness and preventive care."}
                            </p>
                            <p className={`font-semibold text-panacea-primary ${isRTL ? "text-right" : "text-left"}`}>
                                {t("intro2") || "India has become one of the leading destinations for Medical Value Travel (MVT) due to several compelling reasons. Here's why patients from around the world choose India for medical treatments:"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reasons Grid - Enhanced */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 max-w-7xl mx-auto">
                    {reasons.map((reason) => {
                        return (
                            <div
                                key={reason.id}
                                className={`bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30 group relative overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
                            >
                                {/* Decorative gradient background */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-panacea-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className={`flex items-start gap-4 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="w-16 h-16 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md group-hover:shadow-lg p-3">
                                        <Image
                                            src={reason.icon}
                                            alt={reason.title}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 object-contain filter brightness-0 invert"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <span className="text-3xl font-bold text-panacea-accent bg-panacea-accent/10 px-3 py-1 rounded-lg">{reason.id}</span>
                                            <h3 className="text-xl md:text-2xl font-bold text-panacea-primary group-hover:text-panacea-secondary transition-colors">
                                                {reason.title}
                                            </h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {reason.points.map((point, idx) => (
                                                <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <span className="text-panacea-accent text-xl font-bold mt-1 flex-shrink-0">✓</span>
                                                    <span className="text-gray-700 leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Price Comparison Table Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                <Image
                                    src="/why-india/advantage-india.svg"
                                    alt="Advantage India"
                                    width={48}
                                    height={48}
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert"
                                />
                            </div>
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                                {t("priceComparison.title") || "Advantage India"}
                            </h2>
                        </div>
                        <p className="text-center text-lg md:text-xl text-white/90">
                            {t("priceComparison.subtitle") || "Price Comparison in USD ($)"}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-panacea-primary to-panacea-secondary text-white">
                                        <th className={`px-4 py-4 md:px-6 md:py-5 text-left font-bold text-sm md:text-base ${isRTL ? "text-right" : "text-left"}`}>
                                            {t("priceComparison.table.surgery") || "Surgery"}
                                        </th>
                                        <th className={`px-4 py-4 md:px-6 md:py-5 text-center font-bold text-sm md:text-base`}>
                                            {t("priceComparison.table.usa") || "USA"}
                                        </th>
                                        <th className={`px-4 py-4 md:px-6 md:py-5 text-center font-bold text-sm md:text-base bg-panacea-accent/20`}>
                                            {t("priceComparison.table.india") || "India"}
                                        </th>
                                        <th className={`px-4 py-4 md:px-6 md:py-5 text-center font-bold text-sm md:text-base`}>
                                            {t("priceComparison.table.singapore") || "Singapore"}
                                        </th>
                                        <th className={`px-4 py-4 md:px-6 md:py-5 text-center font-bold text-sm md:text-base`}>
                                            {t("priceComparison.table.thailand") || "Thailand"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {t.raw("priceComparison.table.procedures").map((procedure, idx) => (
                                        <tr
                                            key={idx}
                                            className={`border-b border-gray-200 hover:bg-panacea-light/50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                        >
                                            <td className={`px-4 py-4 md:px-6 md:py-5 font-semibold text-panacea-dark text-sm md:text-base ${isRTL ? "text-right" : "text-left"}`}>
                                                {procedure.name}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-center text-gray-700 text-sm md:text-base">
                                                ${procedure.usa}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-center font-bold text-panacea-primary text-sm md:text-base bg-panacea-accent/10">
                                                ${procedure.india}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-center text-gray-700 text-sm md:text-base">
                                                ${procedure.singapore}
                                            </td>
                                            <td className="px-4 py-4 md:px-6 md:py-5 text-center text-gray-700 text-sm md:text-base">
                                                ${procedure.thailand}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Summary Section - Enhanced */}
                <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 shadow-panacea-lg text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <p className={`text-xl md:text-2xl font-semibold leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                            {t("summary") || "India's combination of quality healthcare, affordability, and a wide range of treatment options makes it a top choice for medical value travel."}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

