
import AboutContent from "./AboutContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "about" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["About Panacea Medcare", "Medical Tourism India", "Healthcare Services", "International Patient Care"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://www.panaceamedcare.com/${locale}/about`,
            type: "website",
            images: [
                {
                    url: "/images/og-about.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function AboutPage({ params }) {
    return <AboutContent locale={params.locale} />;
}
