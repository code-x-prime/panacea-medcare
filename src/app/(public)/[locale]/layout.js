// src/app/(public)/[locale]/layout.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import env from "@/config/env";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: env.NEXT_PUBLIC_SITE_NAME,
  description: "Your trusted partner in healthcare excellence",
};

export default async function PublicLayout({ children, params }) {
  const locale = params.locale || 'en';

  // Get messages for the specific locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <Chatbot locale={locale} />
        <WhatsAppButton locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

