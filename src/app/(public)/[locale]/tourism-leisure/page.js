
import TourismLeisureContent from "./TourismLeisureContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "tourismLeisure" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["Medical Tourism India", "Health and Leisure", "Ayurvedic Spa India", "Taj Mahal Tour"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://www.panaceamedcare.com/${locale}/tourism-leisure`,
            type: "website",
            images: [
                {
                    url: "/images/og-tourism.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function TourismLeisurePage({ params }) {
    return <TourismLeisureContent locale={params.locale} />;
}
