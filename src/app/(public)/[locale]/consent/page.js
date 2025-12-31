"use client";

import TopBanner from "@/components/TopBanner";

export default function ConsentPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Informed Consent",
            subtitle: "Understanding your medical care",
            heading: "Informed Consent Information",
            intro: "We believe in transparent communication and ensuring you understand all aspects of your medical care.",
            sections: [
                { title: "What is Informed Consent?", text: "Informed consent is your agreement to receive medical treatment after being fully informed about the procedure, risks, and alternatives." },
                { title: "Your Right to Information", text: "You have the right to receive complete information about your diagnosis, treatment options, and expected outcomes." },
                { title: "Voluntary Decision", text: "All medical decisions are voluntary. You have the right to refuse or discontinue treatment at any time." },
                { title: "Questions and Concerns", text: "We encourage you to ask questions and express any concerns about your treatment." }
            ]
        },
        ar: {
            title: "الموافقة المستنيرة",
            subtitle: "فهم رعايتك الطبية",
            heading: "معلومات الموافقة المستنيرة",
            intro: "نؤمن بالتواصل الشفاف وضمان فهمك لجميع جوانب رعايتك الطبية.",
            sections: [
                { title: "ما هي الموافقة المستنيرة؟", text: "الموافقة المستنيرة هي موافقتك على تلقي العلاج الطبي بعد إبلاغك بالكامل بالإجراء والمخاطر والبدائل." },
                { title: "حقك في المعلومات", text: "لديك الحق في تلقي معلومات كاملة عن تشخيصك وخيارات العلاج والنتائج المتوقعة." },
                { title: "القرار الطوعي", text: "جميع القرارات الطبية طوعية. لديك الحق في رفض أو إيقاف العلاج في أي وقت." },
                { title: "الأسئلة والمخاوف", text: "نشجعك على طرح الأسئلة والتعبير عن أي مخاوف بشأن علاجك." }
            ]
        },
        fr: {
            title: "Consentement éclairé",
            subtitle: "Comprendre vos soins médicaux",
            heading: "Informations sur le consentement éclairé",
            intro: "Nous croyons en une communication transparente et nous nous assurons que vous comprenez tous les aspects de vos soins médicaux.",
            sections: [
                { title: "Qu'est-ce que le consentement éclairé?", text: "Le consentement éclairé est votre accord pour recevoir un traitement médical après avoir été pleinement informé de la procédure, des risques et des alternatives." },
                { title: "Votre droit à l'information", text: "Vous avez le droit de recevoir des informations complètes sur votre diagnostic, vos options de traitement et les résultats attendus." },
                { title: "Décision volontaire", text: "Toutes les décisions médicales sont volontaires. Vous avez le droit de refuser ou d'interrompre le traitement à tout moment." },
                { title: "Questions et préoccupations", text: "Nous vous encourageons à poser des questions et à exprimer toute préoccupation concernant votre traitement." }
            ]
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
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-bold text-panacea-primary mb-6 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.heading}
                    </h2>
                    <p className={`text-lg text-gray-700 leading-relaxed mb-12 ${isRTL ? "text-right" : "text-left"}`}>
                        {t.intro}
                    </p>

                    <div className="space-y-8">
                        {t.sections.map((section, index) => (
                            <div key={index} className={`bg-panacea-light p-6 rounded-lg ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-2xl font-bold text-panacea-primary mb-3">{section.title}</h3>
                                <p className="text-gray-700">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
