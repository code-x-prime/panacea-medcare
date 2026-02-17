"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MessageCircle, Phone, Mail, Clock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function NeedAssistanceButton({ locale }) {
    const t = useTranslations("needAssistance");
    const isRTL = locale === "ar";

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 xl:max-w-7xl">
                {/* Premium Pre-Screening Style Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003459] via-[#066F89] to-[#066F89] shadow-2xl text-white">
                    {/* Abstract Shapes/Glow similar to Pre-Screening */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0BA35A]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
                        {/* Text Content */}
                        <div className={`text-center lg:text-left ${isRTL ? "lg:order-2 lg:text-right" : ""}`}>
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <Sparkles className="w-4 h-4 text-[#FFD166]" />
                                <span>{t("badge")}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                                {t("title")}
                            </h2>

                            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {t("description")}
                            </p>

                            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                                <Link
                                    href={`/${locale}/pre-screening`}
                                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#066F89] rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1 ${isRTL ? "flex-row-reverse" : ""}`}
                                >
                                    <span>{t("ctaPrimary")}</span>
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                                </Link>

                                <Link
                                    href={`/${locale}/contact`}
                                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#066F89]/30 border border-white/30 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                                >
                                    <span>{t("ctaSecondary")}</span>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className={`mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-medium text-blue-200 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-[#0BA35A]" />
                                    <span>{t("hipaa")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#FFD166]" />
                                    <span>{t("support247")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual/Stats Column */}
                        <div className={`hidden lg:block relative ${isRTL ? "lg:order-1" : ""}`}>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-sm mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <MessageCircle className="w-6 h-6 text-[#066F89]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-blue-100">{t("avgResponseLabel")}</p>
                                        <p className="text-xl font-bold text-white">{t("avgResponseValue")}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-[#0BA35A] rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-blue-200">
                                        <span>{t("satisfactionLabel")}</span>
                                        <span>{t("satisfactionValue")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
