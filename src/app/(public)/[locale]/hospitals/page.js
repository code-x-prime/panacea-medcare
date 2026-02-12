import HospitalsContent from "./HospitalsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale });

    // Manual fallback for titles
    const titleMap = {
        en: "Network Hospitals - Panacea Medcare",
        ar: "المستشفيات الشريكة - باناسيا ميد كير",
        fr: "Nos Hôpitaux Partenaires - Panacea Medcare"
    };

    const descMap = {
        en: "Explore our network of accredited hospitals in India, Thailand, Turkey, and UAE.",
        ar: "استكشف شبكة المستشفيات المعتمدة لدينا في الهند وتايلاند وتركيا والإمارات.",
        fr: "Explorez notre réseau d'hôpitaux accrédités en Inde, Thaïlande, Turquie et aux EAU."
    };

    return {
        title: titleMap[locale] || titleMap.en,
        description: descMap[locale] || descMap.en,
        openGraph: {
            title: titleMap[locale] || titleMap.en,
            description: descMap[locale] || descMap.en,
            type: "website",
        },
    };
}

export default function HospitalsPage({ params }) {
    return <HospitalsContent params={params} />;
}
