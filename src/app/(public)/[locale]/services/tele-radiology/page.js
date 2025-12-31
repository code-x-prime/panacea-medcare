"use client";

import TopBanner from "@/components/TopBanner";

export default function TeleRadiologyPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Tele-radiology Services",
            subtitle: "Expert radiology analysis from anywhere",
            heading: "Remote Radiology Services",
            intro: "Our tele-radiology service provides expert analysis of medical imaging studies by board-certified radiologists. Get accurate diagnoses quickly without geographical limitations.",
            features: ["24/7 Availability", "Board-Certified Radiologists", "Quick Turnaround Time", "Multiple Imaging Modalities", "Second Opinion Services", "Detailed Reports"]
        },
        ar: {
            title: "خدمات الأشعة عن بعد",
            subtitle: "تحليل الأشعة الخبير من أي مكان",
            heading: "خدمات الأشعة عن بُعد",
            intro: "توفر خدمة الأشعة عن بُعد تحليلًا خبيرًا لدراسات التصوير الطبي من قبل أطباء الأشعة المعتمدين. احصل على تشخيصات دقيقة بسرعة دون قيود جغرافية.",
            features: ["متاح على مدار الساعة", "أطباء أشعة معتمدون", "وقت تسليم سريع", "طرق تصوير متعددة", "خدمات الرأي الثاني", "تقارير مفصلة"]
        },
        fr: {
            title: "Services de téléradiologie",
            subtitle: "Analyse radiologique experte de n'importe où",
            heading: "Services de radiologie à distance",
            intro: "Notre service de téléradiologie fournit une analyse experte des études d'imagerie médicale par des radiologues certifiés. Obtenez des diagnostics précis rapidement sans limitations géographiques.",
            features: ["Disponibilité 24/7", "Radiologues certifiés", "Délai d'exécution rapide", "Modalités d'imagerie multiples", "Services de deuxième avis", "Rapports détaillés"]
        }
    };

    const t = content[locale] || content.en;

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="heroSection"
                title={t.title}
                subtitle={t.subtitle}
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.heading}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                        {t.intro}
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t.features.map((feature, index) => (
                        <div key={index} className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                            <div className="w-10 h-10 bg-panacea-accent text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                                ✓
                            </div>
                            <h4 className="text-xl font-bold text-panacea-primary">{feature}</h4>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
