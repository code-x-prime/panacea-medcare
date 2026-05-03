import HospitalDetailContent from "./HospitalDetailContent";
import { getHospitalBySlug } from "@/data/hospitalsData";

export async function generateMetadata({ params }) {
    const { locale, slug } = params;
    const hospital = getHospitalBySlug(slug);

    if (!hospital) {
        return {
            title: "Hospital Not Found",
        };
    }

    return {
        title: hospital.seoTitle?.[locale] || hospital.name,
        description: hospital.seoDescription?.[locale] || "",
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/hospitals/${slug}`,
            languages: {
                "en": `https://www.panaceamedcare.com/en/hospitals/${slug}`,
                "fr": `https://www.panaceamedcare.com/fr/hospitals/${slug}`,
                "ar": `https://www.panaceamedcare.com/ar/hospitals/${slug}`,
            },
        },
    };
}

export default function HospitalDetailPage({ params }) {
    return <HospitalDetailContent params={params} />;
}
