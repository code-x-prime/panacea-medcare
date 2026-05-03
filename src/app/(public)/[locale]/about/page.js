
import AboutContent from "./AboutContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "about");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/about`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/about",
                "fr": "https://www.panaceamedcare.com/fr/about",
                "ar": "https://www.panaceamedcare.com/ar/about",
            },
        },
    };
}

export default function AboutPage({ params }) {
    return <AboutContent locale={params.locale} />;
}
