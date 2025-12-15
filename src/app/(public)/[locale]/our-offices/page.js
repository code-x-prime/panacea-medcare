"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function OurOfficesPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("ourOffices");

    const offices = [
        {
            id: "gurgaon",
            name: t("gurgaon.name") || "Gurgaon Office",
            address: t("gurgaon.address") || "123 Healthcare Plaza, Sector 44, Gurgaon, Haryana, India",
            phone: "+91-XXX-XXX-XXXX",
            email: "gurgaon@panaceamedcare.com"
        },
        {
            id: "delhi-ncr",
            name: t("delhiNcr.name") || "Delhi NCR Office",
            address: t("delhiNcr.address") || "456 Medical District, New Delhi, India",
            phone: "+91-XXX-XXX-XXXX",
            email: "delhi@panaceamedcare.com"
        }
    ];

    const internationalPresence = [
        { region: t("africa") || "Africa", countries: t("africaCountries") || "Uganda, Tanzania, Kenya" },
        { region: t("middleEast") || "Middle East", countries: t("middleEastCountries") || "UAE, Saudi Arabia" },
        { region: t("asia") || "Asia", countries: t("asiaCountries") || "Nepal, Bangladesh" }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="ourOffices"
                backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* World Map Section */}
                <div className="mb-16">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("globalPresence") || "Global Presence"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t("globalPresenceDesc") || "Serving patients across continents with trusted healthcare partners"}
                        </p>
                    </div>

                    {/* Simple Map Representation */}
                    <div className="bg-gradient-to-br from-panacea-light to-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
                        <div className="grid md:grid-cols-3 gap-8">
                            {internationalPresence.map((presence, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-20 h-20 bg-panacea-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{presence.region}</h3>
                                    <p className="text-gray-600">{presence.countries}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Office Cards */}
                <div className="mb-12">
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("ourOffices") || "Our Offices"}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t("ourOfficesDesc") || "Visit us at our offices or reach out for assistance"}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {offices.map((office) => (
                            <div key={office.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <h3 className={`text-2xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                                    {office.name}
                                </h3>

                                <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
                                    <div className="flex items-start gap-3">
                                        <MapPin className={`w-6 h-6 text-panacea-primary flex-shrink-0 mt-1 ${isRTL ? "order-2" : ""}`} />
                                        <p className="text-gray-700 leading-relaxed">{office.address}</p>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Phone className="w-6 h-6 text-panacea-primary flex-shrink-0" />
                                        <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-panacea-primary transition-colors">
                                            {office.phone}
                                        </a>
                                    </div>

                                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                                        <Mail className="w-6 h-6 text-panacea-primary flex-shrink-0" />
                                        <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-panacea-primary transition-colors break-all">
                                            {office.email}
                                        </a>
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

