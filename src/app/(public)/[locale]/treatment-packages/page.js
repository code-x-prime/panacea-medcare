"use client";

import TopBanner from "@/components/TopBanner";
import LowestQuotesAssured from "@/components/LowestQuotesAssured";

export default function TreatmentPackagesPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="treatmentPackages"
                variant="gradient"
                size="md"
            />
            <LowestQuotesAssured locale={locale} />
        </main>
    );
}

