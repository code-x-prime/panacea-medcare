"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Camera, Utensils, Hotel } from "lucide-react";

export default function DestinationPage({ params }) {
    const { locale, destination } = params;
    const t = useTranslations("tourismLeisure");
    const isRTL = locale === "ar";

    const destinations = {
        agra: {
            title: locale === "ar" ? "أجرا - موطن تاج محل الشهير" : locale === "fr" ? "Agra - Maison du célèbre Taj Mahal" : "Agra - Home of the iconic Taj Mahal",
            description: locale === "ar" ? "استكشف جمال تاج محل، أحد عجائب الدنيا السبع، واستمتع بالتراث الثقافي الغني لأجرا." : locale === "fr" ? "Explorez la beauté du Taj Mahal, l'une des sept merveilles du monde, et profitez du riche patrimoine culturel d'Agra." : "Explore the beauty of the Taj Mahal, one of the Seven Wonders of the World, and enjoy the rich cultural heritage of Agra.",
            highlights: locale === "ar" ? ["تاج محل", "قلعة أجرا", "فاتحبور سيكري", "جولات ثقافية"] : locale === "fr" ? ["Taj Mahal", "Fort d'Agra", "Fatehpur Sikri", "Visites culturelles"] : ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Cultural Tours"],
            image: "/agra.jpg"
        },
        kerala: {
            title: locale === "ar" ? "كيرالا - الممرات المائية والرفاهية الأيورفيدية" : locale === "fr" ? "Kerala - Backwaters et bien-être ayurvédique" : "Kerala - Backwaters and Ayurvedic wellness",
            description: locale === "ar" ? "استرخ في الممرات المائية الهادئة واستمتع بعلاجات الأيورفيدا التقليدية في ولاية كيرالا الخضراء." : locale === "fr" ? "Détendez-vous dans les backwaters paisibles et profitez des traitements ayurvédiques traditionnels dans le Kerala verdoyant." : "Relax in the serene backwaters and enjoy traditional Ayurvedic treatments in the lush state of Kerala.",
            highlights: locale === "ar" ? ["الممرات المائية", "علاجات الأيورفيدا", "الشواطئ", "الطبيعة الخضراء"] : locale === "fr" ? ["Backwaters", "Traitements ayurvédiques", "Plages", "Nature luxuriante"] : ["Backwaters", "Ayurvedic Treatments", "Beaches", "Lush Nature"],
            image: "/kerala.jpg"
        },
        goa: {
            title: locale === "ar" ? "غوا - الشواطئ الجميلة والتراث البرتغالي" : locale === "fr" ? "Goa - Belles plages et patrimoine portugais" : "Goa - Beautiful beaches and Portuguese heritage",
            description: locale === "ar" ? "استمتع بالشواطئ الذهبية والهندسة المعمارية البرتغالية الفريدة في غوا." : locale === "fr" ? "Profitez des plages dorées et de l'architecture portugaise unique à Goa." : "Enjoy the golden beaches and unique Portuguese architecture in Goa.",
            highlights: locale === "ar" ? ["الشواطئ", "التراث البرتغالي", "المأكولات البحرية", "الحياة الليلية"] : locale === "fr" ? ["Plages", "Patrimoine portugais", "Fruits de mer", "Vie nocturne"] : ["Beaches", "Portuguese Heritage", "Seafood", "Nightlife"],
            image: "/goa.jpg"
        },
        rajasthan: {
            title: locale === "ar" ? "راجستان - القصور الملكية وتجارب الصحراء" : locale === "fr" ? "Rajasthan - Palais royaux et expériences désertiques" : "Rajasthan - Royal palaces and desert experiences",
            description: locale === "ar" ? "اكتشف القصور الملكية الفخمة وتجارب الصحراء السحرية في راجستان." : locale === "fr" ? "Découvrez les palais royaux majestueux et les expériences désertiques magiques au Rajasthan." : "Discover the majestic royal palaces and magical desert experiences in Rajasthan.",
            highlights: locale === "ar" ? ["القصور الملكية", "تجارب الصحراء", "الثقافة الملكية", "المهرجانات"] : locale === "fr" ? ["Palais royaux", "Expériences désertiques", "Culture royale", "Festivals"] : ["Royal Palaces", "Desert Experiences", "Royal Culture", "Festivals"],
            image: "/rajasthan.jpg"
        }
    };

    const dest = destinations[destination] || destinations.agra;

    const breadcrumbItems = [
        { label: t("breadcrumb.home") || "Home", href: `/${locale}` },
        { label: t("breadcrumb.tourism") || "Tourism & Leisure", href: `/${locale}/tourism-leisure` },
        { label: dest.title.split(" - ")[0], href: `/${locale}/tourism-leisure/${destination}` }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="tourismLeisure"
                title={dest.title}
                subtitle={dest.description}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Back Button */}
                <Link
                    href={`/${locale}/tourism-leisure`}
                    className={`inline-flex items-center gap-2 text-panacea-primary hover:text-panacea-secondary mb-8 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                >
                    <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                    <span className="font-semibold">{locale === "ar" ? "العودة إلى السياحة والترفيه" : locale === "fr" ? "Retour au Tourisme et Loisirs" : "Back to Tourism & Leisure"}</span>
                </Link>

                {/* Hero Image */}
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-panacea-lg mb-12">
                    <Image
                        src={dest.image}
                        alt={dest.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = 'linear-gradient(135deg, #066F89 0%, #066F89 100%)';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{dest.title}</h1>
                        <p className="text-xl text-white/90 max-w-3xl">{dest.description}</p>
                    </div>
                </div>

                {/* Highlights Section */}
                <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center`}>
                        {locale === "ar" ? "أبرز المعالم" : locale === "fr" ? "Points Forts" : "Highlights"}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dest.highlights.map((highlight, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={`/destinations/${destination}/highlight-${idx + 1}.jpg`}
                                        alt={highlight}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.background = `linear-gradient(135deg, ${['#066F89', '#0BA35A', '#FF6B35', '#8B5CF6'][idx % 4]} 0%, ${['#0BA35A', '#FF6B35', '#8B5CF6', '#066F89'][idx % 4]} 100%)`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>
                                {/* Content */}
                                <div className="p-4 bg-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-5 h-5 text-panacea-primary flex-shrink-0" />
                                        <h3 className="text-lg font-bold text-panacea-primary">{highlight}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all">
                        <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-lg flex items-center justify-center mb-4">
                            <Camera className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-2">
                            {locale === "ar" ? "جولات سياحية" : locale === "fr" ? "Visites Touristiques" : "Sightseeing Tours"}
                        </h3>
                        <p className="text-gray-700">
                            {locale === "ar" ? "استمتع بجولات منظمة لاستكشاف أفضل ما في الوجهة." : locale === "fr" ? "Profitez de visites organisées pour explorer le meilleur de la destination." : "Enjoy organized tours to explore the best of the destination."}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all">
                        <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-lg flex items-center justify-center mb-4">
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-2">
                            {locale === "ar" ? "المأكولات المحلية" : locale === "fr" ? "Cuisine Locale" : "Local Cuisine"}
                        </h3>
                        <p className="text-gray-700">
                            {locale === "ar" ? "تذوق الأطباق التقليدية اللذيذة." : locale === "fr" ? "Dégustez des plats traditionnels délicieux." : "Savor delicious traditional dishes."}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-panacea p-6 hover:shadow-panacea-lg transition-all">
                        <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-lg flex items-center justify-center mb-4">
                            <Hotel className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-panacea-primary mb-2">
                            {locale === "ar" ? "الإقامة" : locale === "fr" ? "Hébergement" : "Accommodation"}
                        </h3>
                        <p className="text-gray-700">
                            {locale === "ar" ? "إقامة مريحة في أفضل الفنادق." : locale === "fr" ? "Séjour confortable dans les meilleurs hôtels." : "Comfortable stay in the best hotels."}
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary rounded-3xl p-8 md:p-12 text-white shadow-panacea-lg text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {locale === "ar" ? "ابدأ رحلتك اليوم" : locale === "fr" ? "Commencez Votre Voyage Aujourd'hui" : "Start Your Journey Today"}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {locale === "ar" ? "اتصل بنا لترتيب رحلة سياحية مخصصة مع علاجك الطبي." : locale === "fr" ? "Contactez-nous pour organiser un voyage touristique personnalisé avec votre traitement médical." : "Contact us to arrange a customized tourist trip with your medical treatment."}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href={`/${locale}/contact`}
                            className="bg-white text-panacea-primary font-semibold px-8 py-4 rounded-lg hover:bg-panacea-light transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {locale === "ar" ? "اتصل بنا" : locale === "fr" ? "Contactez-nous" : "Contact Us"}
                        </Link>
                        <Link
                            href={`/${locale}/tourism-leisure`}
                            className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
                        >
                            {locale === "ar" ? "استكشف المزيد" : locale === "fr" ? "Explorer Plus" : "Explore More"}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
