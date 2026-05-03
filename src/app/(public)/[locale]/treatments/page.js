
import { getMessages } from "@/lib/getMessages";
import TreatmentsContent from "./TreatmentsContent";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "treatments");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/treatments`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/treatments",
                "fr": "https://www.panaceamedcare.com/fr/treatments",
                "ar": "https://www.panaceamedcare.com/ar/treatments",
            },
        },
    };
}

export default function TreatmentsPage({ params: { locale } }) {
    return <TreatmentsContent locale={locale} />;
}



