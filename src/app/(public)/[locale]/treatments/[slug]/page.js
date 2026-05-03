
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import TreatmentDetailContent from "./TreatmentDetailContent";
import { getTreatmentBySlug } from "@/data/treatmentsData";

export async function generateMetadata({ params }) {
    const { locale, slug } = params;
    const treatment = getTreatmentBySlug(slug);

    if (!treatment) {
        return {};
    }

    return {
        title: treatment.seoTitle?.[locale] || treatment.name,
        description: treatment.seoDescription?.[locale] || "",
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/treatments/${slug}`,
            languages: {
                "en": `https://www.panaceamedcare.com/en/treatments/${slug}`,
                "fr": `https://www.panaceamedcare.com/fr/treatments/${slug}`,
                "ar": `https://www.panaceamedcare.com/ar/treatments/${slug}`,
            },
        },
    };
}

export default function TreatmentDetailPage({ params }) {
    const { locale, slug } = params;
    const treatment = getTreatmentBySlug(slug);

    if (!treatment) {
        notFound();
    }

    return (
        <TreatmentDetailContent
            locale={locale}
            treatment={treatment}
            namespace={treatment.namespace}
        />
    );
}
