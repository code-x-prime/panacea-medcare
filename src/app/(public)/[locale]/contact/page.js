"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import { FaWhatsapp, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage({ params }) {
    const { locale } = params;
    const t = useTranslations("contact");
    const tCTA = useTranslations("contactCTA");
    const isRTL = locale === "ar";

    const phoneNumber = "+91-9958800961";
    const whatsappNumber = "919958800961";
    const email = "care@panaceamedcare.com";
    const whatsappMessage = encodeURIComponent(
        tCTA("whatsappMessage") || "Hello, I need medical assistance from Panacea Medcare"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="contact"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading")}
                    </h2>
                    <p className={`text-lg text-gray-700 mb-12 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro")}
                    </p>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <form className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.name")}
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.email")}
                                    </label>
                                    <input
                                        type="email"
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.phone")}
                                    </label>
                                    <input
                                        type="tel"
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.country")}
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.treatment")}
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                        {t("form.message")}
                                    </label>
                                    <textarea
                                        rows={5}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-panacea-primary focus:border-transparent ${isRTL ? "text-right" : "text-left"}`}
                                        dir={isRTL ? "rtl" : "ltr"}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-panacea-accent hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                                >
                                    {t("form.submit")}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Phone Card */}
                            <a
                                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaPhone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("phoneLabel") || "Call Us Now"}</h3>
                                        <p className="text-lg font-semibold text-gray-700 mb-1" dir="ltr">{phoneNumber}</p>
                                        <p className="text-sm text-gray-600">{tCTA("phoneSubtext") || "24/7 Available"}</p>
                                    </div>
                                </div>
                            </a>

                            {/* WhatsApp Card */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-green-50 border-2 border-green-200 p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaWhatsapp className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-green-700 mb-1">{tCTA("whatsappLabel") || "WhatsApp Us"}</h3>
                                        <p className="text-sm text-green-600 mb-1">{tCTA("whatsappSubtext") || "Instant Response"}</p>
                                        <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold mt-2">
                                            {tCTA("whatsappBadge") || "Click to Chat"}
                                        </span>
                                    </div>
                                </div>
                            </a>

                            {/* Email Card */}
                            <a
                                href={`mailto:${email}`}
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaEnvelope className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("emailLabel") || "Email Us"}</h3>
                                        <p className="text-sm font-semibold text-gray-700 mb-1 break-all" dir="ltr">{email}</p>
                                        <p className="text-sm text-gray-600">{tCTA("emailSubtext") || "We'll respond quickly"}</p>
                                    </div>
                                </div>
                            </a>

                            {/* Teleconsultation Card */}
                            <Link
                                href={`/${locale}/services/teleconsultation`}
                                className={`bg-panacea-light p-6 rounded-lg hover:shadow-lg transition-all group ${isRTL ? "text-right" : "text-left"}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <FaClock className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-panacea-primary mb-1">{tCTA("teleconsultLabel") || "Free Teleconsultation"}</h3>
                                        <p className="text-sm font-semibold text-panacea-accent mb-1">{tCTA("teleconsultSubtext") || "Book Today"}</p>
                                        <p className="text-sm text-gray-600">{tCTA("teleconsultDesc") || "Expert doctors available"}</p>
                                    </div>
                                </div>
                            </Link>

                            {/* Urgency Banner */}
                            <div className="bg-panacea-gradient p-6 rounded-lg text-white">
                                <h3 className="text-xl font-bold mb-2">{tCTA("urgencyTitle") || "Get a Free Teleconsultation Today!"}</h3>
                                <p className="text-white/90 mb-4">{tCTA("urgencyDesc") || "Don't wait - speak with our medical experts now and get personalized treatment recommendations."}</p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                        <span>{tCTA("whatsappButton") || "WhatsApp Now"}</span>
                                    </a>
                                    <a
                                        href={`tel:${phoneNumber.replace(/-/g, "")}`}
                                        className="px-6 py-2 bg-white hover:bg-gray-100 text-panacea-primary rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                                    >
                                        <FaPhone className="w-5 h-5" />
                                        <span>{tCTA("callButton") || "Call Now"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
