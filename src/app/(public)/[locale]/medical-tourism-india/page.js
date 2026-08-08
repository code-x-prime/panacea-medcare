import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import MedicalTourismIndiaContent from "./MedicalTourismIndiaContent";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "medicalTourismIndia");

    return {
        title: messages.seo?.title || "Medical Tourism India | Trusted Medical Tourism Company",
        description: messages.seo?.description || "Trusted Medical Tourism Company India serving patients across 30+ countries. Access leading hospitals, expert doctors, affordable Medical Treatment in India & complete travel support.",
        alternates: {
            canonical: `${siteUrl(locale, "/medical-tourism-india")}`,
            languages: alternateLanguages("/medical-tourism-india"),
        },
    };
}

export default function MedicalTourismIndiaPage({ params }) {
    return <MedicalTourismIndiaContent locale={params.locale} />;
}
