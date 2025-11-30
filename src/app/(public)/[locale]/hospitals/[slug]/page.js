import HospitalDetail from "@/components/HospitalDetail";
import { getHospitalBySlug } from "@/data/hospitals";
import { notFound } from "next/navigation";

export default async function HospitalPage({ params }) {
    const { locale, slug } = params;

    // Fetch hospital data based on slug
    const hospitalData = getHospitalBySlug(slug);

    // If hospital not found, show 404
    if (!hospitalData) {
        notFound();
    }

    return <HospitalDetail locale={locale} hospitalData={hospitalData} />;
}

// Optional: Generate static params for known hospitals
export async function generateStaticParams() {
    return [
        { slug: 'medanta-gurgaon' },
        { slug: 'indraprastha-apollo-hospital-new-delhi' },
        { slug: 'kokilaben-hospital-mumbai' },
        { slug: 'apollo-hospital-chennai' },
    ];
}
