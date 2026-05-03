
import AISolutionsContent from "./AISolutionsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "aiSolutions");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/services/ai-solutions`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/services/ai-solutions",
                "fr": "https://www.panaceamedcare.com/fr/services/ai-solutions",
                "ar": "https://www.panaceamedcare.com/ar/services/ai-solutions",
            },
        },
    };
}

export default function AISolutionsPage({ params }) {
    return <AISolutionsContent locale={params.locale} />;
}