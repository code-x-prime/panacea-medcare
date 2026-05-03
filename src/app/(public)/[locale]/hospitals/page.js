import HospitalsContent from "./HospitalsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "hospitals");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/hospitals`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/hospitals",
                "fr": "https://www.panaceamedcare.com/fr/hospitals",
                "ar": "https://www.panaceamedcare.com/ar/hospitals",
            },
        },
    };
}

export default function HospitalsPage({ params }) {
    return <HospitalsContent params={params} />;
}
