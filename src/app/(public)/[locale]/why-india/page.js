
import WhyIndiaContent from "./WhyIndiaContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "whyIndia" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["Medical Value Travel India", "Why Choose India", "Affordable Healthcare", "JCI Accredited Hospitals India"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://panaceamedcare.com/${locale}/why-india`,
            type: "website",
            images: [
                {
                    url: "/images/og-why-india.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function WhyIndiaPage({ params }) {
    return <WhyIndiaContent locale={params.locale} />;
}
