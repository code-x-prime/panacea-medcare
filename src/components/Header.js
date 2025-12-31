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
      contactUs: "Contact Us",
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
      contactUs: "اتصل بنا",
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
      contactUs: "Contactez-nous",
    }
  };

  var t = translations[locale] || translations.en;

  return (
    <>
      <header
        className="shadow-md"
        dir={isRTL ? "rtl" : "ltr"}
        style={{ backgroundColor: 'rgba(6, 111, 137, 0.05)' }}
      >
        {/* Main Header */}
        <div className="border-b border-[#066F89]/10">
          <div className="container mx-auto px-4  py-[0.5px]">
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
                    className="h-20 w-auto"
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
                {/* Contact Us WhatsApp Button */}
                <a
                  href="https://wa.me/919958800961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  {t.contactUs} : +91 995 880 0961
                </a>
                {/* Email Button */}
                <a
                  href="mailto:care@panaceamedcare.com"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#066F89] hover:bg-[#055a70] text-white text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  care@panaceamedcare.com
                </a>
                {/* Book Teleconsultation - Orange CTA Button */}
                <Link
                  href={`/${locale}/services/teleconsultation`}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#F5841F] hover:bg-[#E07316] text-white text-xs rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t.requestConsultation}
                </Link>
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Desktop - Outside header */}
      <Navbar locale={locale} />
    </>
  );
}
