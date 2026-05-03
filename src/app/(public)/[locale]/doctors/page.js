import DoctorsContent from "./DoctorsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "doctors");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/doctors`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/doctors",
                "fr": "https://www.panaceamedcare.com/fr/doctors",
                "ar": "https://www.panaceamedcare.com/ar/doctors",
            },
        },
    };
}

export default function DoctorsPage({ params }) {
    return <DoctorsContent params={params} />;
}
