"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection({ locale }) {
  const isRTL = locale === "ar";
  const [isLoaded, setIsLoaded] = useState(false);

  // Headline - MANDATORY as per client
  const headline = {
    en: "India’s First AI-Driven International Patient Care Platform",
    ar: "أول منصة في الهند لرعاية المرضى الدوليين مدعومة بالذكاء الاصطناعي",
    fr: "La première plateforme indienne de soins aux patients internationaux pilotée par l'IA"
  };

  // Supporting text - MANDATORY as per client
  const supportingText = {
    en: "Where Global Care Meets Indian Compassion.",
    ar: "حيث تلتقي الرعاية العالمية بالرحمة الهندية.",
    fr: "Où les soins mondiaux rencontrent la compassion indienne."
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
            {/* Primary CTA - Get a Free Teleconsultation Today */}
            <Link
              href={`/${locale}/services/teleconsultation`}
              className={`group inline-flex items-center justify-center gap-3 px-6 py-5 bg-white text-panacea-primary rounded-lg font-semibold text-base  transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>
                {locale === "ar"
                  ? "احصل على استشارة مجانية اليوم"
                  : locale === "fr"
                    ? "Obtenez une téléconsultation gratuite aujourd'hui"
                    : "Get a Free Teleconsultation Today"}
              </span>
              <ArrowRight
                className={`w-6 h-6 transition-transform ${isRTL
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
                  }`}
              />
            </Link>

            {/* Secondary CTA - Contact Us Now */}
            <a
              href="tel:+919958800961"
              className={`group inline-flex items-center justify-center gap-3 px-6 py-5 bg-panacea-accent text-white rounded-lg font-semibold text-base  transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto ${isRTL ? "flex-row-reverse" : ""}`}
              aria-label="Contact Us Now"
            >
              <MessageCircle className="w-6 h-6" />
              <span>
                {locale === "ar"
                  ? "اتصل بنا الآن: +91-9958800961"
                  : locale === "fr"
                    ? "Contactez-nous maintenant: +91-9958800961"
                    : "Contact Us Now: +91-9958800961"}
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
