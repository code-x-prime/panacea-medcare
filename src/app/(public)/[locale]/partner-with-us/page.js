
import PartnerWithUsContent from "./PartnerWithUsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "partnerWithUs");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/partner-with-us`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/partner-with-us",
                "fr": "https://www.panaceamedcare.com/fr/partner-with-us",
                "ar": "https://www.panaceamedcare.com/ar/partner-with-us",
            },
        },
    };
}

export default function PartnerWithUsPage({ params }) {
    return <PartnerWithUsContent locale={params.locale} />;
}
