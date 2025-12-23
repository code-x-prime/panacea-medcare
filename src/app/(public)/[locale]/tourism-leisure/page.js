"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

export default function TourismLeisurePage({ params }) {
    const { locale } = params;
    const t = useTranslations("tourismLeisure");
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.tourism") || "Tourism & Leisure", href: `/${locale}/tourism-leisure` }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="tourismLeisure"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t("heading") || "Tourism & Leisure"}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t("intro") || "Combine your medical treatment with an unforgettable travel experience in India. Explore our tourism packages designed for medical tourists."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🏛️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.historical") || "Historical Tours"}</h3>
                        <p className="text-gray-600">{t("packages.historicalDesc") || "Explore India's rich history and cultural heritage."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🏖️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.beach") || "Beach Destinations"}</h3>
                        <p className="text-gray-600">{t("packages.beachDesc") || "Relax at beautiful beaches during your recovery."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🏔️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.hill") || "Hill Stations"}</h3>
                        <p className="text-gray-600">{t("packages.hillDesc") || "Visit serene hill stations for a peaceful recovery."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🛍️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.shopping") || "Shopping Tours"}</h3>
                        <p className="text-gray-600">{t("packages.shoppingDesc") || "Enjoy shopping at India's famous markets."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🍽️</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.cuisine") || "Culinary Tours"}</h3>
                        <p className="text-gray-600">{t("packages.cuisineDesc") || "Experience India's diverse and delicious cuisine."}</p>
                    </div>

                    <div className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="w-16 h-16 bg-panacea-light rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">🧘</span>
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-3">{t("packages.wellness") || "Wellness Retreats"}</h3>
                        <p className="text-gray-600">{t("packages.wellnessDesc") || "Rejuvenate with yoga and wellness programs."}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}


