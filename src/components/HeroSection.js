"use client";

import QuoteForm from "./QuoteForm";

export default function HeroSection({ messages, locale }) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-panacea-primary mb-6">
            {messages.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {messages.heroSubtitle}
          </p>
          <QuoteForm
            trigger={
              <button className="inline-block px-8 py-3 bg-panacea-primary text-white rounded-lg hover:bg-panacea-accent transition font-semibold">
                {messages.ctaLabel}
              </button>
            }
          />
        </div>
        <div className="hidden md:block">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}



