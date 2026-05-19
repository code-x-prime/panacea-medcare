
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import PartnerWithUsContent from "./PartnerWithUsContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "partnerWithUs");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/partner-with-us`)}`,
            languages: alternateLanguages("/partner-with-us"),
        },
    };
}

export default function PartnerWithUsPage({ params }) {
    return <PartnerWithUsContent locale={params.locale} />;
}
