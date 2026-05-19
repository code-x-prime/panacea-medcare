"use client";
import { localePath } from "@/lib/locale/routing";

import { useState, useMemo, useEffect } from "react";
import TopBanner from "@/components/TopBanner";
import Link from "next/link";
import PublicImage from "@/components/PublicImage";
import doctors from "@/data/doctors.json";
import { FaUserMd, FaSearch, FaChevronLeft, FaChevronRight, FaWhatsapp, FaCalendarCheck } from "react-icons/fa";
import BookingModal from "@/components/BookingModal";
import { CONTACT_CONFIG } from "@/config/contact";

export default function DoctorsContent({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const doctorsPerPage = 12;

    // Filter doctors based on search query
    const filteredDoctors = useMemo(() => {
        if (!searchQuery.trim()) {
            return doctors;
        }
        const query = searchQuery.toLowerCase();
        return doctors.filter(doctor => {
            const name = doctor.name?.toLowerCase() || "";
            const specialty = doctor.specialty?.toLowerCase() || "";
            const designation = doctor.designation?.toLowerCase() || "";
            const hospital = doctor.hospital?.toLowerCase() || "";
            const qualification = doctor.qualification?.toLowerCase() || "";

            return name.includes(query) ||
                specialty.includes(query) ||
                designation.includes(query) ||
                hospital.includes(query) ||
                qualification.includes(query);
        });
    }, [searchQuery]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
    const startIndex = (currentPage - 1) * doctorsPerPage;
    const endIndex = startIndex + doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openBookingModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    const handleWhatsApp = (doctor) => {
        const message = encodeURIComponent(
            `Hi! I would like to book an appointment with ${doctor.name}.\n\n` +
            `Doctor: ${doctor.name}\n` +
            `Specialty: ${doctor.specialty || ""}\n` +
            `Hospital: ${doctor.hospital || ""}\n\n` +
            `Please contact me for scheduling.`
        );
        window.open(`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${message}`, "_blank");
    };

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={locale === "ar" ? "أطباؤنا" : locale === "fr" ? "Nos médecins" : "Our Doctors"}
                subtitle={locale === "ar" ? "تعرف على فريقنا من المتخصصين الطبيين ذوي الخبرة" : locale === "fr" ? "Rencontrez notre équipe de professionnels médicaux expérimentés" : "Meet our team of experienced medical professionals"}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={locale === "ar" ? "ابحث عن طبيب..." : locale === "fr" ? "Rechercher un médecin..." : "Search for a doctor..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-panacea-primary focus:outline-none text-lg"
                            dir={isRTL ? "rtl" : "ltr"}
                        />
                    </div>
                    {searchQuery && (
                        <p className="text-center mt-4 text-gray-600">
                            {filteredDoctors.length} {filteredDoctors.length === 1 ? "doctor found" : "doctors found"}
                        </p>
                    )}
                </div>

                {/* Doctors Grid */}
                {filteredDoctors.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                            {currentDoctors.map((doctor) => {
                                const name = doctor.name || "";
                                const specialty = doctor.specialty || "";
                                const designation = doctor.designation || "";
                                const qualification = doctor.qualification || "";
                                const experience = doctor.experience || "";
                                const hospital = doctor.hospital || "";
                                const hospitalSlug = doctor.hospitalSlug || "";

                                return (
                                    <article
                                        key={doctor.id}
                                        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-panacea-primary flex flex-col w-full max-w-full"
                                    >
                                        <Link href={localePath(locale, `/doctors/${doctor.id}`)} className="flex-1 flex flex-col">
                                            <span className="aspect-square bg-gray-200 relative overflow-hidden block w-full">
                                                {doctor.image ? (
                                                    <PublicImage
                                                        src={doctor.image}
                                                        alt={name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="absolute inset-0 bg-gradient-to-br from-panacea-primary/20 to-panacea-primary/5 flex items-center justify-center">
                                                        <FaUserMd className="w-16 h-16 md:w-20 md:h-20 text-panacea-primary/50" />
                                                    </span>
                                                )}
                                                <span className="absolute inset-0 bg-gradient-to-t from-panacea-primary/80 via-panacea-primary/40 to-transparent flex items-end p-4 md:p-6">
                                                    <span className={isRTL ? "text-right w-full block" : "text-left w-full block"}>
                                                        <span className="text-lg md:text-2xl font-bold text-white block break-words">{name}</span>
                                                        <span className="text-sm md:text-base text-white/90 block break-words">{specialty}</span>
                                                    </span>
                                                </span>
                                            </span>
                                            <span className={`p-4 md:p-6 flex-1 flex flex-col ${isRTL ? "text-right" : "text-left"}`} style={{ display: 'flex' }}>
                                                {designation && (
                                                    <span className="text-xs md:text-sm text-panacea-primary font-semibold mb-2 block break-words">{designation}</span>
                                                )}
                                                {qualification && (
                                                    <span className="text-xs md:text-sm text-gray-600 mb-2 block break-words">{qualification}</span>
                                                )}
                                                {experience && (
                                                    <span className="text-xs md:text-sm font-semibold text-panacea-accent mb-2 block">{experience}</span>
                                                )}
                                                {hospital && (
                                                    <span className="flex items-center gap-2 mt-auto">
                                                        <span className="text-xs md:text-sm text-gray-700 break-words">{hospital}</span>
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                        <div className="p-4 md:p-6 pt-0 space-y-3">
                                            {hospitalSlug && (
                                                <Link
                                                    href={localePath(locale, `/hospitals/${hospitalSlug}`)}
                                                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-center text-xs md:text-sm"
                                                >
                                                    View Hospital
                                                </Link>
                                            )}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleWhatsApp(doctor)}
                                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 md:py-3 px-2 md:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm"
                                                >
                                                    <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
                                                    <span className="hidden sm:inline">WhatsApp</span>
                                                    <span className="sm:hidden">WA</span>
                                                </button>
                                                <button
                                                    onClick={() => openBookingModal(doctor)}
                                                    className="flex-1 bg-panacea-primary hover:bg-panacea-primary/90 text-white font-semibold py-2 md:py-3 px-2 md:px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm"
                                                >
                                                    <FaCalendarCheck className="w-3 h-3 md:w-4 md:h-4" />
                                                    <span className="hidden sm:inline">Book Now</span>
                                                    <span className="sm:hidden">Book</span>
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className={`flex items-center justify-center gap-2 mt-12 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border ${currentPage === 1
                                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                        : "border-gray-300 text-gray-700 hover:bg-panacea-primary hover:text-white hover:border-panacea-primary"
                                        } transition-all`}
                                >
                                    <FaChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 2 && page <= currentPage + 2)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-4 py-2 rounded-lg border transition-all ${currentPage === page
                                                    ? "bg-panacea-primary text-white border-panacea-primary"
                                                    : "border-gray-300 text-gray-700 hover:bg-panacea-primary hover:text-white hover:border-panacea-primary"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (
                                        page === currentPage - 3 ||
                                        page === currentPage + 3
                                    ) {
                                        return (
                                            <span key={page} className="px-2 text-gray-500">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border ${currentPage === totalPages
                                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                        : "border-gray-300 text-gray-700 hover:bg-panacea-primary hover:text-white hover:border-panacea-primary"
                                        } transition-all`}
                                >
                                    <FaChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className={`text-center mt-4 text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredDoctors.length)} of {filteredDoctors.length} doctors
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <FaUserMd className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            {locale === "ar" ? "لم يتم العثور على أطباء" : locale === "fr" ? "Aucun médecin trouvé" : "No doctors found"}
                        </p>
                        <p className="text-gray-500 mt-2">
                            {locale === "ar" ? "حاول البحث بكلمات مختلفة" : locale === "fr" ? "Essayez de rechercher avec d'autres mots" : "Try searching with different keywords"}
                        </p>
                    </div>
                )}
            </section>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                doctor={selectedDoctor}
                locale={locale}
            />
        </main>
    );
}
