"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function WhatsAppButton({ locale }) {
    const t = useTranslations("whatsapp");
    const isRTL = locale === "ar";

    // WhatsApp number - update with actual number
    const whatsappNumber = "1234567890"; // Replace with actual WhatsApp number
    const whatsappMessage = encodeURIComponent(
        t("defaultMessage") || "Hello, I need medical assistance"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-28 ${isRTL ? "left-6" : "right-6"} w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center z-40 transform hover:scale-110 group`}
            aria-label={t("buttonLabel") || "Chat on WhatsApp"}
        >
            <FaWhatsapp className="w-8 h-8 group-hover:scale-110 transition-transform" />
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
        </a>
    );
}

