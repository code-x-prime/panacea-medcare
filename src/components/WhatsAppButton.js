"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function WhatsAppButton({ locale }) {
    const tWhatsapp = useTranslations("whatsapp");
    const tCTA = useTranslations("contactCTA");
    const isRTL = locale === "ar";

    // WhatsApp number - +91-9958800961
    const whatsappNumber = "919958800961"; // WhatsApp format without + and -
    const whatsappMessage = encodeURIComponent(
        tCTA("whatsappMessage") || tWhatsapp("defaultMessage") || "Hello, I need medical assistance from Panacea Medcare"
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <>
            {/* Small screens: Full-width rectangle at bottom */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-button-mobile"
                className={`md:hidden fixed bottom-0 left-0 right-0 w-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transition-all flex items-center justify-center z-50 py-3 px-4 group`}
                aria-label={tCTA("whatsappButton") || tWhatsapp("buttonLabel") || "Chat on WhatsApp"}
                title={tCTA("whatsappLabel") || "WhatsApp Us"}
            >
                <FaWhatsapp className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="font-semibold text-base">{tCTA("whatsappButton") || tWhatsapp("buttonLabel") || "Chat on WhatsApp"}</span>
            </a>

            {/* Large screens: Floating circular button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-button-desktop"
                className={`hidden md:flex fixed bottom-28 ${isRTL ? "left-6" : "right-6"} w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all items-center justify-center z-40 transform hover:scale-110 group`}
                aria-label={tCTA("whatsappButton") || tWhatsapp("buttonLabel") || "Chat on WhatsApp"}
                title={tCTA("whatsappLabel") || "WhatsApp Us"}
            >
                <FaWhatsapp className="w-8 h-8 group-hover:scale-110 transition-transform" />
                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
            </a>

            {/* Dynamic positioning based on greeting - Desktop only */}
            <style jsx global>{`
            /* Default: When greeting IS visible, position WhatsApp higher - Desktop only */
            @media (min-width: 768px) {
                body:has([data-chat-greeting]) #whatsapp-button-desktop {
                    bottom: 14rem !important;
                }
                
                /* When greeting is NOT visible, move WhatsApp down - Desktop only */
                body:not(:has([data-chat-greeting])) #whatsapp-button-desktop {
                    bottom: 7rem !important;
                }
            }
        `}</style>
        </>
    );
}

