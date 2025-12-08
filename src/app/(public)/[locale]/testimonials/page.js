"use client";

import PageHero from "@/components/PageHero";
import Link from "next/link";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={locale === "ar" ? "آراء المرضى" : locale === "fr" ? "Témoignages" : "Patient Testimonials"}
                subtitle={locale === "ar" ? "اقرأ قصص نجاح مرضانا" : locale === "fr" ? "Lisez les histoires de réussite de nos patients" : "Read our patients' success stories"}
                backgroundImage="/images/testimonials-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => {
                        const name = locale === "ar" ? testimonial.nameAr : locale === "fr" ? testimonial.nameFr : testimonial.name;
                        const content = locale === "ar" ? testimonial.contentAr : locale === "fr" ? testimonial.contentFr : testimonial.content;
                        const treatment = locale === "ar" ? testimonial.treatmentAr : locale === "fr" ? testimonial.treatmentFr : testimonial.treatment;
                        const country = locale === "ar" ? testimonial.countryAr : locale === "fr" ? testimonial.countryFr : testimonial.country;

                        return (
                            <Link
                                key={testimonial.id}
                                href={`/${locale}/testimonials/${testimonial.id}`}
                                className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-panacea-primary"
                            >
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className={`text-gray-700 mb-4 line-clamp-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    &ldquo;{content}&rdquo;
                                </p>
                                <div className={`border-t pt-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    <p className="font-bold text-panacea-primary">{name}</p>
                                    <p className="text-sm text-gray-600">{treatment}</p>
                                    <p className="text-sm text-gray-500">{country}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
