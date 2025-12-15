// src/app/(public)/[locale]/page.js
import HeroSection from '@/components/HeroSection';
import PatientStories from '@/components/PatientStories';
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

export default function HomePage({ params }) {
  const { locale } = params;

  return (
    <div>
      <HeroSection locale={locale} />
      <PatientStories locale={locale} />
      <TopMedicalDestinations locale={locale} />
      <NetworkOfTopHospitals locale={locale} />
      <LowestQuotesAssured locale={locale} />
      <MultiSpecialtyFocus locale={locale} />
      <WhyChoosePanacea locale={locale} />
      <NeedAssistanceButton locale={locale} />
      <HowWeWork locale={locale} />
      <OurServices locale={locale} />
      <TestimonialsCarousel />
      <FAQ locale={locale} />
    </div>
  );
}
