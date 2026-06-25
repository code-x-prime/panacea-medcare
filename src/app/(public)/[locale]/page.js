// src/app/(public)/[locale]/page.js
import { getMessages } from "@/lib/getMessages";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import dynamic from "next/dynamic";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const messages = await getMessages(locale, "home");

  return {
    title: messages.seo?.title,
    description: messages.seo?.description,
    robots: "index, follow",
    alternates: {
      canonical: siteUrl(locale, "/"),
      languages: alternateLanguages("/"),
    },
  };
}

import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";

const TestimonialsCarousel = dynamic(() => import("@/components/TestimonialsCarousel"));
const TopMedicalDestinations = dynamic(() => import("@/components/TopMedicalDestinations"));
const NetworkOfTopHospitals = dynamic(() => import("@/components/NetworkOfTopHospitals"));
const LowestQuotesAssured = dynamic(() => import("@/components/LowestQuotesAssured"));
const MultiSpecialtyFocus = dynamic(() => import("@/components/MultiSpecialtyFocus"));
const WhyChoosePanacea = dynamic(() => import("@/components/WhyChoosePanacea"));
const HomeOfficesPreview = dynamic(() => import("@/components/HomeOfficesPreview"));
const NeedAssistanceButton = dynamic(() => import("@/components/NeedAssistanceButton"));
const HowWeWork = dynamic(() => import("@/components/HowWeWork"));
const OurServices = dynamic(() => import("@/components/OurServices"));
const CaseStudies = dynamic(() => import("@/components/CaseStudies"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));

export default function HomePage({ params }) {
  const { locale } = params;

  return (
    <div>
      <HeroSection locale={locale} />
      <TrustStrip locale={locale} />
      <TestimonialsCarousel />
      <TopMedicalDestinations locale={locale} />
      <NetworkOfTopHospitals locale={locale} />
      <LowestQuotesAssured locale={locale} />
      <MultiSpecialtyFocus locale={locale} />
      <WhyChoosePanacea locale={locale} />
      <HomeOfficesPreview locale={locale} />
      <NeedAssistanceButton locale={locale} />
      <HowWeWork locale={locale} />
      <OurServices locale={locale} />
      <CaseStudies />
      <FAQ locale={locale} />
      <BlogSection locale={locale} />
    </div>
  );
}
