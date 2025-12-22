"use client";

import TopBanner from "@/components/TopBanner";
import { notFound } from "next/navigation";
import equipment from "@/data/equipment.json";

export default function EquipmentDetailPage({ params }) {
    const { locale, id } = params;
    const isRTL = locale === "ar";

    const item = equipment.find(e => e.id === id);

    if (!item) {
        notFound();
    }

    const name = locale === "ar" ? item.nameAr : locale === "fr" ? item.nameFr : item.name;
    const category = locale === "ar" ? item.categoryAr : locale === "fr" ? item.categoryFr : item.category;
    const description = locale === "ar" ? item.descriptionAr : locale === "fr" ? item.descriptionFr : item.description;
    const specs = locale === "ar" ? item.specificationsAr : locale === "fr" ? item.specificationsFr : item.specifications;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={name}
                subtitle={category}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <span className="inline-block bg-panacea-accent text-white px-4 py-2 rounded-full mb-4">
                                {category}
                            </span>
                            <h2 className="text-3xl font-bold text-panacea-primary mb-4">{name}</h2>
                            <p className="text-gray-700 leading-relaxed">{description}</p>
                        </div>

                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "المواصفات" : locale === "fr" ? "Spécifications" : "Specifications"}
                            </h3>
                            <div className="bg-panacea-light p-6 rounded-lg space-y-3">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b border-gray-300 pb-2">
                                        <span className="font-semibold text-panacea-primary capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>
                                        <span className="text-gray-700">
                                            {Array.isArray(value) ? value.join(", ") : value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "الشركة المصنعة" : locale === "fr" ? "Fabricant" : "Manufacturer"}
                            </h3>
                            <p className="text-gray-700">{item.manufacturer}</p>
                        </div>

                        <div className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-xl font-bold text-panacea-primary mb-2">
                                {locale === "ar" ? "التوفر" : locale === "fr" ? "Disponibilité" : "Availability"}
                            </h3>
                            <p className="text-gray-700">{item.availability}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
