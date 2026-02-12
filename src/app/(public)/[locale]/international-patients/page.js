
import InternationalPatientsContent from "./InternationalPatientsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "internationalPatients" });

    return {
        title: t("title"),
        description: t("subtitle"),
        keywords: ["International Patients", "Medical Tourism Guide", "Treatment Process", "Visa Assistance"],
        openGraph: {
            title: t("title"),
            description: t("subtitle"),
            url: `https://panaceamedcare.com/${locale}/international-patients`,
            type: "website",
            images: [
                {
                    url: "/images/og-international.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
        },
    };
}

export default function InternationalPatientsPage({ params }) {
    return <InternationalPatientsContent locale={params.locale} />;
}
