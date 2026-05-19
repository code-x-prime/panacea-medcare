import ContactContent from "./ContactContent";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "contact");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/contact`)}`,
            languages: alternateLanguages("/contact"),
        },
    };
}

export default function ContactPage({ params }) {
    return <ContactContent locale={params.locale} />;
}
