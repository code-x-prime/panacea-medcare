"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
    Activity, Brain, Bone, Heart, Footprints, Baby,
    Users, Sparkles, Scale, Droplet, Syringe, Dna
} from "lucide-react";

export default function MultiSpecialtyFocus({ locale }) {
    const t = useTranslations("specialties");
    const isRTL = locale === "ar";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const specialties = [
        { id: "oncology", icon: Activity, name: t("oncology"), desc: t("oncologyDesc") },
        { id: "neurosurgery", icon: Brain, name: t("neurosurgery"), desc: t("neurosurgeryDesc") },
        { id: "spine-surgery", icon: Bone, name: t("spineSurgery"), desc: t("spineSurgeryDesc") },
        { id: "cardiology", icon: Heart, name: t("cardiology"), desc: t("cardiologyDesc") },
        { id: "orthopedics", icon: Footprints, name: t("orthopedics"), desc: t("orthopedicsDesc") },
        { id: "ivf", icon: Baby, name: t("ivf"), desc: t("ivfDesc") },
        { id: "gynecology", icon: Users, name: t("gynecology"), desc: t("gynecologyDesc") },
        { id: "cosmetic", icon: Sparkles, name: t("cosmetic"), desc: t("cosmeticDesc") },
        { id: "weight-loss", icon: Scale, name: t("weightLoss"), desc: t("weightLossDesc") },
        { id: "liver-transplant", icon: Droplet, name: t("liverTransplant"), desc: t("liverTransplantDesc") },
        { id: "kidney-transplant", icon: Syringe, name: t("kidneyTransplant"), desc: t("kidneyTransplantDesc") },
        { id: "bone-marrow", icon: Dna, name: t("boneMarrow"), desc: t("boneMarrowDesc") },
    ];

    const countries = [
        { id: "india", flag: "🇮🇳", name: t("india") },
        { id: "turkey", flag: "🇹🇷", name: t("turkey") },
        { id: "thailand", flag: "🇹🇭", name: t("thailand") },
        { id: "uae", flag: "🇦🇪", name: t("uae") },
        { id: "germany", flag: "🇩🇪", name: t("germany") },
    ];

    const handleSpecialtyClick = (specialty) => {
        setSelectedSpecialty(specialty);
        setSelectedCountry(null);
        setIsModalOpen(true);
    };

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedSpecialty(null);
        setSelectedCountry(null);
    };

    return (
        <>
            <section
                className="py-12 md:py-16 bg-white"
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="container mx-auto px-4">
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

                    {/* Specialty Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                        {specialties.map((specialty) => {
                            const Icon = specialty.icon;
                            return (
                                <div
                                    key={specialty.id}
                                    onClick={() => handleSpecialtyClick(specialty)}
                                    className={`group relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-panacea-primary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isRTL ? "text-right" : "text-left"
                                        }`}
                                >
                                    {/* Icon with Background */}
                                    <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <div className="flex-shrink-0 w-16 h-16 bg-panacea-light rounded-xl flex items-center justify-center border-2 border-panacea-primary/20 group-hover:border-panacea-primary group-hover:scale-110 transition-all duration-300">
                                            <Icon className="w-8 h-8 text-panacea-primary" />
                                        </div>

                                        <div className="flex-1 pt-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-panacea-primary transition-colors">
                                                {specialty.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {specialty.desc}
                                            </p>
                                        </div>

                                        {/* Plus Icon */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-panacea-accent rounded-full flex items-center justify-center text-white shadow-md group-hover:rotate-90 group-hover:scale-110 transition-all duration-300">
                                            <span className="text-2xl leading-none font-light">+</span>
                                        </div>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-panacea-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && selectedSpecialty && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-panacea-primary/20"
                        onClick={(e) => e.stopPropagation()}
                        dir={isRTL ? "rtl" : "ltr"}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-panacea-accent hover:bg-red-700 text-white rounded-full transition-colors shadow-lg"
                        >
                            <span className="text-2xl leading-none">×</span>
                        </button>

                        {/* Specialty Header with Icon */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="w-16 h-16 bg-panacea-light rounded-xl flex items-center justify-center border-2 border-panacea-primary shadow-md">
                                {selectedSpecialty.icon && <selectedSpecialty.icon className="w-8 h-8 text-panacea-primary" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                    {selectedSpecialty.name}
                                </h3>
                                <p className="text-gray-600">{selectedSpecialty.desc}</p>
                            </div>
                        </div>

                        {/* Country Selection */}
                        {!selectedCountry && (
                            <div>
                                <h4 className="text-lg font-semibold text-panacea-primary mb-6">
                                    {t("selectCountry")}
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {countries.map((country) => (
                                        <button
                                            key={country.id}
                                            onClick={() => handleCountryClick(country)}
                                            className="group flex flex-col items-center gap-3 p-5 bg-panacea-light border-2 border-panacea-primary/20 rounded-2xl hover:border-panacea-primary hover:shadow-lg transition-all duration-300 hover:scale-105"
                                        >
                                            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-panacea-primary transition-colors">
                                                {country.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Options after country selection */}
                        {selectedCountry && (
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleCountryClick(null)}
                                    className="text-sm text-panacea-primary hover:underline mb-6"
                                >
                                    ← {t("back")}
                                </button>

                                <Link
                                    href={`/${locale}/doctors/${selectedSpecialty.id}/${selectedCountry.id}`}
                                    className="block w-full p-5 bg-panacea-primary hover:bg-panacea-dark rounded-2xl text-center font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    {t("bestDoctors", {
                                        specialty: selectedSpecialty.name,
                                        country: selectedCountry.name
                                    })}
                                </Link>

                                <Link
                                    href={`/${locale}/hospitals/${selectedSpecialty.id}/${selectedCountry.id}`}
                                    className="block w-full p-5 bg-panacea-primary hover:bg-panacea-dark rounded-2xl text-center font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    {t("bestHospitals", {
                                        specialty: selectedSpecialty.name,
                                        country: selectedCountry.name
                                    })}
                                </Link>

                                <Link
                                    href={`/${locale}/treatment-cost/${selectedSpecialty.id}/${selectedCountry.id}`}
                                    className="block w-full p-5 bg-panacea-accent hover:bg-red-700 rounded-2xl text-center font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    {t("treatmentCost", {
                                        specialty: selectedSpecialty.name,
                                        country: selectedCountry.name
                                    })}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
