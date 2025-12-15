"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Navbar from "./Navbar/Navbar";

export default function Header({ locale }) {
  var isRTL = locale === "ar";

  // Translations
  var translations = {
    en: {
      findDoctor: "Find a Doctor",
      findTreatment: "Find Treatment",
      findDepartment: "Find Department",
      requestConsultation: "Free Consultation",
      heartCenter: "Heart Center",
      hematoOncology: "Hemato-Oncology",
      cancerCenter: "Cancer Center",
      search: "Search",
      getQuote: "Get Quote",
    },
    ar: {
      findDoctor: "ابحث عن طبيب",
      findTreatment: "ابحث عن علاج",
      findDepartment: "ابحث عن قسم",
      requestConsultation: "استشارة مجانية",
      heartCenter: "مركز القلب",
      hematoOncology: "أمراض الدم",
      cancerCenter: "مركز السرطان",
      search: "بحث",
      getQuote: "احصل على عرض",
    },
    fr: {
      findDoctor: "Trouver un médecin",
      findTreatment: "Trouver un traitement",
      findDepartment: "Trouver un département",
      requestConsultation: "Consultation gratuite",
      heartCenter: "Centre du cœur",
      hematoOncology: "Hématologie et oncologie",
      cancerCenter: "Centre du cancer",
      search: "Rechercher",
      getQuote: "Obtenir un devis",
    }
  };

  var t = translations[locale] || translations.en;

  return (
    <>
      <header
        className="bg-white shadow-md"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Main Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-1">
            <div className={"flex items-center justify-between " + (isRTL ? "flex-row-reverse" : "")}>
              {/* Logo - RTL: right side, LTR: left side */}
              <Link href={"/" + locale} className={isRTL ? "order-3" : "order-1"}>
                <div
                  className={
                    "flex items-center gap-2 " + (isRTL ? "flex-row-reverse" : "")
                  }
                >
                  <Image
                    src="/logo.png"
                    alt="Panacea Medcare Logo"
                    width={200}
                    height={100}
                    className="h-24 w-auto"
                    priority
                  />
                </div>
              </Link>


              {/* Actions - RTL: left side, LTR: right side */}
              <div
                className={
                  "flex items-center gap-3 " +
                  (isRTL ? "order-1 flex-row-reverse" : "order-3")
                }
              >
                <LanguageSwitcher currentLocale={locale} />
                <div className="lg:hidden">
                  <Navbar locale={locale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Desktop - STICKY - Outside header */}
      <div
        className="sticky top-0 bg-white border-b border-gray-100 z-50 shadow-sm"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div
            className={"hidden lg:block " + (isRTL ? "flex justify-end" : "")}
          >
            <Navbar locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
