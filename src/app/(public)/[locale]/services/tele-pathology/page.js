"use client";

import PageHero from "@/components/PageHero";

export default function TelePathologyPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Tele-pathology Services",
            subtitle: "Digital pathology for accurate diagnosis",
            heading: "Remote Pathology Services",
            intro: "Our tele-pathology service enables pathologists to examine tissue samples and make diagnoses remotely using digital imaging technology. Fast, accurate, and accessible pathology services.",
            features: ["Digital Slide Scanning", "Expert Pathologists", "Rapid Diagnosis", "Second Opinion Available", "Comprehensive Reports", "Secure Data Transfer"]
        },
        ar: {
            title: "خدمات علم الأمراض عن بعد",
            subtitle: "علم الأمراض الرقمي للتشخيص الدقيق",
            heading: "خدمات علم الأمراض عن بُعد",
            intro: "تمكن خدمة علم الأمراض عن بُعد أطباء الأمراض من فحص عينات الأنسجة وإجراء التشخيصات عن بُعد باستخدام تقنية التصوير الرقمي. خدمات علم الأمراض سريعة ودقيقة ويمكن الوصول إليها.",
            features: ["مسح الشرائح الرقمية", "أطباء أمراض خبراء", "تشخيص سريع", "رأي ثانٍ متاح", "تقارير شاملة", "نقل بيانات آمن"]
        },
        fr: {
            title: "Services de télépathologie",
            subtitle: "Pathologie numérique pour un diagnostic précis",
            heading: "Services de pathologie à distance",
            intro: "Notre service de télépathologie permet aux pathologistes d'examiner des échantillons de tissus et de poser des diagnostics à distance en utilisant la technologie d'imagerie numérique. Services de pathologie rapides, précis et accessibles.",
            features: ["Numérisation de lames numériques", "Pathologistes experts", "Diagnostic rapide", "Deuxième avis disponible", "Rapports complets", "Transfert de données sécurisé"]
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
                backgroundImage="/images/tele-pathology-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop"
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
