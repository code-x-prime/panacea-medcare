"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function MultiSpecialtyFocus({ locale }) {
    const t = useTranslations("specialties");
    const isRTL = locale === "ar";

    // Mapping specialty IDs to treatment page slugs
    const specialtyToTreatmentMap = {
        "oncology": "oncology",
        "neurosurgery": "neurosurgery",
        "spine-surgery": "orthopedics",
        "cardiology": "cardiac",
        "orthopedics": "orthopedics",
        "ivf": "gynecology",
        "gynecology": "gynecology",
        "cosmetic": "aesthetic",
        "weight-loss": "laparoscopic",
        "liver-transplant": "organ-transplant",
        "kidney-transplant": "organ-transplant",
        "bone-marrow": "bmt",
    };

    const specialties = [
        { id: "oncology", svg: "/specialty/oncology.svg", name: t("oncology"), desc: t("oncologyDesc") },
        { id: "neurosurgery", svg: "/specialty/neurosurgery.svg", name: t("neurosurgery"), desc: t("neurosurgeryDesc") },
        { id: "spine-surgery", svg: "/specialty/spine-surgery.svg", name: t("spineSurgery"), desc: t("spineSurgeryDesc") },
        { id: "cardiology", svg: "/specialty/cardiology.svg", name: t("cardiology"), desc: t("cardiologyDesc") },
        { id: "orthopedics", svg: "/specialty/orthopedics.svg", name: t("orthopedics"), desc: t("orthopedicsDesc") },
        { id: "ivf", svg: "/specialty/ivf.svg", name: t("ivf"), desc: t("ivfDesc") },
        { id: "gynecology", svg: "/specialty/gynecology.svg", name: t("gynecology"), desc: t("gynecologyDesc") },
        { id: "cosmetic", svg: "/specialty/cosmetic.svg", name: t("cosmetic"), desc: t("cosmeticDesc") },
        { id: "weight-loss", svg: "/specialty/weight-loss.svg", name: t("weightLoss"), desc: t("weightLossDesc") },
        { id: "liver-transplant", svg: "/specialty/liver-transplant.svg", name: t("liverTransplant"), desc: t("liverTransplantDesc") },
        { id: "kidney-transplant", svg: "/specialty/kidney-transplant.svg", name: t("kidneyTransplant"), desc: t("kidneyTransplantDesc") },
        { id: "bone-marrow", svg: "/specialty/bone-marrow.svg", name: t("boneMarrow"), desc: t("boneMarrowDesc") },
    ];

    return (
        <section
            className="py-12 md:py-16 bg-white"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 xl:max-w-7xl">
                {/* Heading */}
                <div className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                            {t("badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-14 gap-10  mx-auto">
                    {specialties.map((specialty) => {
                        const treatmentSlug = specialtyToTreatmentMap[specialty.id] || specialty.id;
                        return (
                            <Link
                                key={specialty.id}
                                href={`/${locale}/treatments/${treatmentSlug}`}
                                className={`group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-panacea-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isRTL ? "text-right" : "text-left"
                                    }`}
                            >
                                {/* Icon with Background */}
                                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="flex-shrink-0 w-16 h-16 bg-panacea-light rounded-xl flex items-center justify-center border-2 border-panacea-primary/20 group-hover:border-panacea-primary group-hover:scale-110 transition-all duration-300">
                                        <Image
                                            src={specialty.svg}
                                            alt={specialty.name}
                                            width={32}
                                            height={32}
                                            className="w-12 h-12     object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-panacea-primary transition-colors">
                                            {specialty.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {specialty.desc}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="flex-shrink-0 w-10 h-10 bg-panacea-accent rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-all duration-300">
                                        <svg
                                            className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-panacea-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
