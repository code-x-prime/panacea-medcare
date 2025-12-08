"use client";

import PageHero from "@/components/PageHero";

export default function HospitalsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Our Partner Hospitals",
            subtitle: "World-class healthcare facilities",
            heading: "Network of Top Hospitals",
            intro: "We partner with JCI-accredited and internationally recognized hospitals across India, ensuring you receive the highest quality medical care.",
            hospitals: [
                { name: "Apollo Hospital, New Delhi", specialty: "Multi-specialty", accreditation: "JCI Accredited" },
                { name: "Fortis Memorial Research Institute", specialty: "Multi-specialty", accreditation: "JCI & NABH Accredited" },
                { name: "Max Super Speciality Hospital", specialty: "Multi-specialty", accreditation: "NABH Accredited" },
                { name: "Medanta - The Medicity", specialty: "Multi-specialty", accreditation: "JCI & NABH Accredited" }
            ]
        },
        ar: {
            title: "مستشفياتنا الشريكة",
            subtitle: "مرافق رعاية صحية عالمية المستوى",
            heading: "شبكة من أفضل المستشفيات",
            intro: "نتعاون مع مستشفيات معتمدة من JCI ومعترف بها دوليًا في جميع أنحاء الهند، مما يضمن حصولك على أعلى جودة من الرعاية الطبية.",
            hospitals: [
                { name: "مستشفى أبولو، نيودلهي", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI" },
                { name: "معهد فورتيس التذكاري للأبحاث", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI و NABH" },
                { name: "مستشفى ماكس سوبر التخصصي", specialty: "متعدد التخصصات", accreditation: "معتمد من NABH" },
                { name: "ميدانتا - المدينة الطبية", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI و NABH" }
            ]
        },
        fr: {
            title: "Nos hôpitaux partenaires",
            subtitle: "Établissements de santé de classe mondiale",
            heading: "Réseau d'hôpitaux de premier plan",
            intro: "Nous nous associons avec des hôpitaux accrédités JCI et reconnus internationalement à travers l'Inde, garantissant que vous recevez des soins médicaux de la plus haute qualité.",
            hospitals: [
                { name: "Hôpital Apollo, New Delhi", specialty: "Multi-spécialités", accreditation: "Accrédité JCI" },
                { name: "Institut de recherche Fortis Memorial", specialty: "Multi-spécialités", accreditation: "Accrédité JCI et NABH" },
                { name: "Hôpital Max Super Speciality", specialty: "Multi-spécialités", accreditation: "Accrédité NABH" },
                { name: "Medanta - The Medicity", specialty: "Multi-spécialités", accreditation: "Accrédité JCI et NABH" }
            ]
        }
    };

    const t = content[locale] || content.en;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={t.title}
                subtitle={t.subtitle}
                backgroundImage="/images/hospitals-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.heading}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t.intro}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {t.hospitals.map((hospital, index) => (
                        <div key={index} className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${isRTL ? "text-right" : "text-left"}`}>
                            <h3 className="text-2xl font-bold text-panacea-primary mb-3">{hospital.name}</h3>
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold text-panacea-accent">
                                    {locale === "ar" ? "التخصص: " : locale === "fr" ? "Spécialité: " : "Specialty: "}
                                </span>
                                {hospital.specialty}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">
                                    {locale === "ar" ? "الاعتماد: " : locale === "fr" ? "Accréditation: " : "Accreditation: "}
                                </span>
                                {hospital.accreditation}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
