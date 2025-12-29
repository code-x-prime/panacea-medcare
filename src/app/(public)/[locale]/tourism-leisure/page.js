"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { MapPin, Flower2, Camera, Plane, CheckCircle2 } from "lucide-react";

export default function TourismLeisurePage({ params }) {
    const { locale } = params;
    const t = useTranslations("tourismLeisure");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.tourism") || "Tourism & Leisure", href: `/${locale}/tourism-leisure` }
    ];

    const services = [
        {
            icon: Flower2,
            title: t("services.spa.title"),
            description: t("services.spa.description")
        },
        {
            icon: Camera,
            title: t("services.sightseeing.title"),
            description: t("services.sightseeing.description")
        },
        {
            icon: Plane,
            title: t("services.rejuvenative.title"),
            description: t("services.rejuvenative.description")
        },
        {
            icon: MapPin,
            title: t("services.special.title"),
            description: t("services.special.description")
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="tourismLeisure"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>
                </div>

                {/* Images and Services Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Left Side - Images */}
                        <div className="space-y-6">
                            {/* Taj Mahal Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/taj-mahal.jpg"
                                        alt="Taj Mahal, Agra - Iconic monument"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("destinations.agra")}</h3>
                                        <p className="text-white/90">Experience the wonder of the Taj Mahal</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ayurvedic Treatment Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ayurvedic-treatment.jpg"
                                        alt="Ayurvedic treatment - Shirodhara therapy"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Ayurvedic Wellness</h3>
                                        <p className="text-white/90">Traditional healing and rejuvenation therapies</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Services */}
                        <div className="flex flex-col justify-center">
                            <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                                <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-center`}>
                                    {t("services.title")}
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {services.map((service, idx) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className={`bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30 group relative overflow-hidden ${isRTL ? "text-right" : "text-left"}`}
                                        >
                                            {/* Decorative gradient background */}
                                            <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-32 h-32 bg-gradient-to-br from-panacea-primary/5 to-transparent ${isRTL ? "rounded-br-full" : "rounded-bl-full"} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                            <div className={`flex items-start gap-4 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                <div className="w-16 h-16 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md group-hover:shadow-lg">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl md:text-2xl font-bold text-panacea-primary group-hover:text-panacea-secondary transition-colors mb-3">
                                                        {service.title}
                                                    </h3>
                                                    <p className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Destinations Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center`}>
                            Popular Destinations
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { key: "agra", name: t("destinations.agra") },
                            { key: "kerala", name: t("destinations.kerala") },
                            { key: "goa", name: t("destinations.goa") },
                            { key: "rajasthan", name: t("destinations.rajasthan") }
                        ].map((destination, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30 group"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-panacea-primary/10 rounded-full flex items-center justify-center group-hover:bg-panacea-primary transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-panacea-primary" />
                                    </div>
                                    <h3 className={`text-lg font-bold text-panacea-primary ${isRTL ? "text-right" : "text-left"}`}>
                                        {destination.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
