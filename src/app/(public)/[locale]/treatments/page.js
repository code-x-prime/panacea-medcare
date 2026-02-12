
import { getTranslations } from "next-intl/server";
import TreatmentsContent from "./TreatmentsContent";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "treatments" });

    return {
        title: t("title"),
        description: t("intro"),
        openGraph: {
            title: t("title"),
            description: t("intro"),
            images: [
                {
                    url: "/images/og-treatments.jpg", // Ensure this image exists or use a generic one
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function TreatmentsPage({ params: { locale } }) {
    return <TreatmentsContent locale={locale} />;
}



