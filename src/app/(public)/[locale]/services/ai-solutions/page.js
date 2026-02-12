
import AISolutionsContent from "./AISolutionsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "aiSolutions" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["AI Healthcare Solutions", "Telemedicine Platform", "AI Teleradiology", "Digital Health"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://panaceamedcare.com/${locale}/services/ai-solutions`,
            type: "website",
            images: [
                {
                    url: "/images/og-ai-solutions.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function AISolutionsPage({ params }) {
    return <AISolutionsContent locale={params.locale} />;
}