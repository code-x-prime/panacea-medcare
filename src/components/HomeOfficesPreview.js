"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HomeOfficesPreview({ locale }) {
  const t = useTranslations("ourOffices");
  const isRTL = locale === "ar";

  const offices = [
    {
      id: "gurgaon",
      name: t("gurgaon.name"),
      address: t("gurgaon.address"),
    },
    {
      id: "delhi-ncr",
      name: t("delhiNcr.name"),
      address: t("delhiNcr.address"),
    },
  ];

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-br from-panacea-light via-white to-blue-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {t("ourOffices")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t("ourOfficesDesc")}
            </p>
          </div>
          <Link
            href={`/${locale}/our-offices`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع المكاتب" : "View all offices"}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-panacea-primary text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {office.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {office.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href={`/${locale}/our-offices`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع المكاتب" : "View all offices"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
