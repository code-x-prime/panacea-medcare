"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import Navbar from "./Navbar/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

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
        {/* Top Contact Bar */}
        <div className="bg-panacea-primary text-white py-2">
          <div className="container mx-auto px-4">
            <div className={`flex items-center justify-center gap-6 text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* WhatsApp Contact */}
              <a
                href="https://wa.me/919958800961"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 hover:text-panacea-accent transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>+91 9958800961</span>
              </a>
              {/* Email */}
              <a
                href="mailto:care@panaceamedcare.com"
                className={`flex items-center gap-2 hover:text-panacea-accent transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Mail className="w-4 h-4" />
                <span>care@panaceamedcare.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-1">
            <div className={"flex items-center justify-between " + (isRTL ? "flex-row-reverse" : "")}>
              {/* Logo - RTL: right side, LTR: left side - Reduced height */}
              <Link href={"/" + locale} className={isRTL ? "order-3" : "order-1"}>
                <div
                  className={
                    "flex items-center gap-2 " + (isRTL ? "flex-row-reverse" : "")
                  }
                >
                  <Image
                    src="/logo.png"
                    alt="Panacea Medcare Logo"
                    width={160}
                    height={64}
                    className="h-16 w-auto"
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
                {/* Book Teleconsultation - Orange CTA Button */}
                <Link
                  href={`/${locale}/services/teleconsultation`}
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-panacea-accent hover:bg-panacea-orange-600 text-white font-semibold rounded-lg shadow-panacea-orange hover:shadow-lg transition-all duration-300"
                >
                  {t.requestConsultation}
                </Link>
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Desktop - STICKY - Outside header */}
      <div
        className="sticky top-0 bg-white z-50"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Navbar locale={locale} />
      </div>
    </>
  );
}
