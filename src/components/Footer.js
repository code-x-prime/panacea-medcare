"use client";
import { localePath } from "@/lib/locale/routing";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Facebook,
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

  const services = [
    "medicalOpinion",
    "travelAssistance",
    "visaSupport",
    "accommodation",
    "interpreters",
    "followUpCare",
  ];

  const legalLinks = [
    { key: "privacyPolicy", href: "/privacy" },
    { key: "termsOfService", href: "/terms" },
    { key: "disclaimer", href: "/disclaimer" },
    { key: "cookiePolicy", href: "/cookies" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/PanaceaMedcare/", label: "facebook" },
    { icon: Instagram, href: "https://www.instagram.com/panaceamedcare/", label: "instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/panaceamedcare/", label: "linkedin" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCrzHi7C2B8cRsr4dxnaG6UA", label: "youtube" },
  ];

  return (
    <footer
      className="bg-gradient-to-br from-panacea-dark via-panacea-primary/90 to-panacea-dark text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href={localePath(locale, '/')} className="inline-block mb-2">
              <Image
                src="/logo.png"
                alt="Panacea Medcare Logo"
                width={200}
                height={100}
                className="h-16 md:h-20 w-auto brightness-0 invert"
                priority
              />
            </Link>

            <p className="text-panacea-light/90 mb-4 leading-relaxed text-sm">
              {t("tagline")}
            </p>

            {/* Social Links - Moved to Col 1 */}
            <div className="mt-6">
              <h4 className="font-bold text-lg mb-3 text-white">{t("social.title")}</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 hover:from-panacea-secondary/30 hover:to-panacea-primary/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-panacea-secondary/50"
                      aria-label={t(`social.${social.label}`)}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xl mb-3 text-white">{t("services.title")}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-panacea-light/90 hover:text-panacea-secondary transition-colors cursor-default">
                    {t(`services.${service}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Moved to Col 3 */}
          <div>
            <div className="space-y-3">
              <h4 className="font-bold text-xl mb-3 text-white">{t("contactTitle")}</h4>

              <a
                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-panacea-accent to-panacea-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("phoneLabel") || "Call Us Now"}</span>
                  <span className="text-sm">{phoneNumber}</span>
                  <span className="text-xs text-panacea-light/70">{tCTA("phoneSubtext") || "24/7 Available"}</span>
                </div>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Inquiry from Panacea Medcare Website&body=Hello, I would like to know more about your services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-panacea-accent to-panacea-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("whatsappLabel") || "WhatsApp Us"}</span>
                  <span className="text-sm">{tCTA("whatsappSubtext") || "Instant Response"}</span>
                  <span className="text-xs text-green-300">{tCTA("whatsappBadge") || "Click to Chat"}</span>
                </div>
              </a>

              <a
                href={localePath(locale, `/services/teleconsultation`)}
                className="flex items-center gap-3 text-panacea-light/90 hover:text-white transition-colors group mt-2 pt-2 border-t border-white/10"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Send className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{tCTA("teleconsultLabel") || "Free Teleconsultation"}</span>
                  <span className="text-sm">{tCTA("teleconsultSubtext") || "Book Today"}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Our Offices */}
          <div>
            <h4 className="font-bold text-xl mb-3 text-white">{t("ourOffices.title") || "Our Offices"}</h4>
            <div className="space-y-4">
              {/* Head Office */}
              <div className="text-panacea-light/90 bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="font-semibold text-white mb-3">{locale === "ar" ? "المكتب الرئيسي" : locale === "fr" ? "Bureau Principal" : "Head Office"}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-sm leading-relaxed">Suite No. 402, Plot No. 996,</p>
                  <p className="text-sm leading-relaxed">Sector 38, Gurgaon – 122001</p>
                  <p className="text-sm leading-relaxed">Delhi NCR, India</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <a
                    href={`tel:${phoneNumber.replace(/-/g, "")}`}
                    className="flex items-center gap-2 text-panacea-light/90 hover:text-panacea-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 bg-panacea-accent/20 rounded-lg flex items-center justify-center group-hover:bg-panacea-accent/30 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{phoneNumber}</span>
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Inquiry from Panacea Medcare Website&body=Hello, I would like to know more about your services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-panacea-light/90 hover:text-panacea-secondary transition-colors break-all group"
                  >
                    <div className="w-8 h-8 bg-panacea-accent/20 rounded-lg flex items-center justify-center group-hover:bg-panacea-accent/30 transition-colors flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm break-all">{email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 xl:max-w-7xl py-6">
          <p className="text-sm text-panacea-light/70 text-center leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-panacea-dark/50 border-t border-white/10">
        <div className="container mx-auto px-4 xl:max-w-7xl py-6">
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
                  href={localePath(locale, link.href)}
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
          <div className="text-center mt-4 pb-12 md:pb-0">
            <p className="text-sm text-panacea-light/60">
              Designed & Developed by{" "}
              <a
                href="http://groxmedia.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-panacea-accent hover:text-white transition-colors"
                title="Grox Media - Best Web Development Agency in India"
              >
                Grox Media
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
