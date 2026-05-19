
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import { getMessages } from "@/lib/getMessages";
import TreatmentsContent from "./TreatmentsContent";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "treatments");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/treatments`)}`,
            languages: alternateLanguages("/treatments"),
        },
    };
}

export default function TreatmentsPage({ params: { locale } }) {
    return <TreatmentsContent locale={locale} />;
}



