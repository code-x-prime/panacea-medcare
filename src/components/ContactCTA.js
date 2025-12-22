"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function ContactCTA({ locale }) {
  const t = useTranslations("contactCTA");
  const isRTL = locale === "ar";

  const phoneNumber = "+91-9958800961";
  const whatsappNumber = "919958800961"; // WhatsApp format without + and -
  const email = "care@panaceamedcare.com";
  const whatsappMessage = encodeURIComponent(
    t("whatsappMessage") || "Hello, I need medical assistance"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      className="relative py-16 md:py-20 bg-panacea-gradient overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 ${
              isRTL ? "font-arabic" : ""
            }`}
            style={{
              textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {t("title") || "Contact Us Now"}
          </h2>
          <p
            className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto ${
              isRTL ? "font-arabic" : ""
            }`}
          >
            {t("subtitle") ||
              "Get instant medical consultation and expert guidance"}
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Phone Card */}
          <a
            href={`tel:${phoneNumber.replace(/-/g, "")}`}
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-panacea-primary/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-panacea-primary rounded-full flex items-center justify-center mb-4 group-hover:bg-panacea-secondary transition-colors">
                <FaPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-panacea-dark mb-2">
                {t("phoneLabel") || "Call Us Now"}
              </h3>
              <p className="text-2xl font-bold text-panacea-primary mb-1">
                {phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                {t("phoneSubtext") || "24/7 Available"}
              </p>
            </div>
          </a>

          {/* WhatsApp Card - Prominent */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-green-500 rounded-xl p-6 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-green-400/50 relative overflow-hidden"
          >
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-xl bg-green-400 animate-ping opacity-20"></span>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                <FaWhatsapp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t("whatsappLabel") || "WhatsApp Us"}
              </h3>
              <p className="text-xl font-bold text-white mb-1">
                {t("whatsappSubtext") || "Instant Response"}
              </p>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-white mt-2">
                {t("whatsappBadge") || "Click to Chat"}
              </span>
            </div>
          </a>

          {/* Teleconsultation Card */}
          <Link
            href={`/${locale}/services/teleconsultation`}
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-panacea-accent/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-panacea-accent rounded-full flex items-center justify-center mb-4 group-hover:bg-panacea-orange-600 transition-colors">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-panacea-dark mb-2">
                {t("teleconsultLabel") || "Free Teleconsultation"}
              </h3>
              <p className="text-base font-semibold text-panacea-accent mb-1">
                {t("teleconsultSubtext") || "Book Today"}
              </p>
              <p className="text-sm text-gray-600">
                {t("teleconsultDesc") || "Expert doctors available"}
              </p>
            </div>
          </Link>

          {/* Email Card */}
          <a
            href={`mailto:${email}`}
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-panacea-primary/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-panacea-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-panacea-primary transition-colors">
                <FaEnvelope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-panacea-dark mb-2">
                {t("emailLabel") || "Email Us"}
              </h3>
              <p className="text-sm font-semibold text-panacea-primary break-all">
                {email}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {t("emailSubtext") || "We'll respond quickly"}
              </p>
            </div>
          </a>
        </div>

        {/* Urgency Banner */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border-2 border-white/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {t("urgencyTitle") ||
                  "Get a Free Teleconsultation Today!"}
              </h3>
              <p className="text-white/90">
                {t("urgencyDesc") ||
                  "Don't wait - speak with our medical experts now and get personalized treatment recommendations."}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>{t("whatsappButton") || "WhatsApp Now"}</span>
              </a>
              <a
                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-panacea-primary rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <FaPhone className="w-5 h-5" />
                <span>{t("callButton") || "Call Now"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t("trust1") || "24/7 Available"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t("trust2") || "Expert Doctors"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t("trust3") || "Free Consultation"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{t("trust4") || "Instant Response"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

