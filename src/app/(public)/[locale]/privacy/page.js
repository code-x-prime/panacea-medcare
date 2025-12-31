"use client";

import TopBanner from "@/components/TopBanner";

export default function PrivacyPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Privacy Policy",
            subtitle: "How we protect your information",
            heading: "Privacy Policy",
            intro: "At Panacea MedCare, we are committed to protecting your privacy and ensuring the security of your personal and medical information.",
            sections: [
                { title: "Information Collection", text: "We collect information necessary to provide you with quality medical services and support." },
                { title: "Data Security", text: "Your data is protected using industry-standard encryption and security measures." },
                { title: "Information Sharing", text: "We do not share your personal information with third parties without your consent." },
                { title: "Your Rights", text: "You have the right to access, modify, or delete your personal information at any time." }
            ]
        },
        ar: {
            title: "سياسة الخصوصية",
            subtitle: "كيف نحمي معلوماتك",
            heading: "سياسة الخصوصية",
            intro: "في باناسيا للرعاية الطبية، نحن ملتزمون بحماية خصوصيتك وضمان أمان معلوماتك الشخصية والطبية.",
            sections: [
                { title: "جمع المعلومات", text: "نجمع المعلومات اللازمة لتزويدك بخدمات طبية ودعم عالي الجودة." },
                { title: "أمان البيانات", text: "يتم حماية بياناتك باستخدام التشفير وتدابير الأمان المعيارية في الصناعة." },
                { title: "مشاركة المعلومات", text: "لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك." },
                { title: "حقوقك", text: "لديك الحق في الوصول إلى معلوماتك الشخصية أو تعديلها أو حذفها في أي وقت." }
            ]
        },
        fr: {
            title: "Politique de confidentialité",
            subtitle: "Comment nous protégeons vos informations",
            heading: "Politique de confidentialité",
            intro: "Chez Panacea MedCare, nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos informations personnelles et médicales.",
            sections: [
                { title: "Collecte d'informations", text: "Nous collectons les informations nécessaires pour vous fournir des services médicaux et un soutien de qualité." },
                { title: "Sécurité des données", text: "Vos données sont protégées à l'aide de mesures de cryptage et de sécurité standard de l'industrie." },
                { title: "Partage d'informations", text: "Nous ne partageons pas vos informations personnelles avec des tiers sans votre consentement." },
                { title: "Vos droits", text: "Vous avez le droit d'accéder, de modifier ou de supprimer vos informations personnelles à tout moment." }
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
                            <div key={index} className={`bg-white p-6 rounded-lg shadow-md ${isRTL ? "text-right" : "text-left"}`}>
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
