"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function NeedAssistanceButton({ locale }) {
    const t = useTranslations("specialties");
    const isRTL = locale === "ar";

    return (
        <div className="flex justify-center py-8">
            <Link
                href={`/${locale}/consult-online`}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-panacea-accent to-red-600 hover:from-red-700 hover:to-panacea-accent text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isRTL ? "flex-row-reverse" : ""
                    }`}
            >
                <MessageCircle className="w-6 h-6" />
                <span>{t("needAssistance")}</span>
            </Link>
        </div>
    );
}
