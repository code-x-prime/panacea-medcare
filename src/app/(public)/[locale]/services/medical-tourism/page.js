"use client";

import PageHero from "@/components/PageHero";

export default function MedicalTourismPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Medical Tourism",
            subtitle: "Complete medical travel packages",
            heading: "Your Medical Tourism Partner",
            intro: "Experience world-class medical care combined with travel convenience. We handle everything from visa assistance to post-treatment care, ensuring a seamless medical tourism experience.",
            features: ["Visa Assistance", "Travel Arrangements", "Accommodation", "Airport Transfers", "Medical Coordination", "Post-Treatment Support", "Tourism Packages", "24/7 Support"]
        },
        ar: {
            title: "السياحة العلاجية",
            subtitle: "باقات سفر طبية كاملة",
            heading: "شريكك في السياحة العلاجية",
            intro: "استمتع برعاية طبية عالمية المستوى مع راحة السفر. نتعامل مع كل شيء من المساعدة في التأشيرة إلى الرعاية بعد العلاج، مما يضمن تجربة سياحة علاجية سلسة.",
            features: ["المساعدة في التأشيرة", "ترتيبات السفر", "الإقامة", "نقل المطار", "التنسيق الطبي", "دعم ما بعد العلاج", "باقات سياحية", "دعم على مدار الساعة"]
        },
        fr: {
            title: "Tourisme médical",
            subtitle: "Forfaits de voyage médical complets",
            heading: "Votre partenaire en tourisme médical",
            intro: "Découvrez des soins médicaux de classe mondiale combinés à la commodité du voyage. Nous gérons tout, de l'assistance visa aux soins post-traitement, garantissant une expérience de tourisme médical sans faille.",
            features: ["Assistance visa", "Arrangements de voyage", "Hébergement", "Transferts aéroport", "Coordination médicale", "Support post-traitement", "Forfaits touristiques", "Support 24/7"]
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
                backgroundImage="/images/medical-tourism-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
