"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage({ params }) {
    const { locale } = params;
    const t = useTranslations("about");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.about") || "About Us", href: `/${locale}/about` }
    ];

    const points = t.raw("points");
    const teamMembers = t.raw("coreTeam.members");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="about"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* About Us Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center`}>
                            {t("heading")}
                        </h2>
                        <p className={`text-lg md:text-xl text-white/90 leading-relaxed text-center max-w-4xl mx-auto ${isRTL ? "text-right" : "text-left"}`}>
                            {t("intro")}
                        </p>
                    </div>

                    <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-start ${isRTL ? "flex-row-reverse" : ""}`}>
                        {/* Group Photo */}
                        <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/about/team.png"
                                        alt="Panacea Medcare Team"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Points */}
                        <div className={`space-y-4 ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            {points.map((point, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-panacea hover:shadow-panacea-lg transition-all border-l-4 border-panacea-primary group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                        <p className={`text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                            {point}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Core Team Section */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                            {t("coreTeam.title")}
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {/* Mr. Sumiit Gupta */}
                        <div className="bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100 hover:shadow-panacea-lg transition-all duration-300">
                            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                    <div className="relative h-full min-h-[400px]">
                                        <Image
                                            src="/about/mr-sumiit-gupta.png"
                                            alt={teamMembers.sumiitGupta.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className={`p-6 md:p-8 flex flex-col justify-center ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-2">{teamMembers.sumiitGupta.name}</h3>
                                    <p className="text-panacea-accent font-semibold mb-4">{teamMembers.sumiitGupta.title}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{teamMembers.sumiitGupta.description}</p>
                                    <p className="text-gray-600 leading-relaxed">{teamMembers.sumiitGupta.roles}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dr. Mandakini Chopra */}
                        <div className="bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100 hover:shadow-panacea-lg transition-all duration-300">
                            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                    <div className="relative h-full min-h-[400px]">
                                        <Image
                                            src="/about/dr-mandakini-chopra.png"
                                            alt={teamMembers.drMandakiniChopra.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className={`p-6 md:p-8 flex flex-col justify-center ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-2">{teamMembers.drMandakiniChopra.name}</h3>
                                    <p className="text-panacea-accent font-semibold mb-4">{teamMembers.drMandakiniChopra.title}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{teamMembers.drMandakiniChopra.description}</p>
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-panacea-primary mb-2">Workshops & Training:</h4>
                                        <ul className="space-y-2">
                                            {teamMembers.drMandakiniChopra.workshops.map((workshop, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                    <span className="text-panacea-accent mt-1">•</span>
                                                    <span>{workshop}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed"><strong>Specialties:</strong> {teamMembers.drMandakiniChopra.specialties}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dr. Prerna */}
                        <div className="bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100 hover:shadow-panacea-lg transition-all duration-300">
                            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                    <div className="relative h-full min-h-[400px]">
                                        <Image
                                            src="/about/dr-prerna.png"
                                            alt={teamMembers.drPrerna.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className={`p-6 md:p-8 flex flex-col justify-center ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-2">{teamMembers.drPrerna.name}</h3>
                                    <p className="text-panacea-accent font-semibold mb-4">{teamMembers.drPrerna.title}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{teamMembers.drPrerna.description}</p>
                                    <ul className="space-y-2">
                                        {teamMembers.drPrerna.qualifications.map((qual, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                <span className="text-panacea-accent mt-1">•</span>
                                                <span>{qual}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Dr. Deepika */}
                        <div className="bg-white rounded-2xl shadow-panacea overflow-hidden border border-gray-100 hover:shadow-panacea-lg transition-all duration-300">
                            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className={`relative ${isRTL ? "md:order-2" : ""}`}>
                                    <div className="relative h-full min-h-[400px]">
                                        <Image
                                            src="/about/dr-deepika.png"
                                            alt={teamMembers.drDeepika.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className={`p-6 md:p-8 flex flex-col justify-center ${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary mb-2">{teamMembers.drDeepika.name}</h3>
                                    <p className="text-panacea-accent font-semibold mb-4">{teamMembers.drDeepika.title}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4"><strong>Experience:</strong> {teamMembers.drDeepika.experience}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{teamMembers.drDeepika.aboutAyurveda}</p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{teamMembers.drDeepika.aboutClinic}</p>
                                    <div>
                                        <h4 className="font-semibold text-panacea-primary mb-2">Treatments Provided:</h4>
                                        <ul className="space-y-2">
                                            {teamMembers.drDeepika.treatments.map((treatment, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                    <span className="text-panacea-accent mt-1">•</span>
                                                    <span>{treatment}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className={`bg-gradient-to-br from-panacea-primary to-panacea-secondary p-8 rounded-2xl text-white shadow-panacea-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold mb-4">{t("mission")}</h3>
                        <p className="text-white/90 leading-relaxed">{t("missionText")}</p>
                    </div>
                    <div className={`bg-gradient-to-br from-panacea-secondary to-panacea-primary p-8 rounded-2xl text-white shadow-panacea-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold mb-4">{t("vision")}</h3>
                        <p className="text-white/90 leading-relaxed">{t("visionText")}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
