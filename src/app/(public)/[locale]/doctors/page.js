import DoctorsContent from "./DoctorsContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale });

    // Manual fallback for titles since we don't know the exact keys in messages
    const titleMap = {
        en: "Our Doctors - Panacea Medcare",
        ar: "أطباؤنا - باناسيا ميد كير",
        fr: "Nos médecins - Panacea Medcare"
    };

    const descMap = {
        en: "Meet our team of experienced medical professionals at Panacea Medcare.",
        ar: "تعرف على فريقنا من المتخصصين الطبيين ذوي الخبرة في باناسيا ميد كير.",
        fr: "Rencontrez notre équipe de professionnels médicaux expérimentés chez Panacea Medcare."
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

export default function DoctorsPage({ params }) {
    return <DoctorsContent params={params} />;
}
