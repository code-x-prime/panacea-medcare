"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TrustStrip({ locale }) {
    const isRTL = locale === "ar";

    // Stats Data
    const stats = [
        { label: { en: "Countries Served", ar: "دول مخدومة", fr: "Pays Servis" }, value: "10+" },
        { label: { en: "Happy Patients", ar: "مرضى سعداء", fr: "Patients Satisfaits" }, value: "500+" },
        { label: { en: "Partner Hospitals", ar: "مستشفيات شريكة", fr: "Hôpitaux Partenaires" }, value: "50+" },
    ];

    // Hospital Logos/Images (using available assets)
    // Hospital Logos/Images (using available assets)
    const partners = [
        { name: "Apollo Hospital Greams Road", src: "/logos/Apollo Hospital Greams Road.jpg" },
        { name: "Apollo Hospital Hyderabad", src: "/logos/Apollo Hospital Hyderabad.jpg" },
        { name: "Asian Institute of Medical Sciences", src: "/logos/asian hospital.jpg" },
        { name: "BLK Max Hospital", src: "/logos/BLK Max Hospital Pusa Road.jpg" },
        { name: "Bumrungrad International", src: "/logos/Bumrungrad Hospital.jpg" },
        { name: "Fortis Hospital", src: "/logos/Fortis Hospital Gurgaon.jpg" },
        { name: "Indraprastha Apollo", src: "/logos/indraprasth.jpg" },
        { name: "Manipal Hospital", src: "/logos/Manipal Hospital Dwarka.jpg" },
        { name: "Marengo Asia Hospital", src: "/logos/Marengo Asia Hospital, Gurgaon.jpg" },
        { name: "Max Hospital", src: "/logos/Max Hospital Saket.jpg" },
        { name: "Medanta Hospital", src: "/logos/Medanta Hospital, Gurgaon.jpg" },
        { name: "Memorial Hospital", src: "/logos/Memorial Hospital.jpg" },
        { name: "Neelkanth Hospital", src: "/logos/Neelkanth Maternity & IVF Hospital Gurgaon.jpg" },
        { name: "Nepal Mediciti", src: "/logos/Nepal Mediciti.jpg" },
        { name: "Sight Avenue Hospital", src: "/logos/Sight Avenue Hospital Gurgaon.jpg" },
        { name: "Stem Rx Hospital", src: "/logos/Stem Rx Hospital.jpg" },
        { name: "TX Hospital", src: "/logos/TX Hospital.jpg" },
    ];

    return (
        <section className="bg-white border-b border-gray-100 py-8" dir={isRTL ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                    {/* Stats Column */}
                    <div className={`flex flex-wrap justify-center gap-6 md:gap-10 md:w-auto flex-shrink-0 ${isRTL ? "md:order-2" : "md:order-1"}`}>
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center px-4">
                                <p className="text-2xl md:text-3xl font-bold text-panacea-primary">{stat.value}</p>
                                <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">
                                    {stat.label[locale] || stat.label.en}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Divider (Hidden on mobile) */}
                    <div className="hidden md:block w-px h-16 bg-gray-200" />

                    {/* Logos Scroll - Infinite Animation */}
                    <div className={`flex-1 w-full overflow-hidden ${isRTL ? "md:order-1" : "md:order-2"} mt-6 md:mt-0`}>
                        {/* Mobile Label */}
                        <p className="text-center text-xs text-gray-400 mb-4 md:hidden uppercase tracking-widest">Trusted by Top Hospitals</p>

                        <div className="relative w-full overflow-hidden mask-fade-sides">
                            {/* Scroll Container */}
                            <div className="flex items-center gap-8 md:gap-16 w-max animate-scroll">
                                {/* Original Logos */}
                                {partners.map((partner, idx) => (
                                    <div key={`orig-${idx}`} className="flex-shrink-0 flex items-center justify-center hover:scale-105 transition-all duration-300 w-48 h-24 relative group cursor-pointer" title={partner.name}>
                                        <div className="relative w-full h-full rounded-md overflow-hidden bg-white">
                                            <Image
                                                src={partner.src}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate Logos (x2 for smoothness) */}
                                {partners.map((partner, idx) => (
                                    <div key={`dup1-${idx}`} className="flex-shrink-0 flex items-center justify-center hover:scale-105 transition-all duration-300 w-48 h-24 relative group cursor-pointer" title={partner.name}>
                                        <div className="relative w-full h-full rounded-md overflow-hidden bg-white">
                                            <Image
                                                src={partner.src}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Animation Styles */}
                        <style jsx>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
              .mask-fade-sides {
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              }
            `}</style>
                    </div>

                </div>
            </div>
        </section>
    );
}
