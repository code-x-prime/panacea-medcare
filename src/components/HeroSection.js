"use client";
import { FcGoogle } from "react-icons/fc";
import QuoteForm from "./QuoteForm";
import { useTranslations } from "next-intl";

export default function HeroSection({ locale }) {
  const t = useTranslations("home");

  const isRTL = locale === "ar";

  return (
    <section
      className={`relative min-h-[70vh] overflow-hidden`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
          alt="Medical professionals"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${isRTL
          ? "bg-gradient-to-l from-panacea-primary/30 via-panacea-primary/80 to-panacea-primary/95"
          : "bg-gradient-to-r from-panacea-primary/95 via-panacea-primary/80 to-panacea-primary/30"
          }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ">
          {/* Text Content - Left for LTR, Right for RTL */}
          <div
            className={`text-white space-y-6 ${isRTL ? "lg:order-2 text-right" : "lg:order-1 text-left"
              }`}
          >
            {/* World's Best Hospitals Badge */}
            <div className={`inline-flex ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="bg-white rounded-xl shadow-2xl px-6 py-4 inline-block">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-panacea-accent text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-gray-900 font-bold text-sm leading-tight">{t("badgeWorlds")}</span>
                    <span className="text-gray-900 font-bold text-sm leading-tight">{t("badgeBest")}</span>
                    <span className="text-gray-900 font-bold text-sm leading-tight">{t("badgeHospitals")}</span>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-3 flex flex-col items-start">
                    <span className="text-3xl font-bold text-gray-900 leading-none">2025</span>
                    <span className="text-xs text-gray-700 font-semibold mt-1">Newsweek</span>
                    <span className="text-xs text-gray-600">statista</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl  font-extrabold leading-tight">
              <span className="block text-white drop-shadow-2xl">
                {t("heroTitleLine1")}
              </span>
              <span className="block text-white drop-shadow-2xl mt-2">
                {t("heroTitleLine2")}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-normal">
              {t("heroSubtitle")}
            </p>

            {/* Stats/Trust Indicators */}
            <div
              className={`flex ${isRTL ? "flex-row-reverse" : ""
                } items-start gap-6 pt-4 flex-wrap`}
            >
              {/* Patients Avatars */}
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""} items-center gap-3`}>
                <div
                  className={`flex ${isRTL ? "flex-row-reverse -space-x-reverse" : "-space-x-3"
                    }`}
                >
                  <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
                  <img src="https://i.pravatar.cc/150?img=5" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
                  <img src="https://i.pravatar.cc/150?img=9" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
                  <img src="https://i.pravatar.cc/150?img=8" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-lg" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-base font-bold text-white leading-tight">
                    {t("patientsAssisted")}
                  </p>
                  <p className="text-sm text-white/80 font-normal">
                    {t("since2016")}
                  </p>
                </div>
              </div>

              {/* Google Rating */}
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""} items-center gap-3`}>
                <FcGoogle className="w-12 h-12" />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-3xl font-extrabold text-white leading-none">4.9</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Hidden on Desktop */}
            <div
              className={`lg:hidden flex ${isRTL ? "flex-row-reverse" : ""
                } gap-4 pt-6 flex-wrap`}
            >
              <button className={`group flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-teal-500/50 transform hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span>{t("aboutUs")}</span>
                <svg className={`w-5 h-5 transform transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className={`group flex items-center justify-center gap-2 px-6 py-3 bg-panacea-accent hover:bg-red-700 text-white rounded-lg font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-panacea-accent/50 transform hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span>{t("patientStories")}</span>
                <svg className={`w-5 h-5 transform transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form - Right for LTR, Left for RTL */}
          <div
            className={`${isRTL ? "lg:order-1" : "lg:order-2"
              }`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100">
              <QuoteForm embedded={true} />
            </div>
          </div>
        </div>

        {/* Bottom Buttons - Only visible on Desktop */}
        <div className={`hidden lg:flex ${isRTL ? "flex-row-reverse justify-end" : "justify-start"} gap-4 mt-8`}>
          <button className={`group flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-teal-500/50 transform hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span>{t("aboutUs")}</span>
            <svg className={`w-6 h-6 transform transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className={`group flex items-center gap-3 px-8 py-4 bg-panacea-accent hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-panacea-accent/50 transform hover:scale-105 ${isRTL ? "flex-row-reverse" : ""}`}>
            <span>{t("patientStories")}</span>
            <svg className={`w-6 h-6 transform transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

