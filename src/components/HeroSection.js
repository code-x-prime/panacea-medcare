"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection({ locale }) {
  const isRTL = locale === "ar";
  const [isLoaded, setIsLoaded] = useState(false);

  // Main Headline
  const headline = {
    en: "AI Driven International Patient Care",
    ar: "رعاية المرضى الدوليين المدعومة بالذكاء الاصطناعي",
    fr: "Soins aux Patients Internationaux Pilotés par l'IA"
  };

  // Tagline (italics, smaller)
  const tagline = {
    en: "Pre-screening, Smarter matching, Better outcomes",
    ar: "الفحص المسبق، المطابقة الذكية، نتائج أفضل",
    fr: "Pré-dépistage, Correspondance intelligente, Meilleurs résultats"
  };

  // Supporting text (gold color)
  const supportingText = {
    en: "Where Global Care meets Indian Compassion",
    ar: "حيث تلتقي الرعاية العالمية بالرحمة الهندية",
    fr: "Où les Soins Mondiaux rencontrent la Compassion Indienne"
  };

  // CTA Button 1 - AI Pre-Screening
  const ctaPreScreening = {
    en: "Start Your AI Pre-Screening",
    ar: "ابدأ الفحص المسبق بالذكاء الاصطناعي",
    fr: "Commencez Votre Pré-dépistage IA"
  };

  // CTA Button 2 - WhatsApp
  const ctaWhatsApp = {
    en: "Talk to a Care Expert",
    ar: "تحدث مع خبير الرعاية",
    fr: "Parler à un Expert en Soins"
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] md:min-h-[100vh] overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      role="banner"
      aria-label="Hero Section"
    >
      {/* Full-width Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt="World-class medical care with compassionate doctors and happy patients"
          fill
          className="object-cover object-center hidden md:block"
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectPosition: isRTL ? "right center" : "left center",
          }}
        />
        <Image
          src="/bg-sm.png"
          alt="World-class medical care with compassionate doctors and happy patients"
          fill
          className="object-cover object-center block md:hidden"
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectPosition: isRTL ? "right center" : "left center",
          }}
        />

        {/* Logo Teal Overlay - #066F89 */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              rgba(6, 111, 137, 0.75),
              rgba(6, 111, 137, 0.80)
            )`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6  h-full min-h-[85vh] md:min-h-[90vh] flex items-center">
        <div
          className={`w-full max-w-5xl ${isRTL ? "text-right ml-auto" : "text-left"
            } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700`}
        >
          {/* Main Headline (H1) */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {headline[locale] || headline.en}
          </h1>

          {/* Tagline - Italics, Smaller */}
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 italic mb-5 font-semibold"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {tagline[locale] || tagline.en}
          </p>

          {/* Supporting Text - Gold Color */}
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 max-w-3xl leading-relaxed"
            style={{
              fontFamily: "var(--font-raleway), Raleway, sans-serif",
              color: "#FFD700"
            }}
          >
            {supportingText[locale] || supportingText.en}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "justify-end" : "justify-start"
              }`}
          >
            {/* Primary CTA - Start Your AI Pre-Screening */}
            <Link
              href={`/${locale}/services/teleconsultation`}
              className={`group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#F5841F] hover:bg-[#E07316] text-white rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>{ctaPreScreening[locale] || ctaPreScreening.en}</span>
              <ArrowRight
                className={`w-5 h-5 transition-transform ${isRTL
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
                  }`}
              />
            </Link>

            {/* Secondary CTA - Talk to a Care Expert (WhatsApp) */}
            <a
              href="https://wa.me/918860036536"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>{ctaWhatsApp[locale] || ctaWhatsApp.en}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade to White */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

