"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection({ locale }) {
  const t = useTranslations("home");
  const isRTL = locale === "ar";

  // Tagline - exact as client specified
  const tagline = {
    en: "Global Care – Indian Compassion – Redefining Medical Tourism",
    ar: "رعاية عالمية – رحمة هندية – إعادة تعريف السياحة العلاجية",
    fr: "Soins Mondiaux – Compassion Indienne – Redéfinir le Tourisme Médical"
  };

  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[90vh] overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      role="banner"
      aria-label="Hero Section"
    >
      {/* Background Image - Medical/Surgery Scene like Sheeba */}
      <div className="absolute inset-0">
        <Image
          src="/bg-hero.jpg"
          alt="World-class medical care in India"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Blue Teal Overlay - Like Sheeba */}
        <div className="absolute inset-0 bg-panacea-primary/60" />
      </div>

      {/* Decorative Dot Pattern - Like Sheeba */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[85vh] lg:min-h-[90vh] flex items-center">
        <div className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* World's Best Hospitals Badge - Like Sheeba */}
          <div className={`mb-8 ${isRTL ? 'flex justify-end' : ''}`}>
            <div className="inline-block bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="flex">
                {/* Red Section */}
                <div className="bg-red-600 text-white px-3 py-2 flex flex-col justify-center">
                  <span className="text-[10px] font-bold leading-tight">WORLD&apos;S</span>
                  <span className="text-[10px] font-bold leading-tight">BEST</span>
                  <span className="text-[10px] font-bold leading-tight">HOSPITALS</span>
                </div>
                {/* White Section */}
                <div className="px-3 py-2 flex flex-col justify-center border-l">
                  <span className="text-2xl font-bold text-gray-900 leading-none">2025</span>
                  <span className="text-[10px] text-red-600 font-semibold">Newsweek</span>
                  <span className="text-[8px] text-gray-500">statista</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading - Like Sheeba Style */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-raleway), Raleway, sans-serif' }}
          >
            <span className="block">World-Class Medicine</span>
            <span className="block italic">with a Personal Touch</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-2xl"
            style={{ fontFamily: 'var(--font-raleway), Raleway, sans-serif' }}
          >
            {tagline[locale] || tagline.en}
          </p>

          {/* CTA Buttons - Like Sheeba Style */}
          <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {/* About Us - Teal/Green Button */}
            <Link
              href={`/${locale}/about`}
              className={`group inline-flex items-center gap-3 px-8 py-4 bg-panacea-secondary hover:bg-panacea-primary text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{locale === "ar" ? "من نحن" : locale === "fr" ? "À propos" : "About us"}</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </Link>

            {/* Patient Stories - Pink/Accent Outline Button */}
            <Link
              href={`/${locale}/testimonials`}
              className={`group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-panacea-accent text-white hover:bg-panacea-accent rounded-full font-semibold text-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{locale === "ar" ? "قصص المرضى" : locale === "fr" ? "Témoignages" : "Patient Stories"}</span>
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center group-hover:border-white transition-colors">
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </Link>
          </div>

          {/* Optional: Free Consultation CTA - Orange (for conversion) */}
          <div className={`mt-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <button
              onClick={() => {
                const chatbotButton = document.querySelector('[data-chatbot-toggle]');
                if (chatbotButton) chatbotButton.click();
              }}
              className={`inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Play className="w-5 h-5 fill-panacea-accent text-panacea-accent" />
              <span className="underline underline-offset-4">
                {locale === "ar" ? "احصل على استشارة مجانية" : locale === "fr" ? "Obtenez une consultation gratuite" : "Get Free Consultation"}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent z-[1]" />
    </section>
  );
}
