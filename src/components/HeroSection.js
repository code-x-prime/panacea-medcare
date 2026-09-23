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
  en: "Your Trusted Medical Tourism Company in India",
  ar: "شركتك الموثوقة للسياحة العلاجية في الهند",
  fr: "Votre Société de Tourisme Médical de Confiance en Inde",
};

const supportingText = {
  en: "Medical tourism can feel overwhelming — finding the right doctor, hospital and treatment shouldn't. Get personalized support for medical tourism in India, from specialist matching and hospital selection to treatment planning and international patient care.",
  ar: "قد تبدو السياحة العلاجية مرهقة — العثور على الطبيب والمستشفى والعلاج المناسبين لا يجب أن يكون كذلك. احصل على دعم شخصي للسياحة العلاجية في الهند، من مطابقة المتخصصين واختيار المستشفى إلى تخطيط العلاج والرعاية الدولية للمرضى.",
  fr: "Le tourisme médical peut sembler accablant — trouver le bon médecin, l'hôpital et le traitement ne devrait pas l'être. Obtenez un soutien personnalisé pour le tourisme médical en Inde, du matching de spécialistes à la sélection d'hôpitaux, en passant par la planification du traitement et les soins aux patients internationaux.",
};

const ctaPreScreening = {
  en: "Get Your Treatment Plan",
  ar: "احصل على خطة علاجك",
  fr: "Obtenez Votre Plan de Traitement",
};

const ctaWhatsApp = {
  en: "Get a Free Consultation",
  ar: "احصل على استشارة مجانية",
  fr: "Obtenez une Consultation Gratuite",
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
        <picture>
          <source media="(max-width: 768px)" srcSet="/_next/image?url=%2Fbg-sm.png&w=750&q=75" />
          <source media="(min-width: 769px)" srcSet="/_next/image?url=%2Fhero-banner.png&w=1920&q=75" />
          <img
            src="/_next/image?url=%2Fhero-banner.png&w=1920&q=75"
            alt="World-class medical care with compassionate doctors and happy patients"
            className="object-cover object-center absolute inset-0 w-full h-full"
            style={{ objectPosition: isRTL ? "right center" : "left center" }}
            fetchpriority="high"
          />
        </picture>

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
            className="text-sm sm:text-base md:text-base lg:text-lg font-normal mb-8 w-full max-w-2xl leading-relaxed"
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

