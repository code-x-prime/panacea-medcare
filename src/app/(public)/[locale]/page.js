// src/app/(public)/[locale]/page.js
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const messages = await getMessages(locale, "home");

  return {
    title: messages.seo?.title,
    description: messages.seo?.description,
    alternates: {
      canonical: `https://www.panaceamedcare.com/${locale}`,
      languages: {
        "en": "https://www.panaceamedcare.com/en",
        "fr": "https://www.panaceamedcare.com/fr",
        "ar": "https://www.panaceamedcare.com/ar",
      },
    },
  };
}

import HeroSection from '@/components/HeroSection';
// import PatientStories from '@/components/PatientStories';
import TopMedicalDestinations from '@/components/TopMedicalDestinations';
import NetworkOfTopHospitals from '@/components/NetworkOfTopHospitals';
import LowestQuotesAssured from '@/components/LowestQuotesAssured';
import HowWeWork from '@/components/HowWeWork';
import OurServices from '@/components/OurServices';
import FAQ from '@/components/FAQ';
import MultiSpecialtyFocus from '@/components/MultiSpecialtyFocus';
import NeedAssistanceButton from '@/components/NeedAssistanceButton';
import WhyChoosePanacea from '@/components/WhyChoosePanacea';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import BlogSection from '@/components/BlogSection';
import CaseStudies from '@/components/CaseStudies';
// import HomeCaseStudiesPreview from '@/components/HomeCaseStudiesPreview';
import HomeOfficesPreview from '@/components/HomeOfficesPreview';
import TrustStrip from '@/components/TrustStrip';

export default function HomePage({ params }) {
  const { locale } = params;

  return (
    <div>
      <HeroSection locale={locale} />
      <TrustStrip locale={locale} />
      <TestimonialsCarousel />
      {/* <PatientStories locale={locale} /> */}
      <TopMedicalDestinations locale={locale} />
      <NetworkOfTopHospitals locale={locale} />
      <LowestQuotesAssured locale={locale} />
      {/* <HomeCaseStudiesPreview locale={locale} /> */}
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
