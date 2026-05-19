"use client";

import TopBanner from "@/components/TopBanner";

export default function CookiePolicyPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Cookie Policy",
            subtitle: "How we use cookies on our website",
            heading: "Cookie Policy",
            intro: "This Cookie Policy explains how Panacea Medcare uses cookies and similar technologies when you visit www.panaceamedcare.com.",
            sections: [
                {
                    title: "What Are Cookies?",
                    text: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.",
                },
                {
                    title: "Cookies We Use",
                    text: "We may use essential cookies (required for site functionality), analytics cookies (to understand how visitors use our site), and preference cookies (such as language selection).",
                },
                {
                    title: "Third-Party Cookies",
                    text: "Some third-party services embedded on our site (such as analytics or social media) may set their own cookies. We do not control these cookies.",
                },
                {
                    title: "Managing Cookies",
                    text: "You can control or delete cookies through your browser settings. Disabling cookies may affect certain features of our website.",
                },
                {
                    title: "Updates to This Policy",
                    text: "We may update this Cookie Policy from time to time. The effective date will be revised when changes are made.",
                },
                {
                    title: "Contact Us",
                    text: "For questions about our use of cookies, contact us at care@panaceamedcare.com.",
                },
            ],
        },
        ar: {
            title: "سياسة ملفات تعريف الارتباط",
            subtitle: "كيف نستخدم ملفات تعريف الارتباط على موقعنا",
            heading: "سياسة ملفات تعريف الارتباط",
            intro: "توضح سياسة ملفات تعريف الارتباط هذه كيفية استخدام باناسيا ميد كير لملفات تعريف الارتباط عند زيارتك لموقعنا.",
            sections: [
                { title: "ما هي ملفات تعريف الارتباط؟", text: "ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزن على جهازك عند زيارة موقع ويب. تساعد الموقع على تذكر تفضيلاتك وتحسين تجربتك." },
                { title: "ملفات تعريف الارتباط التي نستخدمها", text: "قد نستخدم ملفات أساسية (مطلوبة لوظائف الموقع)، وملفات تحليلية، وملفات تفضيلات (مثل اختيار اللغة)." },
                { title: "ملفات طرف ثالث", text: "قد تضع بعض خدمات الطرف الثالث المدمجة في موقعنا ملفات تعريف ارتباط خاصة بها." },
                { title: "إدارة ملفات تعريف الارتباط", text: "يمكنك التحكم في ملفات تعريف الارتباط أو حذفها من خلال إعدادات المتصفح. قد يؤثر تعطيلها على بعض ميزات الموقع." },
                { title: "تحديثات السياسة", text: "قد نحدّث هذه السياسة من وقت لآخر." },
                { title: "اتصل بنا", text: "للأسئلة حول ملفات تعريف الارتباط، راسلنا على care@panaceamedcare.com." },
            ],
        },
        fr: {
            title: "Politique des cookies",
            subtitle: "Comment nous utilisons les cookies",
            heading: "Politique des cookies",
            intro: "Cette politique explique comment Panacea Medcare utilise les cookies lorsque vous visitez www.panaceamedcare.com.",
            sections: [
                { title: "Qu'est-ce qu'un cookie ?", text: "Les cookies sont de petits fichiers texte stockés sur votre appareil lors de la visite d'un site web." },
                { title: "Cookies que nous utilisons", text: "Nous pouvons utiliser des cookies essentiels, analytiques et de préférences (comme la sélection de la langue)." },
                { title: "Cookies tiers", text: "Certains services tiers intégrés à notre site peuvent définir leurs propres cookies." },
                { title: "Gestion des cookies", text: "Vous pouvez contrôler ou supprimer les cookies via les paramètres de votre navigateur." },
                { title: "Mises à jour", text: "Nous pouvons mettre à jour cette politique de temps à autre." },
                { title: "Nous contacter", text: "Pour toute question : care@panaceamedcare.com." },
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
