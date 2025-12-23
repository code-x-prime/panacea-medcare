"use client";

import TopBanner from "@/components/TopBanner";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
    FaMapMarkerAlt, FaBed, FaUserMd, FaCheckCircle, FaWhatsapp, FaPlay
} from "react-icons/fa";
import {
    Heart as HeartIcon, Brain as BrainIcon, Bone as BoneIcon,
    Activity as ActivityIcon, Baby as BabyIcon,
    Droplet as DropletIcon
} from "lucide-react";

export default function AsianHospitalPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("hospitals");

    const breadcrumbItems = [
        { label: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
        { label: locale === "ar" ? "المستشفيات" : locale === "fr" ? "Hôpitaux" : "Hospitals", href: `/${locale}/hospitals` },
        { label: "Asian Hospital", href: `/${locale}/hospitals/asian-hospital-delhi` }
    ];

    // Treatment Packages with Icons (Vaidam-inspired)
    const treatmentPackages = [
        {
            id: "cardiology",
            icon: HeartIcon,
            name: locale === "ar" ? "أمراض القلب" : locale === "fr" ? "Cardiologie" : "Cardiology",
            treatments: [
                { name: locale === "ar" ? "جراحة القلب المفتوح" : locale === "fr" ? "Chirurgie à cœur ouvert" : "Open Heart Surgery", price: "$8,000 - $12,000" },
                { name: locale === "ar" ? "قسطرة القلب" : locale === "fr" ? "Cathétérisme cardiaque" : "Cardiac Catheterization", price: "$3,500 - $5,000" },
                { name: locale === "ar" ? "استبدال صمام القلب" : locale === "fr" ? "Remplacement de valve cardiaque" : "Heart Valve Replacement", price: "$10,000 - $15,000" },
                { name: locale === "ar" ? "جراحة مجازة الشريان التاجي" : locale === "fr" ? "Pontage coronarien" : "Coronary Artery Bypass", price: "$9,000 - $13,000" },
            ]
        },
        {
            id: "oncology",
            icon: ActivityIcon,
            name: locale === "ar" ? "علاج الأورام" : locale === "fr" ? "Oncologie" : "Oncology",
            treatments: [
                { name: locale === "ar" ? "علاج السرطان بالكيمياء" : locale === "fr" ? "Chimiothérapie" : "Chemotherapy", price: "$2,000 - $5,000" },
                { name: locale === "ar" ? "العلاج الإشعاعي" : locale === "fr" ? "Radiothérapie" : "Radiation Therapy", price: "$3,000 - $6,000" },
                { name: locale === "ar" ? "جراحة الأورام" : locale === "fr" ? "Chirurgie oncologique" : "Oncological Surgery", price: "$5,000 - $10,000" },
                { name: locale === "ar" ? "زراعة نخاع العظم" : locale === "fr" ? "Greffe de moelle osseuse" : "Bone Marrow Transplant", price: "$25,000 - $35,000" },
            ]
        },
        {
            id: "neurosurgery",
            icon: BrainIcon,
            name: locale === "ar" ? "جراحة الأعصاب" : locale === "fr" ? "Neurochirurgie" : "Neurosurgery",
            treatments: [
                { name: locale === "ar" ? "جراحة الدماغ" : locale === "fr" ? "Chirurgie cérébrale" : "Brain Surgery", price: "$12,000 - $18,000" },
                { name: locale === "ar" ? "جراحة العمود الفقري" : locale === "fr" ? "Chirurgie de la colonne vertébrale" : "Spine Surgery", price: "$8,000 - $15,000" },
                { name: locale === "ar" ? "جراحة الأورام العصبية" : locale === "fr" ? "Chirurgie des tumeurs nerveuses" : "Neuro-oncology Surgery", price: "$10,000 - $16,000" },
            ]
        },
        {
            id: "orthopedics",
            icon: BoneIcon,
            name: locale === "ar" ? "جراحة العظام" : locale === "fr" ? "Orthopédie" : "Orthopedics",
            treatments: [
                { name: locale === "ar" ? "استبدال مفصل الورك" : locale === "fr" ? "Remplacement de hanche" : "Hip Replacement", price: "$6,000 - $9,000" },
                { name: locale === "ar" ? "استبدال مفصل الركبة" : locale === "fr" ? "Remplacement du genou" : "Knee Replacement", price: "$5,500 - $8,500" },
                { name: locale === "ar" ? "جراحة الكتف" : locale === "fr" ? "Chirurgie de l'épaule" : "Shoulder Surgery", price: "$4,000 - $7,000" },
            ]
        },
        {
            id: "ivf",
            icon: BabyIcon,
            name: locale === "ar" ? "أطفال الأنابيب" : locale === "fr" ? "FIV" : "IVF",
            treatments: [
                { name: locale === "ar" ? "التلقيح الاصطناعي" : locale === "fr" ? "FIV standard" : "Standard IVF", price: "$3,500 - $5,000" },
                { name: locale === "ar" ? "الحقن المجهري" : locale === "fr" ? "ICSI" : "ICSI", price: "$4,500 - $6,500" },
                { name: locale === "ar" ? "تجميد البويضات" : locale === "fr" ? "Congélation d'ovocytes" : "Egg Freezing", price: "$2,500 - $4,000" },
            ]
        },
        {
            id: "transplant",
            icon: DropletIcon,
            name: locale === "ar" ? "زراعة الأعضاء" : locale === "fr" ? "Transplantation" : "Organ Transplant",
            treatments: [
                { name: locale === "ar" ? "زراعة الكلى" : locale === "fr" ? "Greffe de rein" : "Kidney Transplant", price: "$15,000 - $25,000" },
                { name: locale === "ar" ? "زراعة الكبد" : locale === "fr" ? "Greffe de foie" : "Liver Transplant", price: "$35,000 - $50,000" },
                { name: locale === "ar" ? "زراعة القلب" : locale === "fr" ? "Greffe de cœur" : "Heart Transplant", price: "$50,000 - $70,000" },
            ]
        },
    ];

    const hospitalVideos = [
        { id: 1, thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: locale === "ar" ? "جولة في المستشفى" : locale === "fr" ? "Visite de l'hôpital" : "Hospital Tour" },
        { id: 2, thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: locale === "ar" ? "شهادة مريض" : locale === "fr" ? "Témoignage patient" : "Patient Testimonial" },
    ];

    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            {/* Blurred Hospital Image Header */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop&auto=format"
                    alt="Asian Hospital"
                    fill
                    className="object-cover blur-sm scale-110"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-panacea-primary/80 via-panacea-primary/60 to-panacea-primary/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-center text-white px-4 ${isRTL ? "text-right" : "text-left"}`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Asian Hospital</h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                            {locale === "ar" ? "مستشفى متعدد التخصصات في دلهي" : locale === "fr" ? "Hôpital multispécialisé à Delhi" : "Multi-specialty Hospital in Delhi"}
                        </p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Hospital Overview Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 border border-gray-100">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaMapMarkerAlt className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("location") || "Location"}</p>
                                    <p className="text-sm text-gray-600">Delhi, India</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaBed className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("beds") || "Beds"}</p>
                                    <p className="text-sm text-gray-600">500+</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaUserMd className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("specialty") || "Specialty"}</p>
                                    <p className="text-sm text-gray-600">Multi-specialty</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <FaCheckCircle className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                <div className={isRTL ? "text-right" : "text-left"}>
                                    <p className="text-sm font-semibold text-gray-900">{t("accreditations") || "Accreditations"}</p>
                                    <p className="text-sm text-gray-600">JCI Accredited</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Treatments Offered Section */}
                    <div className="mb-12">
                        <div className={`text-center mb-12 ${isRTL ? "text-right" : "text-left"}`}>
                            <h2 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "العلاجات المقدمة" : locale === "fr" ? "Traitements Offerts" : "Treatments Offered"}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                {locale === "ar" ? "نقدم مجموعة شاملة من العلاجات المتخصصة بأحدث التقنيات" : locale === "fr" ? "Nous offrons une gamme complète de traitements spécialisés avec les dernières technologies" : "We offer a comprehensive range of specialized treatments with the latest technology"}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {treatmentPackages.map((treatmentPackage) => {
                                const IconComponent = treatmentPackage.icon;
                                return (
                                    <div
                                        key={treatmentPackage.id}
                                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                                    >
                                        <div className="bg-gradient-to-br from-panacea-primary to-panacea-secondary p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white">{treatmentPackage.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {treatmentPackage.treatments.map((treatment, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 ${isRTL ? "flex-row-reverse" : ""}`}
                                                    >
                                                        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                                            <p className="font-semibold text-gray-900 text-sm">{treatment.name}</p>
                                                        </div>
                                                        <div className={`${isRTL ? "mr-3" : "ml-3"}`}>
                                                            <p className="text-panacea-accent font-bold text-sm">{treatment.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full mt-6 py-3 bg-panacea-secondary hover:bg-panacea-secondary/90 text-white rounded-lg font-semibold transition-colors">
                                                {locale === "ar" ? "احصل على عرض أسعار" : locale === "fr" ? "Obtenir un devis" : "Get Quote"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Hospital Videos */}
                    {hospitalVideos && hospitalVideos.length > 0 && (
                        <div className="mb-12">
                            <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                {t("videos") || "Hospital Videos"}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {hospitalVideos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="relative group cursor-pointer bg-gray-900 rounded-xl overflow-hidden"
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        <div className="relative aspect-video">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <FaPlay className="w-6 h-6 text-panacea-primary ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <h3 className="text-white font-semibold">{video.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
                            href="https://wa.me/919958800961"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span>{t("whatsappUs") || "Whatsapp Us"}</span>
                        </a>
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

