
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import AISolutionsContent from "./AISolutionsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "aiSolutions");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/services/ai-solutions`)}`,
            languages: alternateLanguages("/services/ai-solutions"),
        },
    };
}

export default function AISolutionsPage({ params }) {
    return <AISolutionsContent locale={params.locale} />;
}