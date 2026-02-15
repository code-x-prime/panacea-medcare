"use client";

import { useState } from "react";
import { FaBed, FaUserMd, FaCheckCircle, FaUtensils, FaCar, FaLanguage, FaCreditCard, FaBuilding } from "react-icons/fa";

export default function FacilitiesInfrastructureTabs({ hospital, locale, t, isRTL }) {
    const [activeTab, setActiveTab] = useState("facilities");

    // Check if we have any facilities
    const hasFacilities = hospital.facilities && Object.keys(hospital.facilities).some(key =>
        hospital.facilities[key] && hospital.facilities[key].length > 0
    );

    // Check if we have infrastructure
    const hasInfrastructure = hospital.infrastructure && (
        hospital.infrastructure.technologies?.length > 0 ||
        hospital.infrastructure.beds ||
        hospital.infrastructure.icuBeds ||
        hospital.infrastructure.operationTheatres
    );

    // Don't render if neither facilities nor infrastructure exist
    if (!hasFacilities && !hasInfrastructure) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Tab Headers */}
            <div className={`flex border-b border-gray-200 ${isRTL ? "flex-row-reverse" : ""}`}>
                {hasFacilities && (
                    <button
                        onClick={() => setActiveTab("facilities")}
                        className={`flex-1 px-6 py-4 font-semibold text-lg transition-all ${activeTab === "facilities"
                            ? "bg-panacea-primary text-white border-b-4 border-panacea-primary"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {t("facilitiesInfra.facilitiesTab")}
                    </button>
                )}
                {hasInfrastructure && (
                    <button
                        onClick={() => setActiveTab("infrastructure")}
                        className={`flex-1 px-6 py-4 font-semibold text-lg transition-all ${activeTab === "infrastructure"
                            ? "bg-panacea-primary text-white border-b-4 border-panacea-primary"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {t("facilitiesInfra.infrastructureTab")}
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Facilities Tab */}
                {activeTab === "facilities" && hasFacilities && (
                    <div className="space-y-6">
                        {/* Comfort During Stay */}
                        {hospital.facilities.comfortDuringStay && hospital.facilities.comfortDuringStay.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaBed className="w-5 h-5" />
                                    {t("facilitiesInfra.comfortDuringStay")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.comfortDuringStay.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Treatment Related */}
                        {hospital.facilities.treatmentRelated && hospital.facilities.treatmentRelated.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaUserMd className="w-5 h-5" />
                                    {t("facilitiesInfra.treatmentRelated")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.treatmentRelated.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Food & Dining */}
                        {hospital.facilities.food && hospital.facilities.food.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaUtensils className="w-5 h-5" />
                                    {t("facilitiesInfra.foodDining")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.food.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Transportation */}
                        {hospital.facilities.transportation && hospital.facilities.transportation.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaCar className="w-5 h-5" />
                                    {t("facilitiesInfra.transportation")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.transportation.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Languages Spoken */}
                        {hospital.facilities.language && hospital.facilities.language.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaLanguage className="w-5 h-5" />
                                    {t("facilitiesInfra.languagesSpoken")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.language.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Payment Options */}
                        {hospital.facilities.moneyMatters && hospital.facilities.moneyMatters.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaCreditCard className="w-5 h-5" />
                                    {t("facilitiesInfra.paymentOptions")}
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {hospital.facilities.moneyMatters.map((facility, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Infrastructure Tab */}
                {activeTab === "infrastructure" && hasInfrastructure && (
                    <div className="space-y-6">
                        {/* Infrastructure Stats */}
                        {(hospital.infrastructure.beds || hospital.infrastructure.icuBeds || hospital.infrastructure.operationTheatres) && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaBuilding className="w-5 h-5" />
                                    {t("facilitiesInfra.hospitalCapacity")}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {hospital.infrastructure.beds && (
                                        <div className="bg-gradient-to-br from-panacea-primary/5 to-white p-4 rounded-xl border border-panacea-primary/20">
                                            <div className="text-2xl font-extrabold text-panacea-primary mb-1">
                                                {hospital.infrastructure.beds}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">
                                                {t("stats.totalBeds")}
                                            </div>
                                        </div>
                                    )}
                                    {hospital.infrastructure.icuBeds && (
                                        <div className="bg-gradient-to-br from-panacea-primary/5 to-white p-4 rounded-xl border border-panacea-primary/20">
                                            <div className="text-2xl font-extrabold text-panacea-primary mb-1">
                                                {hospital.infrastructure.icuBeds}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">
                                                {t("stats.icuBeds")}
                                            </div>
                                        </div>
                                    )}
                                    {hospital.infrastructure.operationTheatres && (
                                        <div className="bg-gradient-to-br from-panacea-primary/5 to-white p-4 rounded-xl border border-panacea-primary/20">
                                            <div className="text-2xl font-extrabold text-panacea-primary mb-1">
                                                {hospital.infrastructure.operationTheatres}
                                            </div>
                                            <div className="text-sm text-gray-600 font-medium">
                                                {t("stats.operationTheatres")}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Technologies */}
                        {hospital.infrastructure.technologies && hospital.infrastructure.technologies.length > 0 && (
                            <div>
                                <h3 className={`text-xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    {t("technologies.title")}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {hospital.infrastructure.technologies.map((tech, idx) => (
                                        <div key={idx} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <FaCheckCircle className="w-4 h-4 text-panacea-primary flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 text-sm font-medium">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
