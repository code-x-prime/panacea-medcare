
import PartnerWithUsContent from "./PartnerWithUsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "partnerWithUs" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["Partner with Panacea Medcare", "Medical Tourism Franchise", "Healthcare Partnership", "Global Healthcare Network"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://www.panaceamedcare.com/${locale}/partner-with-us`,
            type: "website",
            images: [
                {
                    url: "/images/og-partner.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function PartnerWithUsPage({ params }) {
    return <PartnerWithUsContent locale={params.locale} />;
}
