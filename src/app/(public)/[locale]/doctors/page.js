"use client";

import PageHero from "@/components/PageHero";
import Link from "next/link";
import doctors from "@/data/doctors.json";

export default function DoctorsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={locale === "ar" ? "أطباؤنا" : locale === "fr" ? "Nos médecins" : "Our Doctors"}
                subtitle={locale === "ar" ? "تعرف على فريقنا من المتخصصين الطبيين ذوي الخبرة" : locale === "fr" ? "Rencontrez notre équipe de professionnels médicaux expérimentés" : "Meet our team of experienced medical professionals"}
                backgroundImage="/images/doctors-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor) => {
                        const name = locale === "ar" ? doctor.nameAr : locale === "fr" ? doctor.nameFr : doctor.name;
                        const specialty = locale === "ar" ? doctor.specialtyAr : locale === "fr" ? doctor.specialtyFr : doctor.specialty;
                        const qualification = locale === "ar" ? doctor.qualificationAr : locale === "fr" ? doctor.qualificationFr : doctor.qualification;
                        const experience = locale === "ar" ? doctor.experienceAr : locale === "fr" ? doctor.experienceFr : doctor.experience;
                        const hospital = locale === "ar" ? doctor.hospitalAr : locale === "fr" ? doctor.hospitalFr : doctor.hospital;

                        return (
                            <Link
                                key={doctor.id}
                                href={`/${locale}/doctors/${doctor.id}`}
                                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-panacea-primary"
                            >
                                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-panacea-primary/80 to-transparent flex items-end p-6">
                                        <div className={isRTL ? "text-right w-full" : "text-left w-full"}>
                                            <h3 className="text-2xl font-bold text-white">{name}</h3>
                                            <p className="text-white/90">{specialty}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    <p className="text-sm text-gray-600 mb-2">{qualification}</p>
                                    <p className="text-sm font-semibold text-panacea-accent mb-2">{experience}</p>
                                    <p className="text-sm text-gray-700">{hospital}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
