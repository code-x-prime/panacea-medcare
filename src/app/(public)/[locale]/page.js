// src/app/(public)/[locale]/page.js
import { getMessages } from '@/lib/getMessages';
import Link from 'next/link';

export default async function HomePage({ params }) {
  const locale = params.locale || 'en';
  const messages = await getMessages(locale, 'home');

  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-panacea-primary mb-6">
            {messages.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {messages.heroSubtitle}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-panacea-primary text-white rounded-lg hover:bg-panacea-accent transition font-semibold"
          >
            {messages.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}

