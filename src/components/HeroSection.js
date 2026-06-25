import { localePath } from "@/lib/locale/routing";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const headline = {
  en: "AI Driven International Patient Care",
  ar: "رعاية المرضى الدوليين المدعومة بالذكاء الاصطناعي",
  fr: "Soins aux Patients Internationaux Pilotés par l'IA",
};

const tagline = {
  en: "Pre-screening, Smarter matching, Better outcomes",
  ar: "الفحص المسبق، المطابقة الذكية، نتائج أفضل",
  fr: "Pré-dépistage, Correspondance intelligente, Meilleurs résultats",
};

const supportingText = {
  en: "Fast, Personalized Global Treatment Plans from Accredited Hospitals",
  ar: "خطط علاج عالمية سريعة وشخصية من مستشفيات معتمدة",
  fr: "Plans de traitement mondiaux rapides et personnalisés auprès d'hôpitaux accrédités",
};

const ctaPreScreening = {
  en: "Start Your AI Pre-Screening",
  ar: "ابدأ الفحص المسبق بالذكاء الاصطناعي",
  fr: "Commencez Votre Pré-dépistage IA",
};

const ctaWhatsApp = {
  en: "Talk to a Care Expert",
  ar: "تحدث مع خبير الرعاية",
  fr: "Parler à un Expert en Soins",
};

export default function HeroSection({ locale }) {
  const isRTL = locale === "ar";

  return (
    <section
      className="relative min-h-[90vh] md:min-h-[100vh] overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      role="banner"
      aria-label="Hero Section"
    >
      {/* Background Images - mobile-first with picture for conditional loading */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src="/bg-sm.png"
          alt="World-class medical care with compassionate doctors and happy patients"
          fill
          className="object-cover object-center md:hidden"
          priority
          quality={75}
          sizes="100vw"
          style={{ objectPosition: isRTL ? "right center" : "left center" }}
        />
        {/* Desktop image - lazy on mobile viewport */}
        <Image
          src="/hero-banner.png"
          alt="World-class medical care with compassionate doctors and happy patients"
          fill
          className="object-cover object-center hidden md:block"
          priority
          quality={75}
          sizes="100vw"
          style={{ objectPosition: isRTL ? "right center" : "left center" }}
        />

        {/* Teal overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(6,111,137,0.75),rgba(6,111,137,0.82))",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full min-h-[85vh] md:min-h-[90vh] flex items-center">
        <div
          className={`w-full max-w-5xl ${
            isRTL ? "text-right ml-auto" : "text-left"
          }`}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {headline[locale] || headline.en}
          </h1>

          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 italic mb-5 font-semibold"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {tagline[locale] || tagline.en}
          </p>

          {/* Supporting text - improved contrast: white with opacity instead of low-contrast gold */}
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-10 w-full leading-relaxed"
            style={{
              fontFamily: "var(--font-raleway), Raleway, sans-serif",
              color: "#FFE566",
            }}
          >
            {supportingText[locale] || supportingText.en}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 ${
              isRTL ? "justify-end" : "justify-start"
            }`}
          >
            <Link
              href={localePath(locale, `/pre-screening`)}
              className={`group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#F5841F] hover:bg-[#E07316] text-white rounded-lg font-semibold text-base transition-colors duration-200 shadow-xl w-full sm:w-auto ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span>{ctaPreScreening[locale] || ctaPreScreening.en}</span>
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-200 ${
                  isRTL
                    ? "rotate-180 group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </Link>

            <a
              href="https://api.whatsapp.com/send/?phone=919958800961&text=Hello%2C+I+need+medical+assistance+from+Panacea+Medcare&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-lg font-semibold text-base transition-colors duration-200 shadow-xl w-full sm:w-auto ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>{ctaWhatsApp[locale] || ctaWhatsApp.en}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

