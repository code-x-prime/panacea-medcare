// src/components/Header.js
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import env from "@/config/env";

export default function Header({ locale }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold text-panacea-primary"
          >
            {env.NEXT_PUBLIC_SITE_NAME}
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-panacea-primary transition"
            >
              Home
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </nav>
        </div>
      </div>
    </header>
  );
}
