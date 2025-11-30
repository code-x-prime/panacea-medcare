// src/app/(public)/[locale]/page.js
import HeroSection from '@/components/HeroSection';
import TopMedicalDestinations from '@/components/TopMedicalDestinations';
import NetworkOfTopHospitals from '@/components/NetworkOfTopHospitals';
import MultiSpecialtyFocus from '@/components/MultiSpecialtyFocus';
import NeedAssistanceButton from '@/components/NeedAssistanceButton';
import WhyChoosePanacea from '@/components/WhyChoosePanacea';

export default function HomePage({ params }) {
  const { locale } = params;

  return (
    <div>
      <HeroSection locale={locale} />
      <TopMedicalDestinations locale={locale} />
      <NetworkOfTopHospitals locale={locale} />
      <MultiSpecialtyFocus locale={locale} />
      <WhyChoosePanacea locale={locale} />
      <NeedAssistanceButton locale={locale} />
    </div>
  );
}
