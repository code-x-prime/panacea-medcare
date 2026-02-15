"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

export default function NeedAssistanceButton({ locale }) {
    const t = useTranslations("specialties");
    const isRTL = locale === "ar";

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 xl:max-w-7xl">
                {/* Prominent Colored Box */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B35] via-[#FF8C61] to-[#FFA07A] shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#066F89]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                                <MessageCircle className="w-10 h-10 text-white" />
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                                {t("needAssistance")}
                            </h2>

                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Our medical experts are available 24/7 to answer your questions and guide you through your healthcare journey.
                            </p>

                            {/* CTA Button */}
                            <Link
                                href={`/${locale}/consult-online`}
                                className={`inline-flex items-center gap-3 px-10 py-5 bg-white text-[#FF6B35] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-50 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                                <MessageCircle className="w-6 h-6" />
                                <span>Get Free Consultation</span>
                            </Link>

                            {/* Contact Info */}
                            <div className="mt-10 pt-8 border-t border-white/20">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                                    <div className="flex items-center justify-center gap-3">
                                        <Phone className="w-5 h-5 text-white/80" />
                                        <div className="text-left">
                                            <p className="text-sm text-white/70">Call Us</p>
                                            <p className="font-bold">+91 99588 00961</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <Mail className="w-5 h-5 text-white/80" />
                                        <div className="text-left">
                                            <p className="text-sm text-white/70">Email Us</p>
                                            <p className="font-bold">care@panaceamedcare.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <Clock className="w-5 h-5 text-white/80" />
                                        <div className="text-left">
                                            <p className="text-sm text-white/70">Availability</p>
                                            <p className="font-bold">24/7 Support</p>
                                        </div>
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
