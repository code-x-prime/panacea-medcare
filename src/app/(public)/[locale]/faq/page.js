"use client";

import TopBanner from "@/components/TopBanner";
import FAQ from "@/components/FAQ";

export default function FAQPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="faq"
                variant="gradient"
                size="md"
            />
            <FAQ locale={locale} />
        </main>
    );
}

