"use client";
import React, { useState } from "react";
import { localePath } from "@/lib/locale/routing";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import BookingModal from "@/components/BookingModal";
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  Globe2,
  HeartPulse,
  Building2,
  UserCheck,
  Plane,
  FileText,
  PhoneCall,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Stethoscope,
  MapPin,
  Calendar,
  HelpCircle,
  Heart,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function MedicalTourismIndiaContent({ locale }) {
  const t = useTranslations("medicalTourismIndia");
  const isRTL = locale === "ar";
  const [openFaq, setOpenFaq] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbItems = [
    { label: locale === "ar" ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: localePath(locale, "/") },
    { label: locale === "ar" ? "السياحة العلاجية في الهند" : locale === "fr" ? "Tourisme Médical en Inde" : "Medical Tourism India", href: localePath(locale, "/medical-tourism-india") },
  ];

  const whyChooseIndiaItems = t.raw("whyChooseIndia.items") || [];
  const whyPanaceaItems = t.raw("whyPanacea.items") || [];
  const treatmentsList = t.raw("treatments.items") || [];
  const hospitalsList = t.raw("hospitals.list") || [];
  const doctorsList = t.raw("doctors.list") || [];
  const processSteps = t.raw("process.steps") || [];
  const countriesList = t.raw("countries.list") || [];
  const faqsList = t.raw("faqs.items") || [];

  const iconsMap = {
    specialists: UserCheck,
    hospitals: Building2,
    affordable: Award,
    technology: Sparkles,
    fasterAccess: Clock,
    support: Globe2,
    trustedCompany: ShieldCheck,
    planning: FileText,
    support247: PhoneCall,
    matching: HeartPulse,
    estimates: Award,
    visa: FileText,
    pickup: Plane,
    accommodation: Building2,
    interpreter: Globe2,
    followUp: Stethoscope,
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className="bg-slate-50 min-h-screen text-slate-800">
      {/* Modern Clean Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#f8faff] via-[#fbfdff] to-[#f4f7ff] pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200/60">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <Breadcrumb items={breadcrumbItems} locale={locale} />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Heading, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#1e293b] leading-[1.16] tracking-tight">
                {locale === "en" ? (
                  <>
                    Medical Tourism India: <br className="hidden sm:inline" />
                    Your Trusted Partner for{" "}
                    <span className="text-[#7c5dfa]">World-Class Healthcare</span>{" "}
                    in India
                  </>
                ) : (
                  t("hero.title")
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#64748b] leading-relaxed font-normal max-w-xl">
                {t("intro.p1")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#1c275a] hover:bg-[#131b40] text-white font-medium px-7 py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-base group cursor-pointer"
                >
                  <span>{t("hero.bookAppointment")}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </button>

                <a
                  href="https://wa.me/919958800961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#334155] font-medium px-6 py-3.5 rounded-full border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200 text-base"
                >
                  <PhoneCall className="w-4 h-4 text-[#334155]" />
                  <span>{t("hero.talkCoordinator")}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Floating Badges */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none px-4 sm:px-6 lg:px-0">
                {/* Main Card with Soft Pink/Warm Container matching the reference image */}
                <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#fed7dc] p-3 sm:p-4 shadow-sm">
                  <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-slate-100">
                    <Image
                      src="/images/medical_tourism_hero.png"
                      alt="Medical Tourism India"
                      fill
                      className="object-cover object-center"
                      priority
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = "/medical-consultation.jpg";
                      }}
                    />
                  </div>
                </div>

                {/* Floating Badge 1 - Top Left */}
                <div
                  className={`absolute -top-3 sm:-top-4 ${
                    isRTL ? "-right-2 sm:right-2" : "-left-2 sm:left-2"
                  } bg-white rounded-2xl py-3 px-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 z-20`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f4effe] text-[#7c5dfa] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-[#7c5dfa]" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <div className="text-xs sm:text-sm font-bold text-[#1e293b] leading-tight">
                      {t("hero.badge1Title")}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#64748b] font-medium">
                      {t("hero.badge1Sub")}
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 - Bottom Right */}
                <div
                  className={`absolute -bottom-3 sm:-bottom-4 ${
                    isRTL ? "-left-2 sm:left-2" : "-right-2 sm:right-2"
                  } bg-white rounded-2xl py-3 px-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 z-20`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <div className="text-xs sm:text-sm font-bold text-[#1e293b] leading-tight">
                      {t("hero.badge2Title")}
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#64748b] font-medium">
                      {t("hero.badge2Sub")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Medical Tourism India? */}
      <section className="container mx-auto px-4 xl:max-w-7xl py-10 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
            {t("whyChooseIndia.title")}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {t("whyChooseIndia.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseIndiaItems.map((item) => {
            const IconComponent = iconsMap[item.id] || CheckCircle2;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-panacea-primary to-panacea-secondary rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-panacea-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Panacea Medcare */}
      <section className="bg-slate-100 py-12 md:py-20 border-y border-slate-200">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-panacea-accent font-bold tracking-wider uppercase text-sm mb-2 block">
              {locale === "ar" ? "الميزة التنافسية" : locale === "fr" ? "Notre Différence" : "Our Advantage"}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
              {t("whyPanacea.title")}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {t("whyPanacea.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {whyPanaceaItems.map((item) => {
              const IconComponent = iconsMap[item.id] || ShieldCheck;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col hover:border-panacea-primary/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-panacea-primary/10 rounded-xl flex items-center justify-center text-panacea-primary mb-4 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-panacea-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Medical Treatments We Facilitate */}
      <section className="container mx-auto px-4 xl:max-w-7xl py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
            {t("treatments.title")}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {t("treatments.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {treatmentsList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-panacea-primary mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-panacea-accent flex-shrink-0" />
                  {item.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              <Link
                href={localePath(locale, item.slug || "/treatments")}
                className="inline-flex items-center gap-2 text-panacea-secondary font-bold text-sm hover:underline"
              >
                <span>{locale === "ar" ? "اعرف المزيد" : locale === "fr" ? "En savoir plus" : "Learn More"}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={localePath(locale, "/treatments")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-panacea-primary to-panacea-secondary text-white font-bold px-8 py-4 rounded-xl hover:opacity-95 transition-opacity shadow-md"
          >
            <span>{t("treatments.cta")}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>

      {/* Leading Hospitals */}
      <section className="bg-slate-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {t("hospitals.title")}
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {t("hospitals.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {hospitalsList.map((hosp, idx) => (
              <Link
                key={idx}
                href={localePath(locale, hosp.slug)}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 group flex flex-col items-center justify-center min-h-[110px]"
              >
                <Building2 className="w-7 h-7 text-panacea-accent mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm md:text-base text-slate-100 group-hover:text-white">
                  {hosp.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={localePath(locale, "/hospitals")}
              className="inline-flex items-center gap-2 bg-panacea-accent hover:bg-panacea-accent/90 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
            >
              <span>{t("hospitals.cta")}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Leading Specialists */}
      <section className="container mx-auto px-4 xl:max-w-7xl py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
            {t("doctors.title")}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {t("doctors.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {doctorsList.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-panacea-primary/10 text-panacea-primary rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-panacea-primary">{doc}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {locale === "ar" ? "أخصائي معتمد" : locale === "fr" ? "Spécialiste Certifié" : "Senior Specialist"}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={localePath(locale, "/doctors")}
            className="inline-flex items-center gap-2 bg-panacea-primary hover:bg-panacea-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-md"
          >
            <span>{t("doctors.cta")}</span>
            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-slate-100 py-12 md:py-20 border-t border-slate-200">
        <div className="container mx-auto px-4 xl:max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
              {t("process.title")}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              {t("process.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-panacea-accent text-white rounded-full flex items-center justify-center font-extrabold text-lg mb-4 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-panacea-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Serve */}
      <section className="container mx-auto px-4 xl:max-w-7xl py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4">
          {t("countries.title")}
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          {t("countries.description")}
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {countriesList.map((country, idx) => (
            <span
              key={idx}
              className="bg-white border border-slate-200 text-panacea-primary font-semibold px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2 text-sm hover:border-panacea-accent transition-colors"
            >
              <MapPin className="w-4 h-4 text-panacea-accent" />
              {country}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 xl:max-w-7xl my-10">
        <div className="bg-gradient-to-br from-panacea-primary via-panacea-secondary to-panacea-primary text-white rounded-3xl p-8 md:p-14 text-center shadow-xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-4xl mx-auto leading-tight">
            {t("ctaSection.title")}
          </h2>
          <p className="text-white/90 text-base md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("ctaSection.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919958800961"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-lg"
            >
              <FaWhatsapp className="w-6 h-6" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href={localePath(locale, "/consult-online")}
              className="inline-flex items-center gap-3 bg-white text-panacea-primary hover:bg-slate-100 font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-lg"
            >
              <Calendar className="w-6 h-6 text-panacea-primary" />
              <span>{locale === "ar" ? "احجز رأي طبي مجاني" : locale === "fr" ? "Obtenir un avis médical" : "Get Free Opinion"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 xl:max-w-4xl py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-panacea-dark mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-panacea-accent" />
            {t("faqs.title")}
          </h2>
        </div>

        <div className="space-y-4">
          {faqsList.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 font-bold text-panacea-primary text-base md:text-lg focus:outline-none"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <span className={isRTL ? "text-right" : "text-left"}>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-panacea-accent flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-6 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-4"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
      />
    </main>
  );
}
