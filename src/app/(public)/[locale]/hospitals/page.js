import HospitalsContent from "./HospitalsContent";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "hospitals");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/hospitals`)}`,
            languages: alternateLanguages("/hospitals"),
        },
    };
}

export default function HospitalsPage({ params }) {
    return <HospitalsContent params={params} />;
}
