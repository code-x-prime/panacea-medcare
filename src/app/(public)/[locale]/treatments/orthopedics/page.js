"use client";

import TopBanner from "@/components/TopBanner";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OrthopedicsTreatmentPage({ params }) {
    const { locale } = params;
    const t = useTranslations("treatmentsOrthopedics");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home"), href: `/${locale}` },
        { label: t("breadcrumb.treatments"), href: `/${locale}/treatments` },
        { label: t("breadcrumb.orthopedics"), href: `/${locale}/treatments/orthopedics` }
    ];

    const treatments = [
        {
            title: t("treatments.knee.title"),
            description: t("treatments.knee.description")
        },
        {
            title: t("treatments.hip.title"),
            description: t("treatments.hip.description")
        },
        {
            title: t("treatments.robotic.title"),
            description: t("treatments.robotic.description")
        },
        {
            title: t("treatments.spine.title"),
            description: t("treatments.spine.description")
        },
        {
            title: t("treatments.sports.title"),
            description: t("treatments.sports.description")
        }
    ];

    const faqs = [
        {
            question: t("faqs.q1.question"),
            answer: t("faqs.q1.answer")
        },
        {
            question: t("faqs.q2.question"),
            answer: t("faqs.q2.answer")
        },
        {
            question: t("faqs.q3.question"),
            answer: t("faqs.q3.answer")
        },
        {
            question: t("faqs.q4.question"),
            answer: t("faqs.q4.answer")
        },
        {
            question: t("faqs.q5.question"),
            answer: t("faqs.q5.answer")
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"} className="bg-white">
            <TopBanner
                locale={locale}
                namespace="treatments"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-panacea-primary/10 rounded-full mb-6">
                            <Image
                                src="/treatment/orthopedics-joint-replacement.svg"
                                alt="Orthopedics"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-panacea-dark mb-6 break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.2' }}>
                            {t("title")}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-panacea-gray leading-relaxed mb-8 break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.7' }}>
                            {t("intro")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/services/teleconsultation`}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-panacea-primary text-white rounded-lg font-semibold hover:bg-panacea-blue-600 transition-all shadow-panacea hover:shadow-panacea-lg"
                            >
                                {t("cta.consultation")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#quote-form"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-panacea-primary border-2 border-panacea-primary rounded-lg font-semibold hover:bg-panacea-primary hover:text-white transition-all"
                            >
                                {t("cta.quote")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-panacea-dark mb-12 text-center break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.3' }}>
                        {t("sectionTitle")}
                    </h2>
                    <div className="space-y-6">
                        {treatments.map((treatment, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 md:p-8 rounded-xl shadow-panacea hover:shadow-panacea-lg transition-all border-l-4 border-panacea-primary"
                            >
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-panacea-dark mb-4 flex items-start gap-3 break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.3' }}>
                                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-panacea-primary mt-1 flex-shrink-0" />
                                    <span>{treatment.title}</span>
                                </h3>
                                <p className="text-sm sm:text-base text-panacea-gray leading-relaxed break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.6' }}>
                                    {treatment.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-panacea-light py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-panacea-dark mb-12 text-center break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.3' }}>
                            {t("faqs.title")}
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 md:p-8 rounded-xl shadow-panacea"
                                >
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-panacea-dark mb-3 break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.4' }}>
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm sm:text-base text-panacea-gray leading-relaxed break-words" style={{ wordBreak: 'break-word', hyphens: 'auto', lineHeight: '1.6' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="quote-form" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="max-w-3xl mx-auto">
                    <QuoteForm locale={locale} />
                </div>
            </section>
        </main>
    );
}

