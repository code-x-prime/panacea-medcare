import HospitalDetailContent from "./HospitalDetailContent";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
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
            canonical: `${siteUrl(locale, `/hospitals/${slug}`)}`,
            languages: alternateLanguages(`/hospitals/${slug}`),
        },
    };
}

export default function HospitalDetailPage({ params }) {
    return <HospitalDetailContent params={params} />;
}
