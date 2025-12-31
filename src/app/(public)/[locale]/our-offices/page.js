"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export default function OurOfficesPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("ourOffices");

    // Head Office
    const headOffice = {
        name: locale === "ar" ? "المكتب الرئيسي" : locale === "fr" ? "Bureau Principal" : "Head Office",
        address: [
            "Suite No. 402, Plot No. 996,",
            "Sector 38, Gurgaon – 122001",
            "Delhi NCR, India"
        ],
        contact: "",
        phone: "+91-9958800961",
        email: "care@panaceamedcare.com"
    };

    // Patient Assistance Centres
    const assistanceCentres = [
        {
            country: locale === "ar" ? "نيجيريا" : locale === "fr" ? "Nigéria" : "Nigeria",
            flag: "🇳🇬",
            offices: [
                {
                    city: locale === "ar" ? "أبوجا" : locale === "fr" ? "Abuja" : "Abuja",
                    address: [
                        "No. 17, Benghazi Street, Wuse Zone 4,",
                        "Abuja, FCT"
                    ]
                },
                {
                    city: locale === "ar" ? "لاغوس" : locale === "fr" ? "Lagos" : "Lagos",
                    address: [
                        "311A, Kola Opere Street,",
                        "Buknor Estate, Isolo,",
                        "Lagos, Nigeria"
                    ]
                },
                {
                    city: locale === "ar" ? "كانو" : locale === "fr" ? "Kano" : "Kano",
                    address: [
                        "Room No. 15, Block B.",
                        "Amino Kano Teaching Hospital",
                        "Kano"
                    ]
                }
            ]
        },
        {
            country: locale === "ar" ? "كينيا" : locale === "fr" ? "Kenya" : "Kenya",
            flag: "🇰🇪",
            offices: [
                {
                    city: locale === "ar" ? "نيروبي" : locale === "fr" ? "Nairobi" : "Nairobi",
                    address: [
                        "Mayfair Office Suites,",
                        "Parklands Road,",
                        "Nairobi, Kenya"
                    ]
                }
            ]
        },
        {
            country: locale === "ar" ? "إثيوبيا" : locale === "fr" ? "Éthiopie" : "Ethiopia",
            flag: "🇪🇹",
            offices: [
                {
                    city: locale === "ar" ? "دبر ماركوس" : locale === "fr" ? "Debre Markos" : "Debre Markos",
                    address: [
                        "East Gojjam District",
                        "Addis Ababa, Ethiopia"
                    ]
                }
            ]
        }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="ourOffices"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Head Office Section */}
                <div className="mb-16">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-4">
                            {locale === "ar" ? "المكتب الرئيسي" : locale === "fr" ? "Bureau Principal" : "Head Office"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {locale === "ar" ? "باناسيا ميدكير تعمل من مكتبها الرئيسي في جورجاون - مركز الأعمال في دلهي NCR" : locale === "fr" ? "Panacea Medcare opère depuis son bureau principal à Gurgaon - le centre d'affaires de Delhi NCR" : "Panacea Medcare operates from its Head office at Gurgaon – the business hub of Delhi NCR"}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-2xl p-8 md:p-12 text-white shadow-panacea-lg">
                            <div className={`flex items-start gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6">{headOffice.name}</h3>
                                    <div className="space-y-3 mb-6">
                                        {headOffice.address.map((line, idx) => (
                                            <p key={idx} className="text-white/90 leading-relaxed">{line}</p>
                                        ))}
                                    </div>
                                    <div className="space-y-3 pt-6 border-t border-white/20">
                                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <Phone className="w-5 h-5 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold">{headOffice.contact}</p>
                                                <a href={`tel:${headOffice.phone.replace(/-/g, "")}`} className="hover:underline">
                                                    {headOffice.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                            <Mail className="w-5 h-5 flex-shrink-0" />
                                            <a href={`mailto:${headOffice.email}`} className="break-all hover:underline">
                                                {headOffice.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Assistance Centres Section */}
                <div className="mb-12">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-panacea-primary mb-4">
                            {locale === "ar" ? "مراكز مساعدة المرضى" : locale === "fr" ? "Centres d'Assistance aux Patients" : "Panacea Patient Assistance Centres"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {locale === "ar" ? "مراكزنا في جميع أنحاء العالم" : locale === "fr" ? "Nos centres à travers le monde" : "Our assistance centres across the globe"}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {assistanceCentres.map((country, countryIdx) => (
                            <div key={countryIdx} className="bg-white rounded-2xl shadow-panacea-lg border border-gray-100 overflow-hidden">
                                {/* Country Header */}
                                <div className="bg-gradient-to-r from-panacea-primary to-panacea-secondary p-6">
                                    <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <span className="text-4xl">{country.flag}</span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                                            {country.country}
                                        </h3>
                                    </div>
                                </div>

                                {/* Offices Grid */}
                                <div className="p-6 md:p-8">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {country.offices.map((office, officeIdx) => (
                                            <div
                                                key={officeIdx}
                                                className="bg-panacea-light/30 rounded-xl p-6 border border-panacea-primary/10 hover:shadow-md transition-all"
                                            >
                                                <div className={`flex items-start gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                                    <div className="w-12 h-12 bg-panacea-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <MapPin className="w-6 h-6 text-white" />
                                                    </div>
                                                    <h4 className="text-xl font-bold text-panacea-primary">
                                                        {office.city}
                                                    </h4>
                                                </div>
                                                <div className={`space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                                                    {office.address.map((line, lineIdx) => (
                                                        <p key={lineIdx} className="text-gray-700 text-sm leading-relaxed">
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

