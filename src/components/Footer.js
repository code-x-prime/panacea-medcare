"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer({ locale }) {
  const t = useTranslations("footer");
  const isRTL = locale === "ar";

  const quickLinks = [
    { key: "aboutUs", href: "/about" },
    { key: "ourServices", href: "/services" },
    { key: "hospitals", href: "/hospitals" },
    { key: "destinations", href: "/destinations" },
    { key: "specialties", href: "/specialties" },
    { key: "howItWorks", href: "/how-it-works" },
    { key: "faq", href: "/faq" },
    { key: "contactUs", href: "/contact" },
  ];

  const services = [
    "medicalOpinion",
    "travelAssistance",
    "visaSupport",
    "accommodation",
    "interpreters",
    "followUpCare",
  ];

  const destinations = [
    "india",
    "turkey",
    "thailand",
    "uae",
    "germany",
    "egypt",
  ];

  const legalLinks = [
    { key: "privacyPolicy", href: "/privacy" },
    { key: "termsOfService", href: "/terms" },
    { key: "disclaimer", href: "/disclaimer" },
    { key: "cookiePolicy", href: "/cookies" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "facebook" },
    { icon: Twitter, href: "#", label: "twitter" },
    { icon: Instagram, href: "#", label: "instagram" },
    { icon: Linkedin, href: "#", label: "linkedin" },
    { icon: Youtube, href: "#", label: "youtube" },
  ];

  return (
    <footer
      className="bg-gradient-to-br from-panacea-dark via-panacea-primary to-panacea-dark text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
              {t("companyName")}
            </h3>
            <p className="text-panacea-light/90 mb-6 leading-relaxed">
              {t("tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-3">{t("contactTitle")}</h4>

              <a
                href={`tel:${t("phone")}`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{t("phone")}</span>
              </a>

              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="break-all">{t("email")}</span>
              </a>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6">{t("quickLinks.title")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-panacea-light/90 hover:text-white hover:translate-x-2 transition-all inline-block"
                  >
                    {t(`quickLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Destinations */}
          <div>
            {/* Services */}
            <h4 className="font-bold text-xl mb-6">{t("services.title")}</h4>
            <ul className="space-y-3 mb-8">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-panacea-light/90">
                    {t(`services.${service}`)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Destinations */}
            <h4 className="font-bold text-xl mb-6">{t("destinations.title")}</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest}>
                  <span className="text-panacea-light/90">
                    {t(`destinations.${dest}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-bold text-xl mb-6">{t("newsletter.title")}</h4>
            <p className="text-panacea-light/90 mb-4">
              {t("newsletter.description")}
            </p>

            {/* Newsletter Form */}
            <form className="mb-8">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-panacea-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-panacea-accent hover:bg-panacea-accent/90 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Social Links */}
            <h4 className="font-bold text-xl mb-4">{t("social.title")}</h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-panacea-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label={t(`social.${social.label}`)}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-panacea-light/70 text-center leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-panacea-dark/50 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-panacea-light/80">
              {t("copyright")}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-sm text-panacea-light/80 hover:text-white transition-colors"
                >
                  {t(`legal.${link.key}`)}
                </Link>
              ))}
            </div>

            {/* Certifications */}
            <p className="text-sm text-panacea-light/80">
              {t("certifications")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
