
import TeleconsultationContent from "./TeleconsultationContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "teleconsultation" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["Teleconsultation", "Online Doctor Consultation", "Virtual Medical Services", "Remote Healthcare"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://www.panaceamedcare.com/${locale}/services/teleconsultation`,
            type: "website",
            images: [
                {
                    url: "/images/og-teleconsultation.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function TeleconsultationPage({ params }) {
    return <TeleconsultationContent locale={params.locale} />;
}
