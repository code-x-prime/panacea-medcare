"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState } from "react";
import { FaStar, FaMapMarkerAlt, FaBed, FaUserMd, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import hospitalsData from "@/data/hospitals.json";

export default function HospitalDetailPage({ params }) {
    const { locale, slug } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("hospitals");

    // Find hospital by slug
    let hospital = null;
    for (const country of hospitalsData.countries) {
        for (const city of country.cities) {
            const found = city.hospitals.find(h => h.slug === slug);
            if (found) {
                hospital = found;
                break;
            }
        }
        if (hospital) break;
    }

    if (!hospital) {
        notFound();
    }

    const [activeFacilityTab, setActiveFacilityTab] = useState("comfortDuringStay");

    // Get hospital image - returns placeholder if image doesn't exist
    const getHospitalImage = (slug) => {
        // Try local path first, fallback to placeholder
        return `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop&auto=format`;
    };

    // Render star rating
    const renderStars = (score) => {
        const fullStars = Math.floor(score);
        const hasHalfStar = score % 1 >= 0.5;
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`w-4 h-4 ${i < fullStars
                            ? "text-yellow-400 fill-yellow-400"
                            : i === fullStars && hasHalfStar
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{score}</span>
            </div>
        );
    };

    const facilityTabs = [
        { id: "comfortDuringStay", label: t("facilitiesTab.comfortDuringStay") || "Comfort During Stay" },
        { id: "moneyMatters", label: t("facilitiesTab.moneyMatters") || "Money Matters" },
        { id: "food", label: t("facilitiesTab.food") || "Food" },
        { id: "treatmentRelated", label: t("facilitiesTab.treatmentRelated") || "Treatment Related" },
        { id: "language", label: t("facilitiesTab.language") || "Language" },
        { id: "transportation", label: t("facilitiesTab.transportation") || "Transportation" },
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="hospitals"
                title={hospital.name}
                subtitle={hospital.about?.short || ""}
                backgroundImage={getHospitalImage(hospital.slug)}
                fallbackImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Hospital Overview Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Rating */}
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="flex-shrink-0">
                                    {renderStars(hospital.rating?.score || 4.0)}
                                </div>
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm text-gray-600">
                                        {hospital.rating?.totalReviews || 0} {t("ratings") || "Ratings"}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("location") || "Location"}</p>
                                    <p className="text-sm text-gray-600">
                                        {hospital.address?.city}, {hospital.address?.country}
                                    </p>
                                </div>
                            </div>

                            {/* Beds */}
                            {hospital.beds && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaBed className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("beds") || "Number of beds"}</p>
                                        <p className="text-sm text-gray-600">{hospital.beds}</p>
                                    </div>
                                </div>
                            )}

                            {/* Specialty */}
                            {hospital.specialtyType && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaUserMd className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("specialty") || "Specialty"}</p>
                                        <p className="text-sm text-gray-600">{hospital.specialtyType}</p>
                                    </div>
                                </div>
                            )}

                            {/* Established */}
                            {hospital.establishedYear && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaCheckCircle className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("established") || "Established in"}</p>
                                        <p className="text-sm text-gray-600">{hospital.establishedYear}</p>
                                    </div>
                                </div>
                            )}

                            {/* Accreditations */}
                            {hospital.accreditations && hospital.accreditations.length > 0 && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="flex gap-2 flex-shrink-0">
                                        {hospital.accreditations.map((acc, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-panacea-primary/10 text-panacea-primary rounded-full text-xs font-semibold"
                                            >
                                                {acc}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("accreditations") || "Accreditations"}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap gap-4 mb-12 ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}>
                        <button
                            onClick={() => {
                                const chatbotButton = document.querySelector('[data-chatbot-toggle]');
                                if (chatbotButton) chatbotButton.click();
                            }}
                            className="px-8 py-4 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <span>{t("bookAppointment") || "Book Appointment"}</span>
                        </button>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span>{t("whatsappUs") || "Whatsapp Us"}</span>
                        </a>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* About Hospital */}
                            {hospital.about?.full && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("aboutHospital") || "About Hospital"}
                                    </h2>
                                    <div className="prose max-w-none">
                                        <p className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.about.full}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Departments */}
                            {hospital.departments && hospital.departments.length > 0 && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("departments") || "Departments"}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {hospital.departments.map((dept, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                            >
                                                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                                                    <span className="text-panacea-primary font-bold">
                                                        {dept.doctors} {t("doctors") || "Doctors"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Top Doctors */}
                            {hospital.topDoctors && hospital.topDoctors.length > 0 && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("topDoctors") || "Top Doctors"}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {hospital.topDoctors.map((doctor, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                                            >
                                                <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <div className="w-20 h-20 bg-panacea-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <FaUserMd className="w-10 h-10 text-panacea-primary" />
                                                    </div>
                                                    <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                                        <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                                                        <p className="text-panacea-primary font-semibold text-sm mt-1">
                                                            {doctor.specialization}
                                                        </p>
                                                        <p className="text-gray-600 text-sm mt-2">
                                                            {doctor.experience} {t("yearsExperience") || "years of experience"}
                                                        </p>
                                                        {doctor.rating && (
                                                            <div className="mt-2">
                                                                {renderStars(doctor.rating)}
                                                                <span className="text-xs text-gray-500 ml-2">
                                                                    ({doctor.totalRatings || 0} {t("ratings") || "ratings"})
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* International Patient Services */}
                            {hospital.internationalPatientServices && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("internationalPatientServices") || "International Patient Services"}
                                    </h2>
                                    <div className="bg-panacea-light/30 rounded-xl p-6">
                                        <p className={`text-gray-700 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.name} {t("internationalServicesDesc") || "is a preferred destination for international patients, offering comprehensive and personalised care:"}
                                        </p>
                                        <ul className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.internationalPatientServices.preArrivalConsultation && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.preArrivalConsultation") || "Pre-arrival Consultation and Case Review: Medical opinions and treatment cost estimates from senior consultants."}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.internationalPatientServices.visaAssistance && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.visaAssistance") || "Visa & Travel Assistance: Medical visa invitation letters and support for travel arrangements."}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.internationalPatientServices.airportPickup && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.airportPickup") || "Airport Pick-up/Drop-off: Complimentary transportation is arranged from and to the airport."}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.internationalPatientServices.multilingualInterpreters && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.multilingualInterpreters") || "Multilingual Interpreters: Professional interpreters are available for communication."}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.internationalPatientServices.dedicatedCoordinators && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.dedicatedCoordinators") || "Express Check-in, Dedicated Lounge & Personal Coordinators: Fast-tracked services and continuous support."}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.internationalPatientServices.accommodationAssistance && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        {t("services.accommodationAssistance") || "Assistance with Accommodation and Food Arrangements: Help with hotels/guesthouses and customised meal plans."}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Infrastructure */}
                            {hospital.infrastructure && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("infrastructure") || "Infrastructure"}
                                    </h2>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <p className={`text-gray-700 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.name} {t("infrastructureDesc") || "is equipped with state-of-the-art infrastructure and technology, delivering world-class healthcare."}
                                        </p>
                                        <ul className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.infrastructure.totalArea && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        <strong>{t("totalArea") || "Total Area:"}</strong> {hospital.infrastructure.totalArea}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.infrastructure.beds && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        <strong>{t("beds") || "Beds:"}</strong> {hospital.infrastructure.beds} {t("operationalBeds") || "operational beds"}
                                                        {hospital.infrastructure.icuBeds && `, ${hospital.infrastructure.icuBeds} ${t("icuBeds") || "ICU beds"}`}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.infrastructure.operationTheatres && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        <strong>{t("operationTheatres") || "Operation Theatres:"}</strong> {hospital.infrastructure.operationTheatres} {t("modularOTs") || "modular operating theatres"}
                                                    </span>
                                                </li>
                                            )}
                                            {hospital.infrastructure.technologies && hospital.infrastructure.technologies.length > 0 && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">
                                                        <strong>{t("technologies") || "Technologies:"}</strong> {hospital.infrastructure.technologies.join(", ")}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Facilities */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("facilities") || "Facilities"}
                                    </h2>
                                </div>

                                {/* Facility Tabs */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex flex-col gap-2">
                                        {facilityTabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveFacilityTab(tab.id)}
                                                className={`px-4 py-3 rounded-lg text-left transition-all ${activeFacilityTab === tab.id
                                                    ? "bg-panacea-primary text-white font-semibold"
                                                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                    } ${isRTL ? "text-right" : "text-left"}`}
                                            >
                                                {tab.label} →
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Facility Content */}
                                <div className="p-6">
                                    {hospital.facilities && hospital.facilities[activeFacilityTab] && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {hospital.facilities[activeFacilityTab].map((facility, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm text-gray-700">{facility}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

