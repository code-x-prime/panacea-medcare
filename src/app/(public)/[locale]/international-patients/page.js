
import InternationalPatientsContent from "./InternationalPatientsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "internationalPatients");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/international-patients`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/international-patients",
                "fr": "https://www.panaceamedcare.com/fr/international-patients",
                "ar": "https://www.panaceamedcare.com/ar/international-patients",
            },
        },
    };
}

export default function InternationalPatientsPage({ params }) {
    return <InternationalPatientsContent locale={params.locale} />;
}
