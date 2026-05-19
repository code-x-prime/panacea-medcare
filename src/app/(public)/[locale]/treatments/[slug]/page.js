
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
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
            canonical: `${siteUrl(locale, `/treatments/${slug}`)}`,
            languages: alternateLanguages(`/treatments/${slug}`),
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
