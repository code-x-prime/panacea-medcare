"use client";

import PageHero from "@/components/PageHero";

export default function BlogPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Blog & News",
            subtitle: "Latest updates and medical insights",
            heading: "Medical Blog",
            intro: "Stay informed with the latest medical news, health tips, and insights from our team of healthcare professionals."
        },
        ar: {
            title: "المدونة والأخبار",
            subtitle: "آخر التحديثات والرؤى الطبية",
            heading: "المدونة الطبية",
            intro: "ابق على اطلاع بأحدث الأخبار الطبية ونصائح الصحة والرؤى من فريق المتخصصين في الرعاية الصحية لدينا."
        },
        fr: {
            title: "Blog et actualités",
            subtitle: "Dernières mises à jour et informations médicales",
            heading: "Blog médical",
            intro: "Restez informé des dernières nouvelles médicales, conseils de santé et informations de notre équipe de professionnels de la santé."
        }
    };

    const t = content[locale] || content.en;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={t.title}
                subtitle={t.subtitle}
                backgroundImage="/images/blog-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.heading}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed mb-12 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.intro}
                    </p>

                    <div className={`bg-panacea-light p-8 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                        <p className="text-gray-600">
                            {locale === "ar" ? "المحتوى قريبًا..." : locale === "fr" ? "Contenu à venir..." : "Content coming soon..."}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
