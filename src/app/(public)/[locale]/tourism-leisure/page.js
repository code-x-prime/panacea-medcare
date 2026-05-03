
import TourismLeisureContent from "./TourismLeisureContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "tourismLeisure");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/tourism-leisure`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/tourism-leisure",
                "fr": "https://www.panaceamedcare.com/fr/tourism-leisure",
                "ar": "https://www.panaceamedcare.com/ar/tourism-leisure",
            },
        },
    };
}

export default function TourismLeisurePage({ params }) {
    return <TourismLeisureContent locale={params.locale} />;
}
