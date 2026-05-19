
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import InternationalPatientsContent from "./InternationalPatientsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "internationalPatients");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/international-patients`)}`,
            languages: alternateLanguages("/international-patients"),
        },
    };
}

export default function InternationalPatientsPage({ params }) {
    return <InternationalPatientsContent locale={params.locale} />;
}
