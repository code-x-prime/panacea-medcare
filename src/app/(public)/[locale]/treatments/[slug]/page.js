
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import TreatmentDetailContent from "./TreatmentDetailContent";
import { getTreatmentBySlug } from "@/data/treatmentsData";

export async function generateMetadata({ params: { locale, slug } }) {
    const treatment = getTreatmentBySlug(slug);

    if (!treatment) {
        return {};
    }

    const t = await getTranslations({ locale, namespace: treatment.namespace });

    return {
        title: `${t("title")} - Panacea Medcare`,
        description: t("intro"),
        openGraph: {
            title: t("title"),
            description: t("intro"),
            images: [
                {
                    url: `/treatment/${slug}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: t("title"),
                },
            ],
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
