"use client";

import PageHero from "@/components/PageHero";
import Link from "next/link";
import equipment from "@/data/equipment.json";

export default function EquipmentPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={locale === "ar" ? "المعدات الطبية" : locale === "fr" ? "Équipement médical" : "Medical Equipment"}
                subtitle={locale === "ar" ? "أحدث التقنيات الطبية المتاحة" : locale === "fr" ? "Technologies médicales de pointe disponibles" : "State-of-the-art medical technology available"}
                backgroundImage="/images/equipment-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {equipment.map((item) => {
                        const name = locale === "ar" ? item.nameAr : locale === "fr" ? item.nameFr : item.name;
                        const category = locale === "ar" ? item.categoryAr : locale === "fr" ? item.categoryFr : item.category;
                        const description = locale === "ar" ? item.descriptionAr : locale === "fr" ? item.descriptionFr : item.description;

                        return (
                            <Link
                                key={item.id}
                                href={`/${locale}/equipment/${item.id}`}
                                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-panacea-primary"
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-panacea-dark/90 to-transparent flex items-end p-6">
                                        <div className={isRTL ? "text-right w-full" : "text-left w-full"}>
                                            <span className="inline-block bg-panacea-accent text-white text-xs px-3 py-1 rounded-full mb-2">
                                                {category}
                                            </span>
                                            <h3 className="text-xl font-bold text-white">{name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    <p className="text-gray-700 line-clamp-3">{description}</p>
                                    <p className="text-sm text-gray-500 mt-4">{item.manufacturer}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
