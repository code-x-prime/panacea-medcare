"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AIPreScreeningForm from "@/components/AIPreScreeningForm";
import { Clock, Shield, Globe, Zap, CheckCircle, FileText, Users, Plane, Lock, Server, FileCheck, AlertTriangle } from "lucide-react";

export default function PreScreeningPage({ params: { locale } }) {
    const t = useTranslations("preScreening");
    const isRTL = locale === "ar";

    const stepKeys = ["step1", "step2", "step3", "step4"];
    const whyKeys = [
        { key: "speed", icon: Zap },
        { key: "accuracy", icon: CheckCircle },
        { key: "transparency", icon: FileText },
        { key: "globalAccess", icon: Globe },
        { key: "zeroObligation", icon: Shield },
    ];
    const afterKeys = [
        { key: "items.0", icon: Users },
        { key: "items.1", icon: FileCheck },
        { key: "items.2", icon: FileText },
        { key: "items.3", icon: Plane },
    ];

    return (
        <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#003459] via-[#066F89] to-[#066F89] py-16 md:py-24 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/hero-banner.png" alt="AI Background" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 xl:max-w-7xl relative z-10 text-center">
                    <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                        🤖 {t("hero.badge")}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                        {t("hero.title")}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-4 font-medium">
                        {t("hero.tagline")}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {t("hero.subtitle")}
                    </h2>
                    <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                        {t("hero.intro")}
                        <strong className="text-white"> {t("hero.introHighlight")}</strong>
                        {t("hero.introSuffix")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm font-semibold">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" /> {t("hero.badges.report")}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4" /> {t("hero.badges.secure")}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center justify-center gap-2">
                            <Globe className="w-4 h-4" /> {t("hero.badges.global")}
                        </span>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 md:py-20 bg-[#F5F7FA]">
                <div className="container mx-auto px-4 xl:max-w-7xl">
                    <div className="text-center mb-12">
                        <span className="inline-block px-6 py-2 bg-[#066F89]/10 text-[#066F89] rounded-full text-sm font-bold mb-4">
                            {t("howItWorks.badge")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] mb-4">
                            {t("howItWorks.title")}
                        </h2>
                        <p className="text-[#6D7A8A] max-w-2xl mx-auto">
                            {t("howItWorks.description")}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {stepKeys.map((sk, idx) => (
                            <div key={sk} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 relative">
                                <div
                                    className={`absolute -top-4 w-10 h-10 rounded-full bg-gradient-to-r from-[#066F89] to-[#FF6B35] text-white flex items-center justify-center font-bold text-lg shadow-lg ${isRTL ? "right-6" : "left-6"}`}
                                >
                                    {idx + 1}
                                </div>
                                <div className="pt-4">
                                    <h4 className="font-bold text-[#003459] text-lg mb-2">{t(`steps.${sk}.title`)}</h4>
                                    <p className="text-[#6D7A8A] text-sm mb-4">{t(`steps.${sk}.desc`)}</p>
                                    <ul className="space-y-1 text-sm text-[#6D7A8A]">
                                        {((t.raw("steps")?.[sk]?.items) || []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-[#0BA35A] mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-xs text-[#066F89] font-semibold mt-4">⏱️ {t(`steps.${sk}.time`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form + Report Includes */}
            <section className="py-16 md:py-20 bg-white" id="ai-form">
                <div className="container mx-auto px-4 xl:max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="inline-block px-6 py-2 bg-[#0BA35A]/10 text-[#0BA35A] rounded-full text-sm font-bold mb-4">
                                ✔ {t("reportIncludes.badge")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] mb-6">
                                {t("reportIncludes.title")}
                            </h2>
                            <div className="space-y-3 mb-8">
                                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                                    const val = t(`reportIncludes.items.${i}`);
                                    return val ? (
                                        <div key={i} className="flex items-center gap-3 bg-[#F5F7FA] px-4 py-3 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-[#0BA35A] flex-shrink-0" />
                                            <span className="text-[#6D7A8A]">{val}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className="bg-[#FFD166]/20 border-l-4 border-[#FF6B35] p-4 rounded-r-lg">
                                <p className="text-[#003459] text-sm flex items-start gap-2">
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FF6B35]" />
                                    <span>{t("reportIncludes.important")}</span>
                                </p>
                            </div>
                            <div className="mt-8 bg-gradient-to-r from-[#066F89]/10 to-[#FF6B35]/10 p-6 rounded-xl border border-[#066F89]/20">
                                <p className="text-lg font-bold text-[#003459] flex items-center gap-2">
                                    ⭐ {t("conversionBooster")}
                                </p>
                            </div>
                        </div>
                        <div>
                            <AIPreScreeningForm locale={locale} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-[#F5F7FA] via-white to-blue-50">
                <div className="container mx-auto px-4 xl:max-w-7xl">
                    <div className="text-center mb-12">
                        <span className="inline-block px-6 py-2 bg-[#066F89]/10 text-[#066F89] rounded-full text-sm font-bold mb-4">
                            {t("whyChoose.badge")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] mb-4">
                            {t("whyChoose.title")}
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {whyKeys.map(({ key, icon: Icon }) => (
                            <div key={key} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center border border-gray-100">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#066F89] to-[#FF6B35] flex items-center justify-center">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="font-bold text-[#003459] mb-2">{t(`whyChoose.${key}`)}</h4>
                                <p className="text-sm text-[#6D7A8A]">{t(`whyChoose.${key}Desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Privacy */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 xl:max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-block px-6 py-2 bg-blue-100 text-[#066F89] rounded-full text-sm font-bold mb-4">
                                🔒 {t("privacy.badge")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] mb-4">
                                {t("privacy.title")}
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
                                <Lock className="w-10 h-10 text-[#066F89] mx-auto mb-3" />
                                <h4 className="font-bold text-[#003459] mb-1">{t("privacy.encrypted")}</h4>
                                <p className="text-sm text-[#6D7A8A]">{t("privacy.encryptedDesc")}</p>
                            </div>
                            <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
                                <Server className="w-10 h-10 text-[#066F89] mx-auto mb-3" />
                                <h4 className="font-bold text-[#003459] mb-1">{t("privacy.servers")}</h4>
                                <p className="text-sm text-[#6D7A8A]">{t("privacy.serversDesc")}</p>
                            </div>
                            <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
                                <Shield className="w-10 h-10 text-[#066F89] mx-auto mb-3" />
                                <h4 className="font-bold text-[#003459] mb-1">{t("privacy.protocols")}</h4>
                                <p className="text-sm text-[#6D7A8A]">{t("privacy.protocolsDesc")}</p>
                            </div>
                            <div className="bg-[#F5F7FA] rounded-xl p-6 text-center">
                                <FileCheck className="w-10 h-10 text-[#066F89] mx-auto mb-3" />
                                <h4 className="font-bold text-[#003459] mb-1">{t("privacy.compliance")}</h4>
                                <p className="text-sm text-[#6D7A8A]">{t("privacy.complianceDesc")}</p>
                            </div>
                        </div>
                        <p className="text-center text-[#6D7A8A] mt-8 text-sm">
                            🔐 {t("privacy.note")}
                        </p>
                    </div>
                </div>
            </section>

            {/* What Happens After */}
            <section className="py-16 md:py-20 bg-[#F5F7FA]">
                <div className="container mx-auto px-4 xl:max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="inline-block px-6 py-2 bg-[#066F89]/10 text-[#066F89] rounded-full text-sm font-bold mb-4">
                                {t("afterScreening.badge")}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003459] mb-4">
                                {t("afterScreening.title")}
                            </h2>
                            <p className="text-[#6D7A8A]">{t("afterScreening.subtitle")}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {afterKeys.map(({ key, icon: Icon }, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-md flex items-center gap-4 border border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-[#066F89]/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-[#066F89]" />
                                    </div>
                                    <p className="font-medium text-[#003459]">{t(`afterScreening.${key}`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 xl:max-w-4xl text-center">
                    <div className="bg-[#FFD166]/20 border border-[#FFD166] rounded-xl p-6">
                        <AlertTriangle className="w-8 h-8 text-[#FF6B35] mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-[#003459] mb-3">⚠️ {t("disclaimer.title")}</h4>
                        <p className="text-sm text-[#6D7A8A] leading-relaxed">{t("disclaimer.text")}</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-[#066F89] to-[#066F89] text-white">
                <div className="container mx-auto px-4 xl:max-w-7xl text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("cta.title")}</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
                    <a
                        href="#ai-form"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#066F89] rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                    >
                        🚀 {t("cta.button")}
                    </a>
                </div>
            </section>
        </main>
    );
}
