"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PageHero = ({
  title,
  subtitle,
  backgroundImage,
  fallbackImage = "/images/hero-fallback.jpg",
  locale,
  namespace,
  customContent,
}) => {
  const t = useTranslations(namespace);
  const isRTL = locale === "ar";

  // Use provided title/subtitle or fallback to translations
  const displayTitle = title || t("title");
  const displaySubtitle = subtitle || t("subtitle");

  // Use backgroundImage if provided, otherwise fallback
  const heroImage = backgroundImage || fallbackImage;

  return (
    <section className="relative w-full min-h-[450px] md:min-h-[550px] lg:min-h-[650px] overflow-hidden bg-panacea-primary">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt={displayTitle}
          fill
          className="object-cover opacity-40"
          priority
          quality={90}
        />
        
        {/* Panacea Brand Gradient Overlay - Teal Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: isRTL
              ? "linear-gradient(135deg, rgba(11, 77, 94, 0.95) 0%, rgba(20, 145, 155, 0.90) 50%, rgba(243, 112, 33, 0.15) 100%)"
              : "linear-gradient(135deg, rgba(243, 112, 33, 0.15) 0%, rgba(20, 145, 155, 0.90) 50%, rgba(11, 77, 94, 0.95) 100%)",
          }}
        />
        
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[450px] md:min-h-[550px] lg:min-h-[650px] flex items-center">
        <div
          className={`max-w-5xl ${isRTL ? "text-right mr-0 ml-auto" : "text-left ml-0 mr-auto"} w-full`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {customContent ? (
            customContent
          ) : (
            <div className="space-y-6 md:space-y-8">
              {/* Decorative Top Line - Orange Accent */}
              <div
                className={`w-20 h-1 bg-panacea-accent rounded-full ${
                  isRTL ? "mr-0 ml-auto" : "ml-0 mr-auto"
                }`}
                style={{
                  boxShadow: "0 0 20px rgba(243, 112, 33, 0.6)",
                }}
              />

              {/* Title */}
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight ${
                  isRTL ? "font-arabic" : ""
                }`}
                style={{
                  textShadow: "4px 4px 12px rgba(0,0,0,0.8), 0 0 40px rgba(11, 77, 94, 0.3)",
                  letterSpacing: isRTL ? "normal" : "-0.02em",
                }}
              >
                {displayTitle}
              </h1>

              {/* Subtitle */}
              <p
                className={`text-xl sm:text-2xl md:text-3xl text-panacea-light font-medium max-w-3xl leading-relaxed ${
                  isRTL ? "font-arabic" : ""
                }`}
                style={{
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                }}
              >
                {displaySubtitle}
              </p>

              {/* Accent Line with Glow - Orange Gradient */}
              <div
                className={`w-32 h-1.5 rounded-full ${
                  isRTL ? "mr-0 ml-auto" : "ml-0 mr-auto"
                }`}
                style={{
                  background: "linear-gradient(90deg, #F37021 0%, #F79F4F 100%)",
                  boxShadow: "0 4px 20px rgba(243, 112, 33, 0.6), 0 0 40px rgba(243, 112, 33, 0.4)",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Decorative Gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(11, 77, 94, 0.3), transparent)",
        }}
      />
      
      {/* Corner Accent (Bottom Right for LTR, Bottom Left for RTL) - Orange */}
      <div 
        className={`absolute bottom-0 ${isRTL ? "left-0" : "right-0"} w-64 h-64 pointer-events-none`}
        style={{
          background: "radial-gradient(circle at center, rgba(243, 112, 33, 0.2) 0%, transparent 70%)",
        }}
      />
    </section>
  );
};

export default PageHero;
