"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection({ locale }) {
  const t = useTranslations("home");
  const isRTL = locale === "ar";
  const [isLoaded, setIsLoaded] = useState(false);

  // Headline - MANDATORY as per client
  const headline = {
    en: "Global Care – Indian Compassion – Redefining Medical Tourism",
    ar: "رعاية عالمية – رحمة هندية – إعادة تعريف السياحة العلاجية",
    fr: "Soins Mondiaux – Compassion Indienne – Redéfinir le Tourisme Médical"
  };

  // Supporting text - MANDATORY as per client
  const supportingText = {
    en: "World-class treatments, expert doctors, and personalized care — guiding you at every step of your healing journey.",
    ar: "علاجات عالمية المستوى، أطباء خبراء، ورعاية مخصصة — نرشدك في كل خطوة من رحلة شفائك.",
    fr: "Traitements de classe mondiale, médecins experts et soins personnalisés — vous guider à chaque étape de votre parcours de guérison."
  };

  // WhatsApp number from Footer
  const whatsappNumber = "919958800961";
  const whatsappMessage = encodeURIComponent(
    locale === "ar"
      ? "مرحبا، أحتاج إلى مساعدة طبية من باناسيا ميدكير"
      : locale === "fr"
        ? "Bonjour, j'ai besoin d'une assistance médicale de Panacea Medcare"
        : "Hello, I need medical assistance from Panacea Medcare"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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

        {/* Soft Overlay Gradient - Blue to Cyan */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              rgba(0, 102, 204, 0.65),
              rgba(0, 194, 209, 0.65)
            )`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[85vh] md:min-h-[90vh] flex items-center">
        <div
          className={`w-full max-w-4xl ${isRTL ? "text-right ml-auto" : "text-left"
            } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700`}
        >
          {/* Headline (H1) - Bold & Prominent */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {headline[locale] || headline.en}
          </h1>

          {/* Supporting Text (1-2 lines) */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium mb-10 max-w-3xl leading-relaxed"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {supportingText[locale] || supportingText.en}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "justify-end" : "justify-start"
              }`}
          >
            {/* Primary CTA - Contact Us / Free Teleconsultation */}
            <Link
              href={`/${locale}/services/teleconsultation`}
              className={`group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-panacea-primary rounded-lg font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>
                {locale === "ar"
                  ? "احصل على استشارة مجانية"
                  : locale === "fr"
                    ? "Obtenez une téléconsultation gratuite"
                    : "Get a Free Teleconsultation"}
              </span>
              <ArrowRight
                className={`w-5 h-5 transition-transform ${isRTL
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
                  }`}
              />
            </Link>

            {/* Secondary CTA - WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-3 px-8 py-4 bg-panacea-accent text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                {locale === "ar"
                  ? "تواصل عبر واتساب"
                  : locale === "fr"
                    ? "Discuter sur WhatsApp"
                    : "Chat on WhatsApp"}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade to White */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
