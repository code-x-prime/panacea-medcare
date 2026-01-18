"use client";

import TopBanner from "@/components/TopBanner";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import doctors from "@/data/doctors.json";
import { FaUserMd, FaCheckCircle } from "react-icons/fa";

export default function DoctorDetailPage({ params }) {
    const { locale, id } = params;
    const isRTL = locale === "ar";

    const doctor = doctors.find(d => d.id === id);

    if (!doctor) {
        notFound();
    }

    // All data is in English as per user requirement
    const name = doctor.name || "";
    const specialty = doctor.specialty || "";
    const qualification = doctor.qualification || "";
    const experience = doctor.experience || "";
    const bio = doctor.bio || "";
    const hospital = doctor.hospital || "";
    const hospitalSlug = doctor.hospitalSlug || "";
    const designation = doctor.designation || "";
    const hospitalDesignation = doctor.hospitalDesignation || "";
    const experienceSummary = doctor.experienceSummary || "";
    const briefProfile = doctor.briefProfile || "";
    const expertise = doctor.expertise || [];
    const specialityInterest = doctor.specialityInterest || [];
    const achievements = doctor.achievements || [];
    const membership = doctor.membership || [];
    const opdTiming = doctor.opdTiming || "";
    const roomNo = doctor.roomNo || "";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={name}
                subtitle={specialty}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Sidebar - Doctor Image and Basic Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
                                <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-gray-100">
                                    {doctor.image ? (
                                        <Image
                                            src={doctor.image}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-panacea-primary/20 to-panacea-primary/5 flex items-center justify-center">
                                            <FaUserMd className="w-24 h-24 text-panacea-primary/50" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
                                    {designation && (
                                        <p className="text-lg text-panacea-primary font-semibold mb-2">{designation}</p>
                                    )}
                                    {specialty && (
                                        <p className="text-panacea-accent font-medium mb-4">{specialty}</p>
                                    )}
                                    
                                    {hospital && (
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <p className="text-sm text-gray-600 mb-1">Hospital</p>
                                            {hospitalSlug ? (
                                                <Link 
                                                    href={`/${locale}/hospitals/${hospitalSlug}`}
                                                    className="text-panacea-primary hover:underline font-semibold"
                                                >
                                                    {hospital} →
                                                </Link>
                                            ) : (
                                                <p className="text-gray-900 font-semibold">{hospital}</p>
                                            )}
                                        </div>
                                    )}

                                    {hospitalDesignation && (
                                        <div className="mb-4 pb-4 border-b border-gray-200">
                                            <p className="text-sm text-gray-600 mb-1">Hospital Designation</p>
                                            <p className="text-gray-900">{hospitalDesignation}</p>
                                        </div>
                                    )}

                                    {(opdTiming || roomNo) && (
                                        <div className="space-y-2">
                                            {opdTiming && (
                                                <div>
                                                    <p className="text-sm text-gray-600">OPD Timing</p>
                                                    <p className="text-gray-900 font-semibold">{opdTiming}</p>
                                                </div>
                                            )}
                                            {roomNo && (
                                                <div>
                                                    <p className="text-sm text-gray-600">Room No.</p>
                                                    <p className="text-gray-900 font-semibold">{roomNo}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Name and Basic Info */}
                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                                    {designation && (
                                        <p className="text-xl text-panacea-primary font-semibold mb-2">{designation}</p>
                                    )}
                                    {specialty && (
                                        <p className="text-lg text-panacea-accent mb-4">{specialty}</p>
                                    )}
                                    {qualification && (
                                        <p className="text-gray-700 mb-2"><strong>Qualification:</strong> {qualification}</p>
                                    )}
                                    {experience && (
                                        <p className="text-gray-700 mb-4"><strong>Experience:</strong> {experience}</p>
                                    )}
                                </div>
                            </div>

                            {/* About Doctor / Brief Profile */}
                            {(bio || briefProfile) && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        About Doctor
                                    </h3>
                                    <div className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                        {briefProfile ? (
                                            <p>{briefProfile}</p>
                                        ) : (
                                            <p>{bio}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Experience Summary */}
                            {experienceSummary && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        Experience Summary
                                    </h3>
                                    <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${isRTL ? "text-right" : "text-left"}`}>
                                        <p>{experienceSummary}</p>
                                    </div>
                                </div>
                            )}

                            {/* Expertise */}
                            {expertise && expertise.length > 0 && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        Expertise
                                    </h3>
                                    <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {expertise.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Speciality Interest */}
                            {specialityInterest && specialityInterest.length > 0 && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        Speciality Interest
                                    </h3>
                                    <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {specialityInterest.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Achievements */}
                            {achievements && achievements.length > 0 && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        Achievements
                                    </h3>
                                    <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {achievements.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <FaCheckCircle className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Membership */}
                            {membership && membership.length > 0 && (
                                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                    <h3 className={`text-2xl font-bold text-panacea-primary mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        Membership
                                    </h3>
                                    <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                                        {membership.map((item, index) => (
                                            <span key={index} className="bg-panacea-light text-panacea-primary px-4 py-2 rounded-full text-sm">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
