"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import QuoteForm from "@/components/QuoteForm";
import {
    Calendar,
    Bed,
    Users,
    Award,
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle2,
    Star,
    ArrowRight,
    Stethoscope,
    Heart,
    Brain,
    Bone,
    Eye,
    Activity,
} from "lucide-react";

export default function HospitalDetailPage({ locale, hospitalData }) {
    const t = useTranslations("hospitalDetail");
    const isRTL = locale === "ar";
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Icon mapping for specialties
    const iconMap = {
        "Cardiology": Heart,
        "Neurology": Brain,
        "Orthopedics": Bone,
        "Oncology": Activity,
        "Ophthalmology": Eye,
        "General Surgery": Stethoscope,
        "Gastroenterology": Activity,
        "Nephrology": Activity,
        "Urology": Activity,
        "Transplant": Heart,
        "Pediatrics": Users,
    };

    // Add icons to specialties if they don't have them
    const processedHospital = hospitalData ? {
        ...hospitalData,
        specialties: hospitalData.specialties.map(spec => ({
            ...spec,
            icon: spec.icon || iconMap[spec.name] || Stethoscope
        })),
        stats: [
            { label: t("stats.patientsServed"), value: hospitalData.stats[0].value },
            { label: t("stats.successRate"), value: hospitalData.stats[1].value },
            { label: t("stats.departments"), value: hospitalData.stats[2].value },
            { label: t("stats.internationalPatients"), value: hospitalData.stats[3].value },
        ],
        doctors: hospitalData.doctors || [
            {
                name: "Dr. Rajesh Kumar",
                specialty: "Cardiology",
                experience: "25",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
            },
            {
                name: "Dr. Priya Sharma",
                specialty: "Neurology",
                experience: "18",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
            },
            {
                name: "Dr. Amit Patel",
                specialty: "Orthopedics",
                experience: "22",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop",
            },
        ]
    } : null;

    const hospital = processedHospital;

    return (
        <div className="bg-white" dir={isRTL ? "rtl" : "ltr"}>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={hospital.image}
                        alt={hospital.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                    <div className={`max-w-3xl ${isRTL ? "text-right" : "text-left"}`}>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            {hospital.name}
                        </h1>
                        <div
                            className={`flex items-center gap-2 text-white/90 text-lg mb-6 ${isRTL ? "flex-row-reverse" : ""
                                }`}
                        >
                            <MapPin className="w-5 h-5" />
                            <span>{hospital.location}</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{t("hero.established")}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {hospital.established}
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                                    <Bed className="w-4 h-4" />
                                    <span>{t("hero.beds")}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {hospital.beds}
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                                    <Users className="w-4 h-4" />
                                    <span>{t("hero.specialists")}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {hospital.specialists}
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div
                            className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : ""
                                }`}
                        >
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-4 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                            >
                                <span>{t("hero.getQuote")}</span>
                                <ArrowRight
                                    className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                                />
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 rounded-lg font-semibold transition-all duration-300"
                            >
                                {t("hero.bookConsultation")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-panacea-primary text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {hospital.stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`text-center ${isRTL ? "text-right" : "text-left"} md:text-center`}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-panacea-light mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"
                                }`}
                        >
                            {t("overview.title")}
                        </h2>
                        <p
                            className={`text-lg text-gray-700 leading-relaxed mb-8 ${isRTL ? "text-right" : "text-left"
                                }`}
                        >
                            {hospital.description}
                        </p>

                        {/* Accreditations */}
                        <div className="mt-8">
                            <h3
                                className={`text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse text-right" : ""
                                    }`}
                            >
                                <Award className="w-6 h-6 text-panacea-primary" />
                                <span>{t("overview.accreditations")}</span>
                            </h3>
                            <div
                                className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""
                                    }`}
                            >
                                {hospital.accreditations.map((accreditation, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 bg-panacea-light border-2 border-panacea-primary/20 rounded-full text-panacea-dark font-semibold flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-panacea-primary" />
                                        <span>{accreditation}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("specialties.title")}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t("specialties.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                        {hospital.specialties.map((specialty, index) => {
                            const IconComponent = specialty.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-panacea-light to-white border-2 border-panacea-primary/10 rounded-xl p-6 text-center hover:border-panacea-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-panacea-primary/10 rounded-full flex items-center justify-center group-hover:bg-panacea-primary/20 transition-colors">
                                        <IconComponent className="w-8 h-8 text-panacea-primary" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-sm">
                                        {specialty.name}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-16 bg-gradient-to-br from-panacea-light to-white">
                <div className="container mx-auto px-4">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("facilities.title")}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t("facilities.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {hospital.facilities.map((facility, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-panacea-primary/10 ${isRTL ? "flex-row-reverse text-right" : ""
                                    }`}
                            >
                                <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{facility}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("doctors.title")}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t("doctors.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {hospital.doctors.map((doctor, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                {/* Doctor Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    {/* Experience Badge */}
                                    <div className="absolute top-4 right-4 bg-panacea-accent text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>{doctor.experience}+ {t("doctors.experience")}</span>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-panacea-primary font-semibold mb-4">
                                        {doctor.specialty}
                                    </p>
                                    <button
                                        className={`w-full py-2 px-4 bg-panacea-primary hover:bg-panacea-dark text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""
                                            }`}
                                    >
                                        <span>{t("doctors.viewProfile")}</span>
                                        <ArrowRight
                                            className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Quote Section */}
            <section className="py-16 bg-gradient-to-br from-panacea-primary to-panacea-dark text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Contact Info */}
                            <div className={isRTL ? "text-right" : "text-left"}>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    {t("contact.title")}
                                </h2>
                                <p className="text-lg text-white/80 mb-8">
                                    {t("contact.subtitle")}
                                </p>

                                <div className="space-y-6">
                                    <div
                                        className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.location")}
                                            </div>
                                            <div className="text-white/80">{hospital.location}</div>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.phone")}
                                            </div>
                                            <div className="text-white/80">
                                                {hospital.contact.phone}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.email")}
                                            </div>
                                            <div className="text-white/80">
                                                {hospital.contact.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse text-right" : ""
                                            }`}
                                    >
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.hours")}
                                            </div>
                                            <div className="text-white/80">
                                                {hospital.contact.hours}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quote Form */}
                            <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                <QuoteForm
                                    embedded={true}
                                    selectedCountry={hospital.location}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Form Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-panacea-accent hover:bg-red-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Form Content */}
                        <div className="p-8 md:p-10">
                            <QuoteForm
                                embedded={true}
                                selectedCountry={hospital.location}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
