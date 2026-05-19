import DoctorsContent from "./DoctorsContent";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "doctors");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/doctors`)}`,
            languages: alternateLanguages("/doctors"),
        },
    };
}

export default function DoctorsPage({ params }) {
    return <DoctorsContent params={params} />;
}
