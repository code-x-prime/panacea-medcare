"use client";

import PageHero from "@/components/PageHero";

export default function AISolutionsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "AI Solutions",
            subtitle: "AI-powered medical diagnostics and treatment planning",
            heading: "Artificial Intelligence in Healthcare",
            intro: "Leverage cutting-edge AI technology for enhanced diagnostic accuracy, treatment planning, and patient outcomes. Our AI solutions assist medical professionals in making informed decisions.",
            features: ["AI-Powered Diagnostics", "Predictive Analytics", "Treatment Optimization", "Medical Image Analysis", "Risk Assessment", "Clinical Decision Support"]
        },
        ar: {
            title: "حلول الذكاء الاصطناعي",
            subtitle: "التشخيص الطبي وتخطيط العلاج المدعوم بالذكاء الاصطناعي",
            heading: "الذكاء الاصطناعي في الرعاية الصحية",
            intro: "استفد من تقنية الذكاء الاصطناعي المتطورة لتحسين دقة التشخيص وتخطيط العلاج ونتائج المرضى. تساعد حلول الذكاء الاصطناعي لدينا المهنيين الطبيين في اتخاذ قرارات مستنيرة.",
            features: ["التشخيص المدعوم بالذكاء الاصطناعي", "التحليلات التنبؤية", "تحسين العلاج", "تحليل الصور الطبية", "تقييم المخاطر", "دعم القرار السريري"]
        },
        fr: {
            title: "Solutions IA",
            subtitle: "Diagnostics médicaux et planification de traitement alimentés par l'IA",
            heading: "Intelligence artificielle dans les soins de santé",
            intro: "Tirez parti de la technologie d'IA de pointe pour une précision diagnostique améliorée, une planification de traitement et des résultats pour les patients. Nos solutions d'IA aident les professionnels médicaux à prendre des décisions éclairées.",
            features: ["Diagnostics alimentés par l'IA", "Analyses prédictives", "Optimisation du traitement", "Analyse d'images médicales", "Évaluation des risques", "Support de décision clinique"]
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
                backgroundImage="/images/ai-solutions-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
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
