"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
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
  const tCTA = useTranslations("contactCTA");
  const isRTL = locale === "ar";

  const phoneNumber = "+91-9958800961";
  const whatsappNumber = "919958800961";
  const email = "care@panaceamedcare.com";
  const whatsappMessage = encodeURIComponent(
    tCTA("whatsappMessage") || "Hello, I need medical assistance from Panacea Medcare"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
    "nepal",
    "turkey",
    "thailand",
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
            {/* Logo */}
            <Link href={`/${locale}`} className="inline-block mb-2">
              <Image
                src="/logo.png"
                alt="Panacea Medcare Logo"
                width={200}
                height={100}
                className="h-16 md:h-20 w-auto  "
                priority
              />
            </Link>

            <p className="text-panacea-light/90 mb-6 leading-relaxed">
              {t("tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg mb-3">{t("contactTitle")}</h4>

              <a
                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("phoneLabel") || "Call Us Now"}</span>
                  <span className="text-sm">{phoneNumber}</span>
                  <span className="text-xs text-panacea-light/70">{tCTA("phoneSubtext") || "24/7 Available"}</span>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-panacea-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("emailLabel") || "Email Us"}</span>
                  <span className="text-sm break-all">{email}</span>
                  <span className="text-xs text-panacea-light/70">{tCTA("emailSubtext") || "We'll respond quickly"}</span>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("whatsappLabel") || "WhatsApp Us"}</span>
                  <span className="text-sm">{tCTA("whatsappSubtext") || "Instant Response"}</span>
                  <span className="text-xs text-green-300">{tCTA("whatsappBadge") || "Click to Chat"}</span>
                </div>
              </a>

              <a
                href={`/${locale}/services/teleconsultation`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group mt-4 pt-4 border-t border-white/10"
              >
                <div className="w-10 h-10 bg-panacea-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("teleconsultLabel") || "Free Teleconsultation"}</span>
                  <span className="text-sm">{tCTA("teleconsultSubtext") || "Book Today"}</span>
                </div>
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
                  <span className="text-panacea-light/90 hover:text-white transition-colors">
                    {t(`services.${service}`)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Destinations - Text Only, No Links */}
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

          {/* Our Offices - Fixed */}
          <div>
            <h4 className="font-bold text-xl mb-6">{t("ourOffices.title") || "Our Offices"}</h4>
            <div className="space-y-4">
              {/* Head Office */}
              <div className="text-panacea-light/90">
                <p className="font-semibold text-white mb-2">{locale === "ar" ? "المكتب الرئيسي" : locale === "fr" ? "Bureau Principal" : "Head Office"}</p>
                <p className="text-sm leading-relaxed mb-1">Suite No. 402, Plot No. 996,</p>
                <p className="text-sm leading-relaxed mb-1">Sector 38, Gurgaon – 122001</p>
                <p className="text-sm leading-relaxed mb-2">Delhi NCR, India</p>
                <p className="text-sm font-semibold text-white mt-3">Sumiit Gupta</p>
                <p className="text-sm">+91-9958800961</p>
                <p className="text-sm break-all mt-2">care@panaceamedcare.com</p>
              </div>
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
