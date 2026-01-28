"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AIPreScreeningForm from "@/components/AIPreScreeningForm";

export default function PreScreeningPage({ params: { locale } }) {
    const t = useTranslations("preScreening");

    const steps = [
        { title: t("howItWorks.steps.step1.title"), desc: t("howItWorks.steps.step1.desc"), icon: "1" },
        { title: t("howItWorks.steps.step2.title"), desc: t("howItWorks.steps.step2.desc"), icon: "2" },
        { title: t("howItWorks.steps.step3.title"), desc: t("howItWorks.steps.step3.desc"), icon: "3" },
        { title: t("howItWorks.steps.step4.title"), desc: t("howItWorks.steps.step4.desc"), icon: "4" }
    ];

    const reportItems = [
        t("reportIncludes.items.0"),
        t("reportIncludes.items.1"),
        t("reportIncludes.items.2"),
        t("reportIncludes.items.3")
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-panacea-dark to-panacea-primary py-20 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/hero-banner.png" alt="AI Background" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 font-light">
                        {t("subtitle")} <br />
                        <span className="font-semibold text-white">{t("subtitleHighlight")}</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold opacity-90">
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">{t("badges.report")}</span>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">{t("badges.secure")}</span>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full">{t("badges.analysis")}</span>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Content & Steps */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("howItWorks.title")}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {t("howItWorks.description")}
                            </p>

                            <div className="space-y-8">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-panacea-secondary text-white flex items-center justify-center font-bold text-lg">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg">{step.title}</h4>
                                            <p className="text-gray-600 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 bg-blue-50 border-l-4 border-panacea-primary p-6 rounded-r-lg">
                                <h4 className="font-bold text-panacea-dark mb-2">{t("reportIncludes.title")}</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {reportItems.map((item, idx) => (
                                        <li key={idx}>✔ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: The Form */}
                        <div id="ai-form">
                            <AIPreScreeningForm locale={locale} />
                        </div>

                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">{t("disclaimer.title")}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {t("disclaimer.text")}
                    </p>
                </div>
            </section>
        </main>
    );
}
