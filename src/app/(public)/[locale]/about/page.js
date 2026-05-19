
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import AboutContent from "./AboutContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "about");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/about`)}`,
            languages: alternateLanguages("/about"),
        },
    };
}

export default function AboutPage({ params }) {
    return <AboutContent locale={params.locale} />;
}
