"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";

export default function ContactPage({ params }) {
    const { locale } = params;
    const t = useTranslations("contact");
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="contact"
                backgroundImage="/images/contact-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop"
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
                        <div className="space-y-8">
                            <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl font-bold text-panacea-primary mb-2">{t("info.email")}</h3>
                                <p className="text-gray-700" dir="ltr">{t("info.emailValue")}</p>
                            </div>

                            <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl font-bold text-panacea-primary mb-2">{t("info.phone")}</h3>
                                <p className="text-gray-700" dir="ltr">{t("info.phoneValue")}</p>
                            </div>

                            <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl font-bold text-panacea-primary mb-2">{t("info.whatsapp")}</h3>
                                <p className="text-gray-700" dir="ltr">{t("info.whatsappValue")}</p>
                            </div>

                            <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl font-bold text-panacea-primary mb-2">{t("info.address")}</h3>
                                <p className="text-gray-700">{t("info.addressValue")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
