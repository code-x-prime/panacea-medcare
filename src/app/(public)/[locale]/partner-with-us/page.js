"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { CheckCircle2, Users, Handshake, Building2, Heart, Shield, DollarSign } from "lucide-react";

export default function PartnerWithUsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("partnerWithUs");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.partner") || "Partner With Us", href: `/${locale}/partner-with-us` }
    ];

    const propositionPoints = t.raw("proposition.points");
    const whatYouCanExpect = t.raw("whatYouCanExpect.points");
    const whatWeExpect = t.raw("whatWeExpect.points");
    const propositionDetails = t.raw("propositionDetails");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="partnerWithUs"
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

                {/* The Proposition Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Handshake className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                                {t("proposition.title")}
                            </h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {propositionPoints.map((point, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-3xl font-bold text-white">{idx + 1}</span>
                                </div>
                                <p className={`text-gray-700 leading-relaxed text-lg ${isRTL ? "text-right" : "text-left"}`}>
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What You Can Expect Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Heart className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                                {t("whatYouCanExpect.title")}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 p-8 md:p-10">
                        <ul className="space-y-4">
                            {whatYouCanExpect.map((point, idx) => (
                                <li key={idx} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="w-8 h-8 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-lg text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* What We Expect Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Shield className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                                {t("whatWeExpect.title")}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 p-8 md:p-10">
                        <ul className="space-y-4">
                            {whatWeExpect.map((point, idx) => (
                                <li key={idx} className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="w-8 h-8 bg-panacea-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-lg text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* The Proposition Details - 3 Columns */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center`}>
                            {t("propositionDetails.title")}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Patient Column */}
                        <div className="bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {propositionDetails.patient.title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {propositionDetails.patient.points.map((point, idx) => (
                                    <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-panacea-primary text-xl font-bold mt-1 flex-shrink-0">•</span>
                                        <span className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* You Column */}
                        <div className="bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-accent/30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-panacea-accent to-panacea-orange-600 rounded-xl flex items-center justify-center">
                                    <Handshake className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-panacea-accent">
                                    {propositionDetails.you.title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {propositionDetails.you.points.map((point, idx) => (
                                    <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-panacea-accent text-xl font-bold mt-1 flex-shrink-0">•</span>
                                        <span className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Panacea Medcare Column */}
                        <div className="bg-white rounded-2xl shadow-panacea p-6 md:p-8 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-secondary/30">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-panacea-secondary to-panacea-primary rounded-xl flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-panacea-secondary">
                                    {propositionDetails.panaceaMedcare.title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {propositionDetails.panaceaMedcare.points.map((point, idx) => (
                                    <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-panacea-secondary text-xl font-bold mt-1 flex-shrink-0">•</span>
                                        <span className={`text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {locale === "ar" ? "ابدأ شراكتك معنا اليوم" : locale === "fr" ? "Commencez votre partenariat avec nous aujourd'hui" : "Start Your Partnership With Us Today"}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            {locale === "ar" ? "اتصل بنا لمناقشة فرص الشراكة" : locale === "fr" ? "Contactez-nous pour discuter des opportunités de partenariat" : "Contact us to discuss partnership opportunities"}
                        </p>
                        <a
                            href={`/${locale}/contact`}
                            className="inline-block bg-white text-panacea-primary font-semibold px-8 py-4 rounded-lg hover:bg-panacea-light transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {locale === "ar" ? "اتصل بنا" : locale === "fr" ? "Contactez-nous" : "Contact Us"}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
