"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import {
    Video,
    Scan,
    Stethoscope,
    Microscope,
    Activity,
    FileCheck,
    BarChart3,
    Users,
    CheckCircle2,
    ArrowRight,
    Shield,
    Globe
} from "lucide-react";
import Link from "next/link";

export default function AISolutionsPage({ params }) {
    const { locale } = params;
    const t = useTranslations("aiSolutions");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.services") || "Services", href: `/${locale}/services` },
        { label: t("breadcrumb.aiSolutions") || "AI Solutions", href: `/${locale}/services/ai-solutions` }
    ];

    const sections = t.raw("sections");

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="aiSolutions"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center`}>
                            {t("hero.title")}
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold mb-4 text-center text-white/90">
                            {t("hero.subheading")}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 p-8 md:p-10">
                        <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                            {t("hero.intro")}
                        </p>
                    </div>
                </div>

                {/* Section 1: Telemedicine & Virtual Care Platforms */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/telemedicine.jpg"
                                        alt="Telemedicine & Virtual Care"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Video className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.telemedicine.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.telemedicine.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.telemedicine.content}
                            </p>
                            <div className="space-y-3 mb-4">
                                {sections.telemedicine.capabilities.map((capability, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 italic">
                                <strong>{locale === "ar" ? "مثالي لـ:" : locale === "fr" ? "Idéal pour:" : "Ideal For:"}</strong> {sections.telemedicine.idealFor}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: AI Teleradiology */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Scan className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.aiTeleradiology.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.aiTeleradiology.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.aiTeleradiology.content}
                            </p>
                            <div className="space-y-3">
                                {sections.aiTeleradiology.capabilities.map((capability, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/teleradiology.jpg"
                                        alt="AI Teleradiology"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: AI-Based TB Screening */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/tb-screening.jpg"
                                        alt="AI TB Screening"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Stethoscope className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.aiTBScreening.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.aiTBScreening.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.aiTBScreening.content}
                            </p>
                            <div className="space-y-3 mb-4">
                                {sections.aiTBScreening.capabilities.map((capability, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 italic">
                                <strong>{locale === "ar" ? "مثالي لـ:" : locale === "fr" ? "Idéal pour:" : "Ideal For:"}</strong> {sections.aiTBScreening.idealFor}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 4: AI Telepathology */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Microscope className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.aiTelepathology.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.aiTelepathology.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.aiTelepathology.content}
                            </p>
                            <div className="space-y-3">
                                {sections.aiTelepathology.capabilities.map((capability, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/telepathology.jpg"
                                        alt="AI Telepathology"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5: AI Cancer Screening */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/cancer-screening.jpg"
                                        alt="AI Cancer Screening"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.aiCancerScreening.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.aiCancerScreening.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.aiCancerScreening.content}
                            </p>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-panacea-primary mb-2">
                                    {locale === "ar" ? "تطبيقات الفحص:" : locale === "fr" ? "Applications de Dépistage:" : "Screening Applications:"}
                                </h4>
                                {sections.aiCancerScreening.applications.map((application, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{application}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 6: AI Second Opinion Platforms */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <FileCheck className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.aiSecondOpinion.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.aiSecondOpinion.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {sections.aiSecondOpinion.content}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {sections.aiSecondOpinion.content2}
                            </p>
                        </div>
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/second-opinion.jpg"
                                        alt="AI Second Opinion"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 7: Hospital Analytics & AI-CDSS */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className={`${isRTL ? "md:order-2" : ""}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg group">
                                <div className="aspect-[4/3] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                    <Image
                                        src="/images/ai/hospital-analytics.jpg"
                                        alt="Hospital Analytics & AI-CDSS"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${isRTL ? "md:order-1 text-right" : "text-left"}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-panacea-primary">
                                    {sections.hospitalAnalytics.title}
                                </h2>
                            </div>
                            <p className="text-panacea-accent font-semibold mb-4 text-lg">
                                {sections.hospitalAnalytics.tagline}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {sections.hospitalAnalytics.content}
                            </p>
                            <div className="space-y-3">
                                {sections.hospitalAnalytics.capabilities.map((capability, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{capability}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 8: Public Health-Focused AI Solutions */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Users className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl font-bold text-center`}>
                                {sections.publicHealth.title}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 p-8 md:p-10">
                        <p className={`text-lg text-gray-700 leading-relaxed mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            {sections.publicHealth.content}
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-panacea-primary mb-4">
                                    {locale === "ar" ? "مزايا الصحة العامة الرئيسية:" : locale === "fr" ? "Avantages Clés de la Santé Publique:" : "Key Public Health Advantages:"}
                                </h3>
                                <ul className="space-y-3">
                                    {sections.publicHealth.advantages.map((advantage, idx) => (
                                        <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <CheckCircle2 className="w-5 h-5 text-panacea-primary flex-shrink-0 mt-1" />
                                            <span className="text-gray-700">{advantage}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-panacea-primary mb-4">
                                    {locale === "ar" ? "البرامج القابلة للتطبيق:" : locale === "fr" ? "Programmes Applicables:" : "Applicable Programs:"}
                                </h3>
                                <ul className="space-y-3">
                                    {sections.publicHealth.applicablePrograms.map((program, idx) => (
                                        <li key={idx} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <CheckCircle2 className="w-5 h-5 text-panacea-accent flex-shrink-0 mt-1" />
                                            <span className="text-gray-700">{program}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden shadow-panacea-lg">
                            <div className="aspect-[16/9] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                                <Image
                                    src="/images/ai/public-health.jpg"
                                    alt="Public Health AI Solutions"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 100vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 9: Why Panacea Medcare */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-8">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Shield className="w-8 h-8 md:w-10 md:h-10" />
                            <h2 className={`text-3xl md:text-4xl font-bold text-center`}>
                                {sections.whyPanacea.title}
                            </h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sections.whyPanacea.points.map((point, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all duration-300 border-2 border-transparent hover:border-panacea-primary/30"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-panacea-primary rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <p className={`text-gray-700 leading-relaxed flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                        {point}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 relative rounded-2xl overflow-hidden shadow-panacea-lg">
                        <div className="aspect-[16/9] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                            <Image
                                src="/images/ai/why-panacea.jpg"
                                alt="Why Panacea Medcare"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 100vw"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 10: Final CTA */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Globe className="w-10 h-10 md:w-12 md:h-12" />
                            <h2 className="text-3xl md:text-4xl font-bold">
                                {sections.cta.heading}
                            </h2>
                        </div>
                        <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
                            {sections.cta.content}
                        </p>
                        <p className="text-lg text-white/80 mb-8">
                            {sections.cta.line}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/contact`}
                                className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-panacea-primary rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <span>
                                    {locale === "ar" ? "اتصل بنا اليوم" : locale === "fr" ? "Contactez-nous aujourd'hui" : "Contact Us Today"}
                                </span>
                                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                            </Link>
                            <Link
                                href={`/${locale}/partner-with-us`}
                                className={`inline-flex items-center justify-center gap-3 px-8 py-4 bg-panacea-accent text-white rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <span>
                                    {locale === "ar" ? "شراكة معنا" : locale === "fr" ? "Partenariat" : "Partner With Us"}
                                </span>
                                <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 relative rounded-2xl overflow-hidden shadow-panacea-lg">
                        <div className="aspect-[16/9] relative bg-gradient-to-br from-panacea-primary/20 to-panacea-secondary/20">
                            <Image
                                src="/images/ai/cta-hero.jpg"
                                alt="Let's Build Smarter Healthcare"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
