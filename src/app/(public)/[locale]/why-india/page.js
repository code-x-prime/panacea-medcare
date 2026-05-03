
import WhyIndiaContent from "./WhyIndiaContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "whyIndia");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/why-india`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/why-india",
                "fr": "https://www.panaceamedcare.com/fr/why-india",
                "ar": "https://www.panaceamedcare.com/ar/why-india",
            },
        },
    };
}

export default function WhyIndiaPage({ params }) {
    return <WhyIndiaContent locale={params.locale} />;
}
