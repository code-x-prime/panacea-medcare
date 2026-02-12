import HospitalDetailContent from "./HospitalDetailContent";
import { getHospitalBySlug } from "@/data/hospitalsData";

export async function generateMetadata({ params: { locale, slug } }) {
    const hospital = getHospitalBySlug(slug);

    if (!hospital) {
        return {
            title: "Hospital Not Found",
        };
    }

    const name = locale === "ar" ? (hospital.nameAr || hospital.name) : locale === "fr" ? (hospital.nameFr || hospital.name) : hospital.name;
    const description = locale === "ar" ? (hospital.about?.shortAr || hospital.about?.short) : locale === "fr" ? (hospital.about?.shortFr || hospital.about?.short) : (hospital.about?.short || `Details about ${name}`);

    return {
        title: `${name} - Panacea Medcare`,
        description: description,
        openGraph: {
            title: name,
            description: description,
            images: hospital.images && hospital.images.length > 0 ? [hospital.images[0]] : [],
        },
    };
}

export default function HospitalDetailPage({ params }) {
    return <HospitalDetailContent params={params} />;
}
