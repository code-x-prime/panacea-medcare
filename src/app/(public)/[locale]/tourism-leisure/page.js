
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import TourismLeisureContent from "./TourismLeisureContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "tourismLeisure");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/tourism-leisure`)}`,
            languages: alternateLanguages("/tourism-leisure"),
        },
    };
}

export default function TourismLeisurePage({ params }) {
    return <TourismLeisureContent locale={params.locale} />;
}
