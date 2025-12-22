"use client";

import TopBanner from "@/components/TopBanner";
import Breadcrumb from "@/components/Breadcrumb";
import { Award, CheckCircle } from "lucide-react";

export default function HospitalsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const breadcrumbItems = [
        { label: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
        { label: locale === "ar" ? "المستشفيات" : locale === "fr" ? "Hôpitaux" : "Hospitals", href: `/${locale}/hospitals` }
    ];

    const content = {
        en: {
            title: "Our Partner Hospitals",
            subtitle: "JCI-Accredited World-Class Healthcare Facilities",
            heading: "Network of Top Hospitals",
            intro: "We partner with JCI-accredited and internationally recognized hospitals across India, ensuring you receive the highest quality medical care.",
            jciBadge: "JCI Accredited",
            hospitals: [
                { name: "Apollo Hospital, New Delhi", specialty: "Multi-specialty", accreditation: "JCI Accredited", isJCI: true },
                { name: "Fortis Memorial Research Institute", specialty: "Multi-specialty", accreditation: "JCI & NABH Accredited", isJCI: true },
                { name: "Max Super Speciality Hospital", specialty: "Multi-specialty", accreditation: "NABH Accredited", isJCI: false },
                { name: "Medanta - The Medicity", specialty: "Multi-specialty", accreditation: "JCI & NABH Accredited", isJCI: true }
            ]
        },
        ar: {
            title: "مستشفياتنا الشريكة",
            subtitle: "مرافق رعاية صحية عالمية المستوى معتمدة من JCI",
            heading: "شبكة من أفضل المستشفيات",
            intro: "نتعاون مع مستشفيات معتمدة من JCI ومعترف بها دوليًا في جميع أنحاء الهند، مما يضمن حصولك على أعلى جودة من الرعاية الطبية.",
            jciBadge: "معتمد من JCI",
            hospitals: [
                { name: "مستشفى أبولو، نيودلهي", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI", isJCI: true },
                { name: "معهد فورتيس التذكاري للأبحاث", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI و NABH", isJCI: true },
                { name: "مستشفى ماكس سوبر التخصصي", specialty: "متعدد التخصصات", accreditation: "معتمد من NABH", isJCI: false },
                { name: "ميدانتا - المدينة الطبية", specialty: "متعدد التخصصات", accreditation: "معتمد من JCI و NABH", isJCI: true }
            ]
        },
        fr: {
            title: "Nos hôpitaux partenaires",
            subtitle: "Établissements de santé de classe mondiale accrédités JCI",
            heading: "Réseau d'hôpitaux de premier plan",
            intro: "Nous nous associons avec des hôpitaux accrédités JCI et reconnus internationalement à travers l'Inde, garantissant que vous recevez des soins médicaux de la plus haute qualité.",
            jciBadge: "Accrédité JCI",
            hospitals: [
                { name: "Hôpital Apollo, New Delhi", specialty: "Multi-spécialités", accreditation: "Accrédité JCI", isJCI: true },
                { name: "Institut de recherche Fortis Memorial", specialty: "Multi-spécialités", accreditation: "Accrédité JCI et NABH", isJCI: true },
                { name: "Hôpital Max Super Speciality", specialty: "Multi-spécialités", accreditation: "Accrédité NABH", isJCI: false },
                { name: "Medanta - The Medicity", specialty: "Multi-spécialités", accreditation: "Accrédité JCI et NABH", isJCI: true }
            ]
        }
    };

    const t = content[locale] || content.en;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={t.title}
                subtitle={t.subtitle}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} locale={locale} />
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* JCI Accreditation Highlight */}
                <div className={`bg-panacea-gradient rounded-xl p-8 mb-16 text-white ${isRTL ? "text-right" : "text-left"}`}>
                    <div className="flex items-center gap-4 mb-4">
                        <Award className="w-10 h-10 text-white" />
                        <h3 className="text-2xl md:text-3xl font-bold">{t.jciBadge}</h3>
                    </div>
                    <p className="text-lg text-white/90 max-w-3xl">
                        {t.intro}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.heading}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {t.hospitals.map((hospital, index) => (
                        <div key={index} className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 ${hospital.isJCI ? "border-panacea-primary" : "border-gray-200"} ${isRTL ? "text-right" : "text-left"}`}>
                            {hospital.isJCI && (
                                <div className={`mb-4 ${isRTL ? "text-left" : "text-right"}`}>
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-panacea-primary/10 text-panacea-primary rounded-full text-sm font-bold">
                                        <CheckCircle className="w-4 h-4" />
                                        JCI Accredited
                                    </span>
                                </div>
                            )}
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
