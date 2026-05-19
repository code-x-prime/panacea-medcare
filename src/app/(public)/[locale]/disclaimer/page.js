"use client";

import TopBanner from "@/components/TopBanner";

export default function DisclaimerPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Disclaimer",
            subtitle: "Important information about our services",
            heading: "Medical & Website Disclaimer",
            intro: "Please read this disclaimer carefully before using the Panacea Medcare website or services.",
            sections: [
                {
                    title: "Not Medical Advice",
                    text: "The information on this website is for general knowledge purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions.",
                },
                {
                    title: "Facilitation Services Only",
                    text: "Panacea Medcare is an international patient facilitation and care coordination platform. We help connect patients with hospitals and doctors but do not practice medicine or guarantee medical outcomes.",
                },
                {
                    title: "AI Pre-Screening",
                    text: "AI-assisted pre-screening tools provide preliminary guidance only. Results are not a substitute for professional medical evaluation, diagnosis, or treatment planning.",
                },
                {
                    title: "Third-Party Providers",
                    text: "Hospitals, doctors, and other healthcare providers listed on our platform are independent third parties. Panacea Medcare is not responsible for their clinical decisions or treatment outcomes.",
                },
                {
                    title: "Emergency Situations",
                    text: "If you are experiencing a medical emergency, seek immediate medical attention locally. Do not rely on this website for urgent care.",
                },
                {
                    title: "Accuracy of Information",
                    text: "While we strive to keep information accurate and up to date, we do not warrant that all content on this website is complete, current, or error-free.",
                },
            ],
        },
        ar: {
            title: "إخلاء المسؤولية",
            subtitle: "معلومات مهمة حول خدماتنا",
            heading: "إخلاء المسؤولية الطبية والموقع",
            intro: "يرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام موقع باناسيا ميد كير أو خدماته.",
            sections: [
                { title: "ليست نصيحة طبية", text: "المعلومات على هذا الموقع لأغراض المعرفة العامة فقط ولا تشكل نصيحة طبية أو تشخيصًا أو علاجًا. استشر دائمًا متخصصي الرعاية الصحية المؤهلين." },
                { title: "خدمات التسهيل فقط", text: "باناسيا ميد كير هي منصة لتسهيل المرضى الدوليين وتنسيق الرعاية. نساعد في ربط المرضى بالمستشفيات والأطباء ولكننا لا نمارس الطب ولا نضمن النتائج الطبية." },
                { title: "الفحص المسبق بالذكاء الاصطناعي", text: "أدوات الفحص المسبق المدعومة بالذكاء الاصطناعي توفر إرشادًا أوليًا فقط. النتائج ليست بديلاً عن التقييم الطبي المهني." },
                { title: "مقدمو خدمات خارجيون", text: "المستشفيات والأطباء المدرجون على منصتنا جهات مستقلة. باناسيا ميد كير غير مسؤولة عن قراراتهم السريرية أو نتائج العلاج." },
                { title: "حالات الطوارئ", text: "إذا كنت تعاني من حالة طبية طارئة، اطلب العناية الطبية الفورية محليًا." },
                { title: "دقة المعلومات", text: "بينما نسعى للحفاظ على دقة المعلومات، لا نضمن أن جميع المحتويات كاملة أو محدثة أو خالية من الأخطاء." },
            ],
        },
        fr: {
            title: "Avertissement",
            subtitle: "Informations importantes sur nos services",
            heading: "Avertissement médical et site web",
            intro: "Veuillez lire cet avertissement attentivement avant d'utiliser le site ou les services de Panacea Medcare.",
            sections: [
                { title: "Pas un avis médical", text: "Les informations sur ce site sont à titre informatif uniquement et ne constituent pas un avis médical, un diagnostic ou un traitement. Consultez toujours des professionnels de santé qualifiés." },
                { title: "Services de facilitation uniquement", text: "Panacea Medcare est une plateforme de facilitation des patients internationaux. Nous ne pratiquons pas la médecine et ne garantissons pas les résultats médicaux." },
                { title: "Pré-dépistage IA", text: "Les outils de pré-dépistage assistés par IA fournissent des orientations préliminaires uniquement, sans remplacer une évaluation médicale professionnelle." },
                { title: "Prestataires tiers", text: "Les hôpitaux et médecins listés sont des tiers indépendants. Panacea Medcare n'est pas responsable de leurs décisions cliniques." },
                { title: "Urgences", text: "En cas d'urgence médicale, consultez immédiatement un service médical local." },
                { title: "Exactitude des informations", text: "Bien que nous nous efforcions de maintenir des informations exactes, nous ne garantissons pas que tout le contenu est complet ou exempt d'erreurs." },
            ],
        },
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
                            <div key={index} className={`bg-white p-6 rounded-lg shadow-md ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-2xl font-bold text-panacea-primary mb-3">{section.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
