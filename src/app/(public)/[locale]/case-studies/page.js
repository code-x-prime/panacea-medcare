"use client";

import TopBanner from "@/components/TopBanner";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import caseStudies from "@/data/caseStudies.json";

export default function CaseStudiesPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("caseStudies");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="caseStudies"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study) => {
                        const name = locale === "ar" ? study.nameAr : locale === "fr" ? study.nameFr : study.name;
                        const title = locale === "ar" ? study.titleAr : locale === "fr" ? study.titleFr : study.title;
                        const treatment = locale === "ar" ? study.treatmentAr : locale === "fr" ? study.treatmentFr : study.treatment;
                        const hospital = locale === "ar" ? study.hospitalAr : locale === "fr" ? study.hospitalFr : study.hospital;
                        const country = locale === "ar" ? study.countryAr : locale === "fr" ? study.countryFr : study.country;

                        return (
                            <Link
                                key={study.id}
                                href={`/${locale}/case-studies/${study.id}`}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    <Image
                                        src={study.thumbnail}
                                        alt={name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    {/* Country Flag */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
                                        {study.countryFlag}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-panacea-primary transition-colors line-clamp-2">
                                        {title}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="font-semibold">{t("patient")}:</span>
                                            <span>{name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="font-semibold">{t("treatment")}:</span>
                                            <span className="line-clamp-1">{treatment}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="font-semibold">{t("hospital")}:</span>
                                            <span className="line-clamp-1">{hospital}</span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className={`flex items-center gap-2 text-panacea-primary font-semibold ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span>{t("viewFullStory")}</span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

