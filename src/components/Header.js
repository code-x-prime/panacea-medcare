"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Navbar from "./Navbar/Navbar";
import {
  Calendar,
  Heart,
  Search,
  Stethoscope,
  FlaskConical,
} from "lucide-react";

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
    <header
      className="bg-white shadow-md z-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top Bar */}
      <div
        className={
          "text-white py-2 " +
          (isRTL
            ? "bg-gradient-to-l from-teal-600 via-slate-700 to-slate-800"
            : "bg-gradient-to-r from-slate-800 via-slate-700 to-teal-600")
        }
      >
        <div className="container mx-auto px-4">
          <div
            className={
              "flex items-center justify-between text-sm " +
              (isRTL ? "flex-row-reverse" : "")
            }
          >
            <div
              className={
                "hidden md:flex items-center gap-6 " +
                (isRTL ? "flex-row-reverse" : "")
              }
            >
              <Link
                href={"/" + locale + "/doctors"}
                className="hover:text-teal-300 transition-colors font-medium whitespace-nowrap"
              >
                {t.findDoctor}
              </Link>
              <Link
                href={"/" + locale + "/hospitals"}
                className="hover:text-teal-300 transition-colors font-medium whitespace-nowrap"
              >
                {t.findTreatment}
              </Link>
              <Link
                href={"/" + locale + "/hospitals"}
                className="hover:text-teal-300 transition-colors font-medium whitespace-nowrap"
              >
                {t.findDepartment}
              </Link>
            </div>
            <div
              className={
                "flex items-center gap-4 " + (isRTL ? "flex-row-reverse" : "")
              }
            >
              <Link
                href={"/" + locale + "/free-consult"}
                className={
                  "bg-teal-500 hover:bg-teal-400 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 text-xs " +
                  (isRTL ? "flex-row-reverse" : "")
                }
              >
                {t.requestConsultation}
                <Calendar className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

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

            {/* Icon Navigation - Desktop - Always center */}
            <div
              className={
                "hidden lg:flex items-center gap-4 order-2 " +
                (isRTL ? "flex-row-reverse" : "")
              }
            >
              <Link
                href={"/" + locale + "/hospitals"}
                className="flex flex-col items-center gap-1 group hover:text-teal-600 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Heart className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600 whitespace-nowrap">
                  {t.heartCenter}
                </span>
              </Link>
              <Link
                href={"/" + locale + "/hospitals"}
                className="flex flex-col items-center gap-1 group hover:text-teal-600 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600 whitespace-nowrap">
                  {t.hematoOncology}
                </span>
              </Link>
              <Link
                href={"/" + locale + "/hospitals"}
                className="flex flex-col items-center gap-1 group hover:text-teal-600 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
                  <FlaskConical className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600 whitespace-nowrap">
                  {t.cancerCenter}
                </span>
              </Link>
              <Link
                href={"/" + locale + "/search"}
                className="flex flex-col items-center gap-1 group hover:text-teal-600 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600 whitespace-nowrap">
                  {t.search}
                </span>
              </Link>
            </div>

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

      {/* Navigation Bar - Desktop */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div
            className={"hidden lg:block " + (isRTL ? "flex justify-end" : "")}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <Navbar locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
