"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import caseStudies from "@/data/caseStudies.json";

export default function HomeCaseStudiesPreview({ locale }) {
  const t = useTranslations("caseStudies");
  const isRTL = locale === "ar";

  const items = (caseStudies || []).slice(0, 2);

  if (!items.length) return null;

  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-br from-white via-panacea-light/30 to-gray-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/case-studies`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع القصص" : "View all stories"}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((study) => {
            const name = locale === "ar" ? study.nameAr : locale === "fr" ? study.nameFr : study.name;
            const title = locale === "ar" ? study.titleAr : locale === "fr" ? study.titleFr : study.title;
            const country = locale === "ar" ? study.countryAr : locale === "fr" ? study.countryFr : study.country;
            const diagnosis = locale === "ar" ? study.diagnosisAr : locale === "fr" ? study.diagnosisFr : study.diagnosis;

            return (
              <Link
                key={study.id}
                href={`/${locale}/case-studies/${study.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <Image
                    src={study.thumbnail}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 rounded-full px-3 py-1 text-sm font-semibold">
                    <span>{study.countryFlag}</span>
                    <span>{country}</span>
                  </div>
                </div>
                <div className={`${isRTL ? "text-right" : "text-left"} p-5`}>
                  <p className="text-sm text-panacea-primary font-semibold mb-1">
                    {t("patient")}: {name}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-panacea-primary">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{diagnosis}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href={`/${locale}/case-studies`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع القصص" : "View all stories"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
