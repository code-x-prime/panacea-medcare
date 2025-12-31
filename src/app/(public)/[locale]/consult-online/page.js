import QuoteForm from "@/components/QuoteForm";

export default async function ConsultOnlinePage({ params }) {
    const locale = params.locale || "en";
    const isRTL = locale === "ar";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 py-12 md:py-16">
            <div className="container mx-auto px-4 xl:max-w-7xl">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className={`text-center mb-12 ${isRTL ? "rtl" : "ltr"}`}>
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                                {isRTL ? "استشارة مجانية" : locale === "fr" ? "Consultation Gratuite" : "Free Consultation"}
                            </span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                            {isRTL
                                ? "احصل على استشارة طبية مجانية"
                                : locale === "fr"
                                    ? "Obtenez une Consultation Médicale Gratuite"
                                    : "Get a Free Medical Consultation"}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {isRTL
                                ? "املأ النموذج أدناه وسيتواصل معك فريقنا الطبي قريبًا لمناقشة احتياجاتك الصحية."
                                : locale === "fr"
                                    ? "Remplissez le formulaire ci-dessous et notre équipe médicale vous contactera bientôt pour discuter de vos besoins de santé."
                                    : "Fill out the form below and our medical team will contact you shortly to discuss your healthcare needs."}
                        </p>
                    </div>

                    {/* Quote Form */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        <QuoteForm embedded={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
