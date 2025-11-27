// src/app/(public)/[locale]/layout.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import env from "@/config/env";

export const metadata = {
  title: env.NEXT_PUBLIC_SITE_NAME,
  description: "Your trusted partner in healthcare excellence",
};

export default function PublicLayout({ children, params }) {
  const locale = params.locale || 'en';

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <Chatbot locale={locale} />
    </div>
  );
}

