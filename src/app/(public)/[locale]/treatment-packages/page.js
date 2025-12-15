"use client";

import PageHero from "@/components/PageHero";
import LowestQuotesAssured from "@/components/LowestQuotesAssured";

export default function TreatmentPackagesPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="treatmentPackages"
                backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />
            <LowestQuotesAssured locale={locale} />
        </main>
    );
}

