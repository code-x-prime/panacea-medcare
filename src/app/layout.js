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
  metadataBase: new URL('https://www.panaceamedcare.com'),
  title: env.NEXT_PUBLIC_SITE_NAME,
  description: "Your trusted partner in healthcare excellence",
  verification: {
    google: "0cIlg3ZIREwnOyuqd3qWtnKRDMKCMpOnFQA8EdSiLy0",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NP4R37SX');`}
        </Script>
        {/* End Google Tag Manager  */}
        <meta name="google-site-verification" content="0cIlg3ZIREwnOyuqd3qWtnKRDMKCMpOnFQA8EdSiLy0" />
      </head>
      <body className={`${raleway.variable} font-sans overflow-x-hidden`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP4R37SX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager */}

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
