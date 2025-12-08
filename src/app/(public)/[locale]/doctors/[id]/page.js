"use client";

import PageHero from "@/components/PageHero";
import { notFound } from "next/navigation";
import doctors from "@/data/doctors.json";

export default function DoctorDetailPage({ params }) {
    const { locale, id } = params;
    const isRTL = locale === "ar";

    const doctor = doctors.find(d => d.id === id);

    if (!doctor) {
        notFound();
    }

    const name = locale === "ar" ? doctor.nameAr : locale === "fr" ? doctor.nameFr : doctor.name;
    const specialty = locale === "ar" ? doctor.specialtyAr : locale === "fr" ? doctor.specialtyFr : doctor.specialty;
    const qualification = locale === "ar" ? doctor.qualificationAr : locale === "fr" ? doctor.qualificationFr : doctor.qualification;
    const experience = locale === "ar" ? doctor.experienceAr : locale === "fr" ? doctor.experienceFr : doctor.experience;
    const bio = locale === "ar" ? doctor.bioAr : locale === "fr" ? doctor.bioFr : doctor.bio;
    const hospital = locale === "ar" ? doctor.hospitalAr : locale === "fr" ? doctor.hospitalFr : doctor.hospital;
    const languages = locale === "ar" ? doctor.languagesAr : locale === "fr" ? doctor.languagesFr : doctor.languages;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={name}
                subtitle={specialty}
                backgroundImage={doctor.image}
                fallbackImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <h2 className="text-3xl font-bold text-panacea-primary mb-4">{name}</h2>
                            <p className="text-xl text-panacea-accent mb-2">{specialty}</p>
                            <p className="text-gray-600 mb-1">{qualification}</p>
                            <p className="text-gray-700 font-semibold">{experience}</p>
                        </div>

                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "نبذة عن الطبيب" : locale === "fr" ? "À propos" : "About"}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{bio}</p>
                        </div>

                        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "المستشفى" : locale === "fr" ? "Hôpital" : "Hospital"}
                            </h3>
                            <p className="text-gray-700">{hospital}</p>
                        </div>

                        <div className={isRTL ? "text-right" : "text-left"}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-4">
                                {locale === "ar" ? "اللغات" : locale === "fr" ? "Langues" : "Languages"}
                            </h3>
                            <div className={`flex ${isRTL ? "flex-row-reverse justify-end" : ""} gap-2 flex-wrap`}>
                                {languages.map((lang, index) => (
                                    <span key={index} className="bg-panacea-light text-panacea-primary px-4 py-2 rounded-full">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
