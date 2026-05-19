
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import WhyIndiaContent from "./WhyIndiaContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "whyIndia");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/why-india`)}`,
            languages: alternateLanguages("/why-india"),
        },
    };
}

export default function WhyIndiaPage({ params }) {
    return <WhyIndiaContent locale={params.locale} />;
}
