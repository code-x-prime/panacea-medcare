// src/app/layout.js
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LocaleProvider from "@/components/LocaleProvider";
import env from "@/config/env";

export const metadata = {
  title: env.NEXT_PUBLIC_SITE_NAME,
  description: "Your trusted partner in healthcare excellence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-ltr">
        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
