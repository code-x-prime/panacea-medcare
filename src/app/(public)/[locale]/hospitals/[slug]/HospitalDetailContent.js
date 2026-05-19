"use client";
import { localePath, siteUrl } from "@/lib/locale/routing";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import PublicImage from "@/components/PublicImage";
import { resolvePublicImageSrc } from "@/lib/publicImage";
import { FaStar, FaMapMarkerAlt, FaBed, FaUserMd, FaCheckCircle, FaWhatsapp, FaPlay, FaChevronLeft, FaChevronRight, FaCalendarCheck, FaPlane } from "react-icons/fa";
import { getHospitalBySlug } from "@/data/hospitalsData";
import doctorsData from "@/data/doctors.json";
import BookingModal from "@/components/BookingModal";
import QuoteForm from "@/components/QuoteForm";
import FacilitiesInfrastructureTabs from "@/components/FacilitiesInfrastructureTabs";
import Link from "next/link";

// Contact config embedded directly or should be imported if available. 
// The original file imported from "@/config/contact". I'll assume it exists or fallback.
const CONTACT_CONFIG = {
    whatsappNumber: "919958800961"
};

export default function HospitalDetailContent({ params }) {
    const { locale, slug } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("hospitalDetail");

    // Find hospital using helper
    const hospital = getHospitalBySlug(slug);

    if (!hospital) {
        notFound();
    }

    const [galleryIndex, setGalleryIndex] = useState(0);
    const [doctorCarouselIndex, setDoctorCarouselIndex] = useState(0);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [doctorsPerSlide, setDoctorsPerSlide] = useState(3);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [activeTab, setActiveTab] = useState("facilities"); // Tab state for Facilities/Infrastructure

    // Handle responsive doctors per slide
    useEffect(() => {
        const updateDoctorsPerSlide = () => {
            if (window.innerWidth < 768) {
                setDoctorsPerSlide(1);
            } else if (window.innerWidth < 1024) {
                setDoctorsPerSlide(2);
            } else {
                setDoctorsPerSlide(3);
            }
            // Reset carousel index when screen size changes
            setDoctorCarouselIndex(0);
        };

        updateDoctorsPerSlide();
        window.addEventListener('resize', updateDoctorsPerSlide);
        return () => window.removeEventListener('resize', updateDoctorsPerSlide);
    }, []);

    const openBookingModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    const handleWhatsApp = (doctor) => {
        const message = encodeURIComponent(
            `Hi! I would like to book an appointment with ${doctor.name}.\n\n` +
            `Doctor: ${doctor.name}\n` +
            `Specialty: ${doctor.specialty || ""}\n` +
            `Hospital: ${hospital.name}\n\n` +
            `Please contact me for scheduling.`
        );
        window.open(`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${message}`, "_blank");
    };

    // Get hospital images - returns placeholder if images don't exist
    const getHospitalImages = (hosp) => {
        if (hosp.images && hosp.images.length > 0) {
            return hosp.images.map((img) => resolvePublicImageSrc(img));
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

    // Get localized content
    const hospitalName = locale === "ar" ? (hospital.nameAr || hospital.name) : locale === "fr" ? (hospital.nameFr || hospital.name) : hospital.name;
    const hospitalShortDesc = locale === "ar" ? (hospital.about?.shortAr || hospital.about?.short || "") : locale === "fr" ? (hospital.about?.shortFr || hospital.about?.short || "") : (hospital.about?.short || "");
    const hospitalFullDesc = locale === "ar" ? (hospital.about?.fullAr || hospital.about?.full || "") : locale === "fr" ? (hospital.about?.fullFr || hospital.about?.full || "") : (hospital.about?.full || "");

    // WhatsApp message with hospital name and link
    const whatsappMessageLink = encodeURIComponent(
        `Hello, please contact me regarding ${hospitalName} - ${siteUrl(locale, `/hospitals/${slug}?source=wpchat_HDSB, Thank you!`)}`
    );
    const whatsappUrl = `https://wa.me/919958800961?text=${whatsappMessageLink}`;

    // Get doctors for this hospital
    // Ensure doctorsData exists and filter logic matches
    const hospitalDoctors = doctorsData ? doctorsData.filter(doctor => doctor.hospitalSlug === slug) : [];

    return (
        <main dir={isRTL ? "rtl" : "ltr"} className="w-full overflow-x-hidden">
            {/* Single Image Header */}
            <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
                {hospitalImages.length > 0 && (
                    <PublicImage
                        src={hospitalImages[0]}
                        alt={hospitalName}
                        fill
                        className="object-cover"
                        priority
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

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 overflow-x-hidden">
                <div className="mx-auto max-w-full">
                    {/* Hospital Overview Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-8 border border-gray-100">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Rating */}
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="flex-shrink-0">
                                    {renderStars(hospital.rating?.score || 4.0)}
                                </div>
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm text-gray-600">
                                        {hospital.rating?.totalReviews || 0} {t("hero.ratings") || "Ratings"}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("hero.location") || "Location"}</p>
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
                                        <p className="text-sm font-semibold text-gray-900">{t("hero.beds") || "Number of beds"}</p>
                                        <p className="text-sm text-gray-600">{hospital.beds}</p>
                                    </div>
                                </div>
                            )}

                            {/* Specialty */}
                            {hospital.specialtyType && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaUserMd className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("hero.specialty") || "Specialty"}</p>
                                        <p className="text-sm text-gray-600">{hospital.specialtyType}</p>
                                    </div>
                                </div>
                            )}

                            {/* Established */}
                            {hospital.establishedYear && (
                                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <FaCheckCircle className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                    <div className={isRTL ? "text-right" : "text-left"}>
                                        <p className="text-sm font-semibold text-gray-900">{t("hero.established") || "Established in"}</p>
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
                                        <p className="text-sm font-semibold text-gray-900">{t("hero.accreditations") || "Accreditations"}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-wrap gap-4 mb-8 ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}>
                        <button
                            onClick={() => {
                                const chatbotButton = document.querySelector('[data-chatbot-toggle]');
                                if (chatbotButton) chatbotButton.click();
                            }}
                            className="px-8 py-4 bg-panacea-accent hover:bg-panacea-accent/90 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <span>{t("hero.bookAppointment") || "Book Appointment"}</span>
                        </button>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span>{t("hero.whatsappUs") || "Whatsapp Us"}</span>
                        </a>
                    </div>

                    {/* Gallery Carousel - Below Banner */}
                    {galleryItems.length > 0 && (
                        <div className="mb-8 max-w-7xl">
                            <h2 className={`text-2xl font-bold text-gray-900 mb-3 ${isRTL ? "text-right" : "text-left"}`}>
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
                                                                <PublicImage
                                                                    src={item.src}
                                                                    alt={`${hospitalName} - Image`}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="relative group cursor-pointer rounded-lg overflow-hidden"
                                                                style={{ aspectRatio: '16/9' }}
                                                                onClick={() => setSelectedVideo(item)}
                                                            >
                                                                <PublicImage
                                                                    src={item.thumbnail}
                                                                    alt={item.title}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                    loading="lazy"
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

                    <div className="grid lg:grid-cols-3 gap-6 md:gap-8 w-full overflow-hidden">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8 md:space-y-12 w-full overflow-hidden">
                            {/* About Hospital */}
                            {hospitalFullDesc && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
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
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
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
                                                        {dept.doctors} {t("doctors.title") || "Doctors"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Doctors Section */}
                            {hospitalDoctors && hospitalDoctors.length > 0 && (
                                <div className="w-full">
                                    <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("doctors.title") || "Doctors"}
                                    </h2>

                                    {/* Carousel Container - padding for nav buttons so they are not clipped */}
                                    <div className="relative w-full max-w-full pl-10 pr-10 md:pl-12 md:pr-12">
                                        <div className="overflow-hidden rounded-lg">
                                            <div
                                                className="flex transition-transform duration-500 ease-in-out"
                                                style={{ transform: `translateX(-${doctorCarouselIndex * 100}%)` }}
                                            >
                                                {Array.from({ length: Math.ceil(hospitalDoctors.length / doctorsPerSlide) }).map((_, slideIdx) => (
                                                    <div key={slideIdx} className="min-w-full flex-shrink-0 w-full px-1 sm:px-2">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                                                            {hospitalDoctors.slice(slideIdx * doctorsPerSlide, slideIdx * doctorsPerSlide + doctorsPerSlide).map((doctor) => (
                                                                <article
                                                                    key={doctor.id}
                                                                    className="group bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col w-full max-w-full min-w-0"
                                                                >
                                                                    <Link
                                                                        href={localePath(locale, `/doctors/${doctor.id}`)}
                                                                        className="flex-1 flex flex-col min-w-0"
                                                                    >
                                                                        <span className="relative w-full aspect-square mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gray-100 block flex-shrink-0">
                                                                            {doctor.image ? (
                                                                                <PublicImage
                                                                                    src={doctor.image}
                                                                                    alt={doctor.name}
                                                                                    fill
                                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                                    loading="lazy"
                                                                                />
                                                                            ) : (
                                                                                <span className="w-full h-full bg-gradient-to-br from-panacea-primary/20 to-panacea-primary/5 flex items-center justify-center absolute inset-0">
                                                                                    <FaUserMd className="w-12 h-12 md:w-16 md:h-16 text-panacea-primary/50" />
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                        <span className={`flex-1 block min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
                                                                            <span className="font-bold text-sm sm:text-base md:text-lg text-gray-900 group-hover:text-panacea-primary transition-colors block break-words line-clamp-2">
                                                                                {doctor.name}
                                                                            </span>
                                                                            <span className="text-panacea-primary font-semibold text-xs sm:text-sm mt-1 block break-words line-clamp-2">
                                                                                {doctor.specialty}
                                                                            </span>
                                                                        </span>
                                                                    </Link>
                                                                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex gap-2 flex-shrink-0 flex-col">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                handleWhatsApp(doctor);
                                                                            }}
                                                                            className="flex-1 min-w-0 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                                                                        >
                                                                            <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                                                            <span className="hidden sm:inline truncate">WhatsApp</span>
                                                                            <span className="sm:hidden">WA</span>
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                openBookingModal(doctor);
                                                                            }}
                                                                            className="flex-1 min-w-0 bg-panacea-primary hover:bg-panacea-primary/90 text-white font-semibold py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                                                                        >
                                                                            <FaCalendarCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                                                            <span className="hidden sm:inline truncate">Book Now</span>
                                                                            <span className="sm:hidden">Book</span>
                                                                        </button>
                                                                    </div>
                                                                </article>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Navigation Arrows */}
                                        {Math.ceil(hospitalDoctors.length / doctorsPerSlide) > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setDoctorCarouselIndex((prev) => Math.max(0, prev - 1))}
                                                    disabled={doctorCarouselIndex === 0}
                                                    className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 sm:p-2.5 shadow-md border border-gray-200 transition-all z-10 ${doctorCarouselIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    aria-label="Previous"
                                                >
                                                    <FaChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDoctorCarouselIndex((prev) => Math.min(Math.ceil(hospitalDoctors.length / doctorsPerSlide) - 1, prev + 1))}
                                                    disabled={doctorCarouselIndex === Math.ceil(hospitalDoctors.length / doctorsPerSlide) - 1}
                                                    className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 rounded-full p-2 sm:p-2.5 shadow-md border border-gray-200 transition-all z-10 ${doctorCarouselIndex === Math.ceil(hospitalDoctors.length / doctorsPerSlide) - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    aria-label="Next"
                                                >
                                                    <FaChevronRight className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}

                                        {/* Dots Indicator */}
                                        {Math.ceil(hospitalDoctors.length / doctorsPerSlide) > 1 && (
                                            <div className="flex justify-center gap-2 mt-6">
                                                {Array.from({ length: Math.ceil(hospitalDoctors.length / doctorsPerSlide) }).map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setDoctorCarouselIndex(index)}
                                                        className={`h-2 rounded-full transition-all ${index === doctorCarouselIndex
                                                            ? "bg-panacea-primary w-6"
                                                            : "bg-gray-300 hover:bg-gray-400 w-2"
                                                            }`}
                                                        aria-label={`Go to slide ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Hospital Stats - Using infrastructure data */}
                            {hospital.infrastructure && (
                                <div className="bg-gradient-to-br from-panacea-primary/5 to-panacea-accent/5 rounded-2xl p-8 border border-panacea-primary/10">
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("stats.title")}
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {hospital.infrastructure.beds && (
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-extrabold text-panacea-primary mb-2">
                                                    {hospital.infrastructure.beds}
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {t("stats.totalBeds")}
                                                </div>
                                            </div>
                                        )}
                                        {hospital.infrastructure.icuBeds && (
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-extrabold text-panacea-primary mb-2">
                                                    {hospital.infrastructure.icuBeds}
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {t("stats.icuBeds")}
                                                </div>
                                            </div>
                                        )}
                                        {hospital.infrastructure.operationTheatres && (
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-extrabold text-panacea-primary mb-2">
                                                    {hospital.infrastructure.operationTheatres}
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {t("stats.operationTheatres")}
                                                </div>
                                            </div>
                                        )}
                                        {hospital.rating?.totalReviews && (
                                            <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-extrabold text-panacea-primary mb-2">
                                                    {hospital.rating.totalReviews}+
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    {t("stats.patientReviews")}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}




                            {/* Facilities & Infrastructure Tabs */}
                            <FacilitiesInfrastructureTabs
                                hospital={hospital}
                                locale={locale}
                                t={t}
                                isRTL={isRTL}
                            />


                            {/* Full Description */}
                            {hospital.about?.full && (
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("about.title")}
                                    </h2>
                                    <div className="prose max-w-none">
                                        <p className={`text-gray-700 leading-relaxed text-lg ${isRTL ? "text-right" : "text-left"}`}>
                                            {locale === "ar" ? (hospital.about.fullAr || hospital.about.full) : locale === "fr" ? (hospital.about.fullFr || hospital.about.full) : hospital.about.full}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Location Info */}
                            {hospital.location && (
                                <div className="bg-gradient-to-r from-panacea-primary to-panacea-secondary rounded-2xl p-8 text-white shadow-xl">
                                    <h2 className="text-2xl font-bold mb-6">Location & Accessibility</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {hospital.location.airportKm && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                                    <FaPlane className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-extrabold">{hospital.location.airportKm} km</div>
                                                    <div className="text-white/90">From Airport</div>
                                                </div>
                                            </div>
                                        )}
                                        {hospital.location.metroKm && (
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                                    <FaMapMarkerAlt className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-extrabold">{hospital.location.metroKm} km</div>
                                                    <div className="text-white/90">From Metro</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* International Patient Services */}
                            {hospital.internationalPatientServices && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("internationalPatientServices") || "International Patient Services"}
                                    </h2>
                                    <div className="bg-panacea-light/30 rounded-xl p-4">
                                        {hospital.internationalPatientServices.description ? (
                                            <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${isRTL ? "text-right" : "text-left"}`}>
                                                {locale === "ar" ? (hospital.internationalPatientServices.descriptionAr || hospital.internationalPatientServices.description) : locale === "fr" ? (hospital.internationalPatientServices.descriptionFr || hospital.internationalPatientServices.description) : hospital.internationalPatientServices.description}
                                            </div>
                                        ) : null}
                                        <ul className={`space-y-3 mt-4 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.internationalPatientServices.airportPickup && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700">{t("services.airportPickup") || "Airport Pick-up/Drop-off"}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Infrastructure */}
                            {hospital.infrastructure && (
                                <div>
                                    <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("infrastructure") || "Infrastructure"}
                                    </h2>
                                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                                        <ul className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                                            {hospital.infrastructure.totalArea && (
                                                <li className="flex items-start gap-3">
                                                    <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700"><strong>{t("facilitiesInfra.totalArea") || "Total Area:"}</strong> {hospital.infrastructure.totalArea}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar - Quotation Form */}
                        <aside className="lg:col-span-1 space-y-6">
                            {/* Quote Form Card */}
                            <QuoteForm embedded={true} variant="hospital" />


                            {/* Hospital Info Card */}
                            {hospital.address && (
                                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Hospital Information</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="w-4 h-4 text-panacea-primary mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-gray-900">Address</p>
                                                <p className="text-gray-600">
                                                    {hospital.address.street && `${hospital.address.street}, `}
                                                    {hospital.address.city}, {hospital.address.state && `${hospital.address.state}, `}
                                                    {hospital.address.country}
                                                    {hospital.address.zip && ` - ${hospital.address.zip}`}
                                                </p>
                                            </div>
                                        </div>
                                        {hospital.contact?.phone && (
                                            <div className="flex items-start gap-3">
                                                <FaWhatsapp className="w-4 h-4 text-panacea-primary mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">Phone</p>
                                                    <p className="text-gray-600">{hospital.contact.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                        {hospital.contact?.email && (
                                            <div className="flex items-start gap-3">
                                                <FaCheckCircle className="w-4 h-4 text-panacea-primary mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">Email</p>
                                                    <p className="text-gray-600">{hospital.contact.email}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </aside>

                    </div>
                </div>
            </section>

            {selectedDoctor && (
                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    doctor={selectedDoctor}
                    hospitalName={hospital.name}
                    locale={locale}
                />
            )}
        </main>
    );
}
