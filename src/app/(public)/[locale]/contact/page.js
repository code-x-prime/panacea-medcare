import ContactContent from "./ContactContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "contact");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/contact`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/contact",
                "fr": "https://www.panaceamedcare.com/fr/contact",
                "ar": "https://www.panaceamedcare.com/ar/contact",
            },
        },
    };
}

export default function ContactPage({ params }) {
    return <ContactContent locale={params.locale} />;
}
