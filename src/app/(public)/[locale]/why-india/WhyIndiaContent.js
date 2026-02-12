"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function WhyIndiaContent({ locale }) {
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
            icon: "/why-india/communication.svg",
            title: t("reasons.communication.title"),
            points: [
                t("reasons.communication.point1"),
                t("reasons.communication.point2")
            ]
        },
        {
            id: 6,
            icon: "/why-india/holistic.svg",
            title: t("reasons.holistic.title"),
            points: [
                t("reasons.holistic.point1"),
                t("reasons.holistic.point2")
            ]
        },
        {
            id: 7,
            icon: "/why-india/tourism.svg",
            title: t("reasons.tourism.title"),
            points: [
                t("reasons.tourism.point1"),
                t("reasons.tourism.point2")
            ]
        },
        {
            id: 8,
            icon: "/why-india/polices.svg",
            title: t("reasons.government.title"),
            points: [
                t("reasons.government.point1"),
                t("reasons.government.point2")
            ]
        },
        {
            id: 9,
            icon: "/why-india/success.svg",
            title: t("reasons.success.title"),
            points: [
                t("reasons.success.point1")
            ]
        },
        {
            id: 10,
            icon: "/why-india/connectivity.svg",
            title: t("reasons.connectivity.title"),
            points: [
                t("reasons.connectivity.point1")
            ]
        }
    ];

    const priceComparison = t.raw("priceComparison.table.procedures");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="whyIndia"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("mainTitle")}
                    </h2>
                    <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                        <p className={`${isRTL ? "text-right" : "text-left"}`}>{t("intro1")}</p>
                        <p className={`${isRTL ? "text-right" : "text-left"}`}>{t("intro2")}</p>
                    </div>
                </div>

                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {reasons.map((reason) => (
                        <div
                            key={reason.id}
                            className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all duration-300 border border-gray-100 hover:border-panacea-primary/20 group"
                        >
                            <div className={`flex items-start gap-4 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Image
                                        src={reason.icon}
                                        alt={reason.title}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain filter brightness-0 invert"
                                    />
                                </div>
                                <h3 className={`text-xl font-bold text-panacea-primary group-hover:text-panacea-secondary transition-colors ${isRTL ? "text-right" : "text-left"}`}>
                                    {reason.title}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {reason.points.map((point, idx) => (
                                    <li key={idx} className={`flex items-start gap-3 text-gray-600 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-accent flex-shrink-0 mt-1" />
                                        <span className={`text-sm leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Price Comparison Table */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4`}>
                            {t("priceComparison.title")}
                        </h2>
                        <p className="text-center text-white/90 text-lg">
                            {t("priceComparison.subtitle")}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className={`p-4 font-bold text-panacea-primary ${isRTL ? "text-right" : "text-left"}`}>
                                            {t("priceComparison.table.surgery")}
                                        </th>
                                        <th className="p-4 font-bold text-gray-700 text-center">{t("priceComparison.table.usa")}</th>
                                        <th className="p-4 font-bold text-panacea-secondary text-center bg-panacea-secondary/5 border-x border-panacea-secondary/10">
                                            {t("priceComparison.table.india")}
                                        </th>
                                        <th className="p-4 font-bold text-gray-700 text-center">{t("priceComparison.table.singapore")}</th>
                                        <th className="p-4 font-bold text-gray-700 text-center">{t("priceComparison.table.thailand")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceComparison.map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className={`p-4 font-medium text-gray-900 ${isRTL ? "text-right" : "text-left"}`}>
                                                {row.name}
                                            </td>
                                            <td className="p-4 text-gray-600 text-center">${row.usa}</td>
                                            <td className="p-4 font-bold text-panacea-secondary text-center bg-panacea-secondary/5 border-x border-panacea-secondary/10">
                                                ${row.india}
                                            </td>
                                            <td className="p-4 text-gray-600 text-center">${row.singapore}</td>
                                            <td className="p-4 text-gray-600 text-center">${row.thailand}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xl md:text-2xl font-semibold text-panacea-primary italic">
                        {t("summary")}
                    </p>
                </div>
            </section>
        </main>
    );
}
