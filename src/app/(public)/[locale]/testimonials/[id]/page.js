"use client";

import PageHero from "@/components/PageHero";
import { notFound } from "next/navigation";
import testimonials from "@/data/testimonials.json";

export default function TestimonialDetailPage({ params }) {
    const { locale, id } = params;
    const isRTL = locale === "ar";

    const testimonial = testimonials.find(t => t.id === id);

    if (!testimonial) {
        notFound();
    }

    const name = locale === "ar" ? testimonial.nameAr : locale === "fr" ? testimonial.nameFr : testimonial.name;
    const content = locale === "ar" ? testimonial.contentAr : locale === "fr" ? testimonial.contentFr : testimonial.content;
    const treatment = locale === "ar" ? testimonial.treatmentAr : locale === "fr" ? testimonial.treatmentFr : testimonial.treatment;
    const country = locale === "ar" ? testimonial.countryAr : locale === "fr" ? testimonial.countryFr : testimonial.country;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={name}
                subtitle={treatment}
                backgroundImage={testimonial.image}
                fallbackImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-2xl">★</span>
                            ))}
                        </div>

                        <blockquote className={`text-xl text-gray-700 leading-relaxed mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            &ldquo;{content}&rdquo;
                        </blockquote>

                        <div className={`border-t pt-6 ${isRTL ? "text-right" : "text-left"}`}>
                            <p className="text-2xl font-bold text-panacea-primary mb-2">{name}</p>
                            <p className="text-lg text-gray-700 mb-1">{treatment}</p>
                            <p className="text-gray-600">{country}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                {new Date(testimonial.date).toLocaleDateString(locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
