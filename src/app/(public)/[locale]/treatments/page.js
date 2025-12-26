"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";

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
            name: t("treatments.cardiac") || "Cardiac Sciences",
            svg: "/treatment/cardiac-sciences.svg",
            slug: "/treatments/cardiac",
            color: "from-red-50 to-red-100",
            borderColor: "border-red-200 hover:border-red-400"
        },
        {
            key: "neurosurgery",
            name: t("treatments.neurosurgery") || "Neurosciences",
            svg: "/treatment/neurosciences.svg",
            slug: "/treatments/neurosurgery",
            color: "from-purple-50 to-purple-100",
            borderColor: "border-purple-200 hover:border-purple-400"
        },
        {
            key: "orthopedics",
            name: t("treatments.orthopedics") || "Orthopedics & Joint Replacement",
            svg: "/treatment/orthopedics-joint-replacement.svg",
            slug: "/treatments/orthopedics",
            color: "from-panacea-blue-50 to-panacea-blue-100",
            borderColor: "border-panacea-blue-200 hover:border-panacea-blue-400"
        },
        {
            key: "oncology",
            name: t("treatments.oncology") || "Oncology (Cancer Care)",
            svg: "/treatment/oncology-cancer-care.svg",
            slug: "/treatments/oncology",
            color: "from-pink-50 to-pink-100",
            borderColor: "border-pink-200 hover:border-pink-400"
        },
        {
            key: "bmt",
            name: t("treatments.bmt") || "Bone Marrow Transplant (BMT)",
            svg: "/treatment/bone-marrow-transplant.svg",
            slug: "/treatments/bmt",
            color: "from-cyan-50 to-cyan-100",
            borderColor: "border-cyan-200 hover:border-cyan-400"
        },
        {
            key: "transplant",
            name: t("treatments.transplant") || "Organ Transplantation",
            svg: "/treatment/organ-transplantation.svg",
            slug: "/treatments/organ-transplant",
            color: "from-green-50 to-green-100",
            borderColor: "border-green-200 hover:border-green-400"
        },
        {
            key: "gastroenterology",
            name: t("treatments.gastroenterology") || "Gastroenterology & Hepatology",
            svg: "/treatment/gastroenterology-hepatology.svg",
            slug: "/treatments/gastroenterology",
            color: "from-yellow-50 to-yellow-100",
            borderColor: "border-yellow-200 hover:border-yellow-400"
        },
        {
            key: "gynecology",
            name: t("treatments.gynecology") || "Gynecology & Women's Health",
            svg: "/treatment/gynecology-women-health.svg",
            slug: "/treatments/gynecology",
            color: "from-rose-50 to-rose-100",
            borderColor: "border-rose-200 hover:border-rose-400"
        },
        {
            key: "pediatrics",
            name: t("treatments.pediatrics") || "Paediatrics & Paediatric Surgery",
            svg: "/treatment/paediatrics-paediatric-surgery.svg",
            slug: "/treatments/pediatrics",
            color: "from-indigo-50 to-indigo-100",
            borderColor: "border-indigo-200 hover:border-indigo-400"
        },
        {
            key: "laparoscopic",
            name: t("treatments.laparoscopic") || "Laparoscopic Surgery",
            svg: "/treatment/laparoscopic-surgery.svg",
            slug: "/treatments/laparoscopic",
            color: "from-teal-50 to-teal-100",
            borderColor: "border-teal-200 hover:border-teal-400"
        },
        {
            key: "robotic",
            name: t("treatments.robotic") || "Robotic Surgery",
            svg: "/treatment/robotic-surgery.svg",
            slug: "/treatments/robotic",
            color: "from-orange-50 to-orange-100",
            borderColor: "border-orange-200 hover:border-orange-400"
        },
        {
            key: "ophthalmology",
            name: t("treatments.ophthalmology") || "Ophthalmology (Eye Care)",
            svg: "/treatment/ophthalmology.svg",
            slug: "/treatments/ophthalmology",
            color: "from-violet-50 to-violet-100",
            borderColor: "border-violet-200 hover:border-violet-400"
        },
        {
            key: "dental",
            name: t("treatments.dental") || "Dental Care & Cosmetic Dentistry",
            svg: "/treatment/dental-care-cosmetic-dentistry.svg",
            slug: "/treatments/dental",
            color: "from-sky-50 to-sky-100",
            borderColor: "border-sky-200 hover:border-sky-400"
        },
        {
            key: "aesthetic",
            name: t("treatments.aesthetic") || "Aesthetic, Cosmetic & Plastic Surgery",
            svg: "/treatment/aesthetic-cosmetic-plastic-surgery.svg",
            slug: "/treatments/aesthetic",
            color: "from-fuchsia-50 to-fuchsia-100",
            borderColor: "border-fuchsia-200 hover:border-fuchsia-400"
        },
        {
            key: "mentalHealth",
            name: t("treatments.mentalHealth") || "Mental Health & Wellness",
            svg: "/treatment/mental-health-wellness.svg",
            slug: "/treatments/mental-health",
            color: "from-emerald-50 to-emerald-100",
            borderColor: "border-emerald-200 hover:border-emerald-400"
        },
        {
            key: "diagnostics",
            name: t("treatments.diagnostics") || "Diagnostics & Advanced Imaging",
            svg: "/treatment/diagnostics-advanced-imaging.svg",
            slug: "/treatments/diagnostics",
            color: "from-slate-50 to-slate-100",
            borderColor: "border-slate-200 hover:border-slate-400"
        },
        {
            key: "rehabilitation",
            name: t("treatments.rehabilitation") || "Rehabilitation & Recovery",
            svg: "/treatment/rehabilitation-recovery.svg",
            slug: "/treatments/rehabilitation",
            color: "from-amber-50 to-amber-100",
            borderColor: "border-amber-200 hover:border-amber-400"
        },
        {
            key: "ayurveda",
            name: t("treatments.ayurveda") || "Ayurveda & Holistic Wellness",
            svg: "/treatment/ayurveda-holistic-wellness.svg",
            slug: "/treatments/ayurveda",
            color: "from-lime-50 to-lime-100",
            borderColor: "border-lime-200 hover:border-lime-400"
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"} className="bg-panacea-light">
            <TopBanner
                locale={locale}
                namespace="treatments"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            {/* Intro Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-base sm:text-lg md:text-xl text-panacea-gray font-medium break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.6' }}>
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {/* Treatments Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {treatments.map((treatment) => (
                        <Link
                            key={treatment.key}
                            href={`/${locale}${treatment.slug}`}
                            className={`group bg-white p-6 md:p-8 rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all duration-300 border-2 ${treatment.borderColor} transform hover:-translate-y-1 h-full flex flex-col`}
                        >
                            <div className={`mb-4 ${isRTL ? "text-right" : "text-left"} flex-shrink-0 w-16 h-16 md:w-20 md:h-20 relative`}>
                                <Image
                                    src={treatment.svg}
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
                                {t(`treatments.${treatment.key}Desc`)}
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


