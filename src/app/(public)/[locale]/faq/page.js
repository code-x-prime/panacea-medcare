"use client";

import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";

export default function FAQPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="faq"
                backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />
            <FAQ locale={locale} />
        </main>
    );
}

