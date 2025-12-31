"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HomeOfficesPreview({ locale: localeProp }) {
  const locale = useLocale() || localeProp || "en";
  const t = useTranslations("ourOffices");
  const isRTL = locale === "ar";

  const offices = [
    // Nigeria Offices
    {
      id: "nigeria-abuja",
      country: t("nigeria.country") || "Nigeria",
      city: t("nigeria.abuja.city") || "Abuja",
      address: t("nigeria.abuja.address") || "No. 17, Benghazi Street, Wuse Zone 4, Abuja, FCT",
    },
    {
      id: "nigeria-lagos",
      country: t("nigeria.country") || "Nigeria",
      city: t("nigeria.lagos.city") || "Lagos",
      address: t("nigeria.lagos.address") || "311A, Kola Opere Street, Buknor Estate, Isolo, Lagos, Nigeria",
    },
    {
      id: "nigeria-kano",
      country: t("nigeria.country") || "Nigeria",
      city: t("nigeria.kano.city") || "Kano",
      address: t("nigeria.kano.address") || "Room No. 15, Block B. Amino Kano Teaching Hospital, Kano",
    },
    // Kenya Offices
    {
      id: "kenya-nairobi",
      country: t("kenya.country") || "Kenya",
      city: t("kenya.nairobi.city") || "Nairobi",
      address: t("kenya.nairobi.address") || "Mayfair Office Suites, Parklands Road, Nairobi, Kenya",
    },
    // Ethiopia Offices
    {
      id: "ethiopia-debre-markos",
      country: t("ethiopia.country") || "Ethiopia",
      city: t("ethiopia.debreMarkos.city") || "Debre Markos",
      address: t("ethiopia.debreMarkos.address") || "Debre Markos, East Gojjam District, Addis Ababa, Ethiopia",
    },
  ];

  return (
    <section
      className="py-12 md:py-16 bg-panacea-light"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-panacea-primary mb-3 tracking-tight">
              {t("ourOffices") || "Panacea Patient Assistance Centres"}
            </h2>
            <p className="text-lg md:text-xl text-panacea-gray max-w-2xl">
              {t("ourOfficesDesc") || "Visit us at our offices or reach out for assistance"}
            </p>
          </div>
          <Link
            href={`/${locale}/our-offices`}
            className="px-6 py-3 rounded-lg bg-panacea-primary text-white font-semibold hover:bg-panacea-blue-600 transition-all shadow-panacea hover:shadow-panacea-lg whitespace-nowrap"
          >
            {locale === "ar" ? "عرض جميع المكاتب" : locale === "fr" ? "Voir tous les bureaux" : "View all offices"}
          </Link>
        </div>

        {/* Office Cards - Grouped by Country */}
        <div className="space-y-8">
          {Object.entries(
            offices.reduce((acc, office) => {
              if (!acc[office.country]) {
                acc[office.country] = [];
              }
              acc[office.country].push(office);
              return acc;
            }, {})
          ).map(([country, countryOffices]) => (
            <div key={country}>
              <h3 className="text-2xl md:text-3xl font-bold text-panacea-dark mb-6">
                {country}:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 gap-10">
                {countryOffices.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white rounded-xl shadow-panacea border border-gray-200 p-6 hover:shadow-panacea-lg transition-all duration-300 group"
                  >
                    <div className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 rounded-full bg-panacea-primary text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-panacea">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                        <h4 className="text-lg md:text-xl font-bold text-panacea-primary mb-2">
                          {office.city}
                        </h4>
                        <p className="text-panacea-gray leading-relaxed text-sm">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
