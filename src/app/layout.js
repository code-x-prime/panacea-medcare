// src/app/layout.js
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LocaleProvider from "@/components/LocaleProvider";
import env from "@/config/env";
import { Raleway } from "next/font/google";

import Script from "next/script";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata = {
  title: env.NEXT_PUBLIC_SITE_NAME,
  description: "Your trusted partner in healthcare excellence",
  verification: {
    google: "vqT3m2txIN7qhJcc-I8YO4ptTR0WKiJAqusG2YEMCvU",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${raleway.variable} font-sans overflow-x-hidden`}>
        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17906869077"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17906869077');
          `}
        </Script>
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17906869077/h12ZCJivl-8bENXG1NpC',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>

        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
