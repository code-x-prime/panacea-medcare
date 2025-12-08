"use client";

import PageHero from "@/components/PageHero";

export default function TermsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";

    const content = {
        en: {
            title: "Terms & Conditions",
            subtitle: "Terms of service",
            heading: "Terms and Conditions",
            intro: "Please read these terms and conditions carefully before using our services.",
            sections: [
                { title: "Acceptance of Terms", text: "By using our services, you agree to be bound by these terms and conditions." },
                { title: "Services Provided", text: "We provide medical tourism facilitation and healthcare coordination services." },
                { title: "User Responsibilities", text: "Users are responsible for providing accurate medical information and following medical advice." },
                { title: "Limitation of Liability", text: "We facilitate medical services but are not responsible for medical outcomes." }
            ]
        },
        ar: {
            title: "الشروط والأحكام",
            subtitle: "شروط الخدمة",
            heading: "الشروط والأحكام",
            intro: "يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا.",
            sections: [
                { title: "قبول الشروط", text: "باستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام." },
                { title: "الخدمات المقدمة", text: "نقدم خدمات تسهيل السياحة العلاجية وتنسيق الرعاية الصحية." },
                { title: "مسؤوليات المستخدم", text: "المستخدمون مسؤولون عن تقديم معلومات طبية دقيقة واتباع النصائح الطبية." },
                { title: "حدود المسؤولية", text: "نحن نسهل الخدمات الطبية ولكننا لسنا مسؤولين عن النتائج الطبية." }
            ]
        },
        fr: {
            title: "Termes et conditions",
            subtitle: "Conditions de service",
            heading: "Termes et conditions",
            intro: "Veuillez lire attentivement ces termes et conditions avant d'utiliser nos services.",
            sections: [
                { title: "Acceptation des conditions", text: "En utilisant nos services, vous acceptez d'être lié par ces termes et conditions." },
                { title: "Services fournis", text: "Nous fournissons des services de facilitation du tourisme médical et de coordination des soins de santé." },
                { title: "Responsabilités de l'utilisateur", text: "Les utilisateurs sont responsables de fournir des informations médicales précises et de suivre les conseils médicaux." },
                { title: "Limitation de responsabilité", text: "Nous facilitons les services médicaux mais ne sommes pas responsables des résultats médicaux." }
            ]
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
                backgroundImage="/images/terms-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
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
