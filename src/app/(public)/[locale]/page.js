// src/app/(public)/[locale]/page.js
import { getMessages } from '@/lib/getMessages';
import HeroSection from '@/components/HeroSection';
import TopMedicalDestinations from '@/components/TopMedicalDestinations';

export default async function HomePage({ params }) {
  const locale = params.locale || 'en';
  const messages = await getMessages(locale, 'home');

  return (
    <div className="bg-white">
      <HeroSection messages={messages} locale={locale} />
      <TopMedicalDestinations locale={locale} />
    </div>
  );
}



