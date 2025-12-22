"use client";

import TopBanner from "@/components/TopBanner";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import caseStudies from "@/data/caseStudies.json";

export default function CaseStudyDetailPage({ params }) {
    const { locale, id } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("caseStudies");

    const study = caseStudies.find((s) => s.id === id);
    if (!study) {
        notFound();
    }

    // Get localized content
    const name = locale === "ar" ? study.nameAr : locale === "fr" ? study.nameFr : study.name;
    const title = locale === "ar" ? study.titleAr : locale === "fr" ? study.titleFr : study.title;
    const treatment = locale === "ar" ? study.treatmentAr : locale === "fr" ? study.treatmentFr : study.treatment;
    const hospital = locale === "ar" ? study.hospitalAr : locale === "fr" ? study.hospitalFr : study.hospital;
    const doctor = locale === "ar" ? study.doctorAr : locale === "fr" ? study.doctorFr : study.doctor;
    const country = locale === "ar" ? study.countryAr : locale === "fr" ? study.countryFr : study.country;
    const gender = locale === "ar" ? study.genderAr : locale === "fr" ? study.genderFr : study.gender;
    const diagnosis = locale === "ar" ? study.diagnosisAr : locale === "fr" ? study.diagnosisFr : study.diagnosis;
    const journey = locale === "ar" ? study.journeyAr : locale === "fr" ? study.journeyFr : study.journey;
    const experience = locale === "ar" ? study.experienceAr : locale === "fr" ? study.experienceFr : study.experience;
    const outcome = locale === "ar" ? study.outcomeAr : locale === "fr" ? study.outcomeFr : study.outcome;
    const testimonial = locale === "ar" ? study.testimonialAr : locale === "fr" ? study.testimonialFr : study.testimonial;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="caseStudies"
                title={title}
                subtitle={`${t("patient")}: ${name} | ${t("country")}: ${country}`}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Patient Details Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
                        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                            {t("patientDetails")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("patient")}:</span>
                                    <p className="text-lg font-bold text-gray-900">{name}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("age")}:</span>
                                    <p className="text-lg text-gray-900">{study.age} {t("years")}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("gender")}:</span>
                                    <p className="text-lg text-gray-900">{gender}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("country")}:</span>
                                    <p className="text-lg text-gray-900 flex items-center gap-2">
                                        <span>{study.countryFlag}</span>
                                        <span>{country}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("doctor")}:</span>
                                    <p className="text-lg font-bold text-gray-900">{doctor}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("hospital")}:</span>
                                    <p className="text-lg text-gray-900">{hospital}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">{t("treatment")}:</span>
                                    <p className="text-lg text-gray-900">{treatment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Story Sections */}
                    <div className="space-y-12">
                        {/* Diagnosis & Challenge */}
                        <div>
                            <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("diagnosisTitle")}
                            </h3>
                            <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                {diagnosis}
                            </p>
                        </div>

                        {/* Finding Treatment Abroad */}
                        <div>
                            <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("journeyTitle")}
                            </h3>
                            <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                {journey}
                            </p>
                        </div>

                        {/* Treatment & Hospital Experience */}
                        <div>
                            <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("experienceTitle")}
                            </h3>
                            <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                {experience}
                            </p>
                        </div>

                        {/* Recovery & Outcome */}
                        <div>
                            <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("outcomeTitle")}
                            </h3>
                            <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                {outcome}
                            </p>
                        </div>

                        {/* Patient Testimonial Quote */}
                        <div className="bg-panacea-light rounded-2xl p-8 md:p-10 border-l-4 border-panacea-primary">
                            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                                <svg className="w-12 h-12 text-panacea-primary opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-xl text-gray-800 italic leading-relaxed">
                                    &ldquo;{testimonial}&rdquo;
                                </p>
                                <p className="text-lg font-bold text-panacea-primary">
                                    — {name}, {country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

