"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaBed, FaUserMd, FaCheckCircle, FaWhatsapp, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hospitalsData from "@/data/hospitals.json";
import QuoteForm from "@/components/QuoteForm";

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
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Get hospital images - returns placeholder if images don't exist
    const getHospitalImages = (hospital) => {
        if (hospital.images && hospital.images.length > 0) {
            return hospital.images;
        }
        // Default placeholder images
        return [
            `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop&auto=format`,
            `https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&h=600&fit=crop&auto=format`
        ];
    };

    const hospitalImages = getHospitalImages(hospital);

    // Hospital videos - only use if they exist in hospital data
    const hospitalVideos = hospital.videos || [];

    // Gallery: Only images (videos will be added only if they exist)
    const galleryItems = [
        ...hospitalImages.map((img, idx) => ({ type: 'image', src: img, id: `img-${idx}` })),
        ...(hospitalVideos.length > 0 ? hospitalVideos.map((video) => ({ type: 'video', ...video })) : [])
    ];

    const totalGallerySlides = Math.ceil(galleryItems.length / 2);

    const nextGallery = () => {
        setGalleryIndex((prev) => (prev + 1) % totalGallerySlides);
    };

    const prevGallery = () => {
        setGalleryIndex((prev) => (prev - 1 + totalGallerySlides) % totalGallerySlides);
    };

    const [selectedVideo, setSelectedVideo] = useState(null);

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

    // Get localized content
    const hospitalName = locale === "ar" ? (hospital.nameAr || hospital.name) : locale === "fr" ? (hospital.nameFr || hospital.name) : hospital.name;
    const hospitalShortDesc = locale === "ar" ? (hospital.about?.shortAr || hospital.about?.short || "") : locale === "fr" ? (hospital.about?.shortFr || hospital.about?.short || "") : (hospital.about?.short || "");
    const hospitalFullDesc = locale === "ar" ? (hospital.about?.fullAr || hospital.about?.full || "") : locale === "fr" ? (hospital.about?.fullFr || hospital.about?.full || "") : (hospital.about?.full || "");

    // WhatsApp message with hospital name and link
    const whatsappMessage = encodeURIComponent(
        `Hello, please contact me regarding ${hospitalName} - https://panaceamedcare.com/${locale}/hospitals/${slug}?source=wpchat_HDSB, Thank you!`
    );
    const whatsappUrl = `https://wa.me/919958800961?text=${whatsappMessage}`;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            {/* Single Image Header */}
            <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
                {hospitalImages.length > 0 && (
                    <Image
                        src={hospitalImages[0]}
                        alt={hospitalName}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-panacea-primary/80 via-panacea-primary/60 to-panacea-primary/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-center text-white px-4 ${isRTL ? "text-right" : "text-left"}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{hospitalName}</h1>
                        {hospitalShortDesc && (
                            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{hospitalShortDesc}</p>
                        )}
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4  sm:px-6 lg:px-8 py-12 md:py-16">
                <div className=" mx-auto">
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
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span>{t("whatsappUs") || "Whatsapp Us"}</span>
                        </a>
                    </div>

                    {/* Gallery Carousel - Below Banner */}
                    {galleryItems.length > 0 && (
                        <div className="mb-12 max-w-7xl">
                            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("gallery") || "Gallery"}
                            </h2>
                            <div className="relative">
                                {/* Carousel Container */}
                                <div className="overflow-hidden rounded-lg">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
                                    >
                                        {Array.from({ length: totalGallerySlides }).map((_, slideIdx) => (
                                            <div key={slideIdx} className="min-w-full grid grid-cols-2 gap-4">
                                                {galleryItems.slice(slideIdx * 2, slideIdx * 2 + 2).map((item, itemIdx) => (
                                                    <div key={item.id || itemIdx} className="w-full">
                                                        {item.type === 'image' ? (
                                                            <div className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                                                <Image
                                                                    src={item.src}
                                                                    alt={`${hospitalName} - Image`}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    loading="lazy"
                                                                    unoptimized
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="relative group cursor-pointer rounded-lg overflow-hidden"
                                                                style={{ aspectRatio: '16/9' }}
                                                                onClick={() => setSelectedVideo(item)}
                                                            >
                                                                <Image
                                                                    src={item.thumbnail}
                                                                    alt={item.title}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    loading="lazy"
                                                                    unoptimized
                                                                />
                                                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                        <FaPlay className="w-5 h-5 text-panacea-primary ml-1" />
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                                                    <h3 className="text-white text-sm font-medium">{item.title}</h3>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Arrows */}
                                {totalGallerySlides > 1 && (
                                    <>
                                        <button
                                            onClick={prevGallery}
                                            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 shadow-md transition-all z-10"
                                            aria-label="Previous"
                                        >
                                            <FaChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={nextGallery}
                                            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 shadow-md transition-all z-10"
                                            aria-label="Next"
                                        >
                                            <FaChevronRight className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Dots Indicator */}
                            {totalGallerySlides > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {Array.from({ length: totalGallerySlides }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setGalleryIndex(index)}
                                            className={`h-2 rounded-full transition-all ${index === galleryIndex
                                                ? "bg-panacea-primary w-6"
                                                : "bg-gray-300 hover:bg-gray-400 w-2"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* About Hospital */}
                            {hospitalFullDesc && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("aboutHospital") || "About Hospital"}
                                    </h2>
                                    <div className="prose max-w-none">
                                        <p className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospitalFullDesc}
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
                                        {hospital.internationalPatientServices.description ? (
                                            <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${isRTL ? "text-right" : "text-left"}`}>
                                                {locale === "ar" ? (hospital.internationalPatientServices.descriptionAr || hospital.internationalPatientServices.description) : locale === "fr" ? (hospital.internationalPatientServices.descriptionFr || hospital.internationalPatientServices.description) : hospital.internationalPatientServices.description}
                                            </div>
                                        ) : (
                                            <>
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
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Team and Specialties */}
                            {hospital.teamAndSpecialties && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("teamAndSpecialties") || "Team and Specialties"}
                                    </h2>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <p className={`text-gray-700 leading-relaxed mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                            {locale === "ar" ? (hospital.teamAndSpecialties.descriptionAr || hospital.teamAndSpecialties.description) : locale === "fr" ? (hospital.teamAndSpecialties.descriptionFr || hospital.teamAndSpecialties.description) : hospital.teamAndSpecialties.description}
                                        </p>
                                        {hospital.teamAndSpecialties.centersOfExcellence && hospital.teamAndSpecialties.centersOfExcellence.length > 0 && (
                                            <div>
                                                <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                                    {t("centersOfExcellence") || "Centres of Excellence"}
                                                </h3>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {hospital.teamAndSpecialties.centersOfExcellence.map((center, idx) => (
                                                        <div key={idx} className="bg-panacea-light/30 rounded-lg p-4">
                                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                                {locale === "ar" ? (center.nameAr || center.name) : locale === "fr" ? (center.nameFr || center.name) : center.name}
                                                            </h4>
                                                            <p className={`text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                                                                {locale === "ar" ? (center.descriptionAr || center.description) : locale === "fr" ? (center.descriptionFr || center.description) : center.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Awards */}
                            {hospital.awards && hospital.awards.length > 0 && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("awards") || "Awards"}
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {hospital.awards.map((award, idx) => (
                                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                                                <FaCheckCircle className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                                <p className="text-gray-700">
                                                    {locale === "ar" ? (award.nameAr || award.name) : locale === "fr" ? (award.nameFr || award.name) : award.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Milestones */}
                            {hospital.milestones && hospital.milestones.length > 0 && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("milestones") || "Milestones"}
                                    </h2>
                                    <div className="space-y-4">
                                        {hospital.milestones.map((milestone, idx) => (
                                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {locale === "ar" ? (milestone.nameAr || milestone.name) : locale === "fr" ? (milestone.nameFr || milestone.name) : milestone.name}
                                                </h3>
                                                {milestone.description && (
                                                    <p className={`text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                                                        {locale === "ar" ? (milestone.descriptionAr || milestone.description) : locale === "fr" ? (milestone.descriptionFr || milestone.description) : milestone.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
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

                            {/* Location Details */}
                            {hospital.location && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("location") || "Location"}
                                    </h2>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        {hospital.address && (
                                            <div className={`mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                                <h3 className="font-semibold text-gray-900 mb-2">{t("address") || "Address"}</h3>
                                                <p className="text-gray-700">
                                                    {hospital.address.line1 && <>{hospital.address.line1}<br /></>}
                                                    {hospital.address.city && <>{hospital.address.city}, {hospital.address.state && `${hospital.address.state}, `}{hospital.address.pincode && `${hospital.address.pincode}`}<br /></>}
                                                    {hospital.address.country}
                                                </p>
                                            </div>
                                        )}
                                        {hospital.location.coordinates && (
                                            <div className="mb-6">
                                                <a
                                                    href={`https://www.google.com/maps?q=${hospital.location.coordinates.lat},${hospital.location.coordinates.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-panacea-primary hover:text-panacea-primary/80 font-semibold"
                                                >
                                                    <FaMapMarkerAlt className="w-5 h-5" />
                                                    <span>{t("viewOnMap") || "View on Google Maps"}</span>
                                                </a>
                                            </div>
                                        )}
                                        <div className="space-y-3">
                                            {hospital.location.airportKm && (
                                                <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                                    <div className={isRTL ? "text-right" : "text-left"}>
                                                        <p className="font-semibold text-gray-900">
                                                            {hospital.location.airportName || t("airport") || "Airport"}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {hospital.location.airportKm} km
                                                            {hospital.location.airportDuration && ` • ${hospital.location.airportDuration}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {hospital.location.metroKm && (
                                                <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                                    <div className={isRTL ? "text-right" : "text-left"}>
                                                        <p className="font-semibold text-gray-900">
                                                            {hospital.location.metroName || t("metro") || "Metro Station"}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {hospital.location.metroKm} km
                                                            {hospital.location.metroDuration && ` • ${hospital.location.metroDuration}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {hospital.location.railwayKm && (
                                                <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                                    <div className={isRTL ? "text-right" : "text-left"}>
                                                        <p className="font-semibold text-gray-900">
                                                            {hospital.location.railwayName || t("railway") || "Railway Station"}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {hospital.location.railwayKm} km
                                                            {hospital.location.railwayDuration && ` • ${hospital.location.railwayDuration}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - QuoteForm and Facilities */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Quote Form */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                                <QuoteForm embedded={true} />
                            </div>

                            {/* Facilities */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
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

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                        >
                            ×
                        </button>
                        <iframe
                            src={selectedVideo.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </main>
    );
}

