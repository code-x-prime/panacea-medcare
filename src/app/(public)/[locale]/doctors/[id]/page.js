import DoctorDetailContent from "./DoctorDetailContent";
import doctors from "@/data/doctors.json";

export async function generateMetadata({ params: { locale, id } }) {
    const doctor = doctors.find(d => d.id === id);

    if (!doctor) {
        return {
            title: "Doctor Not Found - Panacea Medcare",
        };
    }

    const title = `${doctor.name} - ${doctor.specialty} | Panacea Medcare`;
    const description = `${doctor.name} is a ${doctor.specialty} at ${doctor.hospital}. Book an appointment now.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "profile",
            images: doctor.image ? [{ url: doctor.image, alt: doctor.name }] : [],
        },
    };
}

export default function DoctorDetailPage({ params }) {
    return <DoctorDetailContent params={params} />;
}
