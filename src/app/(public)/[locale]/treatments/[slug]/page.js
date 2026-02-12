
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import TreatmentDetailContent from "./TreatmentDetailContent";
import { getTreatmentBySlug } from "@/data/treatmentsData";

console.log("--------------------------------------------------");
console.log("[MODULE] Loading src/app/(public)/[locale]/treatments/[slug]/page.js");
console.log("--------------------------------------------------");

export async function generateMetadata(props) {
    console.log("[DEBUG] generateMetadata called. Props keys:", Object.keys(props));
    try {
        const params = props.params; // In Next.js 15 this might be a promise
        console.log("[DEBUG] params (raw):", params);

        const { locale, slug } = params;
        console.log(`[DEBUG] Extracted: locale=${locale}, slug=${slug}`);

        const treatment = getTreatmentBySlug(slug);
        console.log(`[DEBUG] Treatment found:`, treatment ? treatment.id : "NULL");

        if (!treatment) {
            return {};
        }

        const t = await getTranslations({ locale, namespace: treatment.namespace });
        const title = t("title");
        console.log(`[DEBUG] Generated title: ${title}`);

        return {
            title: `${title} - Panacea Medcare`,
            description: t("intro"),
            openGraph: {
                title: title,
                description: t("intro"),
                images: [
                    {
                        url: `/treatment/${slug}.jpg`,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },
        };
    } catch (error) {
        console.error("[DEBUG] Error in generateMetadata:", error);
        return {
            title: "Error Generating Metadata"
        };
    }
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
