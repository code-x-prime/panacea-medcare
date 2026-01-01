// src/app/layout.js
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LocaleProvider from "@/components/LocaleProvider";
import env from "@/config/env";
import { Raleway } from "next/font/google";

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
        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
