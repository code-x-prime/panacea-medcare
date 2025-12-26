"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaTools, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

// Translation data embedded directly
const translations = {
    en: {
        title: "404",
        heading: "Page Under Development",
        description: "This page is currently being built to serve you better.",
        subDescription: "Our team is working hard to bring you an exceptional experience. Please check back soon!",
        infoTitle: "Development in Progress",
        infoDescription: "We're crafting a professional healthcare experience. Thank you for your patience!",
        homeButton: "Go to Homepage",
        backButton: "Go Back",
        contactText: "Need immediate assistance? Contact us at",
        email: "info@panaceamedcare.com"
    },
    ar: {
        title: "404",
        heading: "الصفحة قيد التطوير",
        description: "هذه الصفحة قيد الإنشاء حاليًا لخدمتك بشكل أفضل.",
        subDescription: "فريقنا يعمل بجد لتقديم تجربة استثنائية لك. يرجى المراجعة قريبًا!",
        infoTitle: "التطوير قيد التقدم",
        infoDescription: "نحن نصنع تجربة رعاية صحية احترافية. شكرًا لصبرك!",
        homeButton: "الذهاب إلى الصفحة الرئيسية",
        backButton: "العودة",
        contactText: "هل تحتاج إلى مساعدة فورية؟ اتصل بنا على",
        email: "info@panaceamedcare.com"
    },
    fr: {
        title: "404",
        heading: "Page en cours de développement",
        description: "Cette page est actuellement en construction pour mieux vous servir.",
        subDescription: "Notre équipe travaille dur pour vous offrir une expérience exceptionnelle. Revenez bientôt!",
        infoTitle: "Développement en cours",
        infoDescription: "Nous créons une expérience de soins de santé professionnelle. Merci pour votre patience!",
        homeButton: "Aller à l'accueil",
        backButton: "Retour",
        contactText: "Besoin d'aide immédiate? Contactez-nous à",
        email: "info@panaceamedcare.com"
    }
};

export default function NotFound() {
    const pathname = usePathname();
    const [locale, setLocale] = useState('en');
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        // Extract locale from pathname
        const pathLocale = pathname?.split('/')[1] || 'en';
        const validLocale = ['en', 'ar', 'fr'].includes(pathLocale) ? pathLocale : 'en';
        setLocale(validLocale);
        setIsRTL(validLocale === 'ar');
    }, [pathname]);

    const t = (key) => translations[locale][key];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-panacea-light via-white to-panacea-blue-50 flex items-center justify-center px-4 py-12"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="max-w-3xl w-full">
                {/* Main Content Card */}
                <div className="bg-white border border-panacea-primary/10 overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-panacea-primary to-panacea-dark p-8 text-center relative overflow-hidden">
                        <div className={`mt-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-panacea-primary/20">
                                <div className="w-2 h-2 bg-panacea-accent rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">
                                    Panacea MedCare - Your Healthcare Partner
                                </span>
                            </div>
                        </div>



                        {/* 404 Text */}
                        <h1 className="text-8xl md:text-9xl font-bold text-white/30 mb-2 relative z-10">
                            {t('title')}
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-panacea-accent to-white mx-auto rounded-full"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12">
                        {/* Main Message */}
                        <h2 className={`text-3xl md:text-4xl font-bold text-panacea-dark mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('heading')}
                        </h2>

                        <p className={`text-lg text-gray-600 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('description')}
                        </p>

                        <p className={`text-base text-gray-500 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('subDescription')}
                        </p>

                        {/* Info Box */}
                        <div className="bg-gradient-to-br from-panacea-light to-panacea-blue-50 rounded-2xl border-2 border-panacea-primary/20 p-6 mb-8 shadow-sm">
                            <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 w-12 h-12 bg-panacea-accent rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <h3 className="font-bold text-panacea-dark mb-2 text-lg">
                                        {t('infoTitle')}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t('infoDescription')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                            <Link
                                href={`/${locale}`}
                                className={`group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-panacea-primary to-panacea-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                                <FaHome className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>{t('homeButton')}</span>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className={`group flex items-center justify-center gap-3 px-8 py-4 bg-white text-panacea-primary border-2 border-panacea-primary rounded-xl font-semibold hover:bg-panacea-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                                <FaArrowLeft className={`w-5 h-5 group-hover:scale-110 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                                <span>{t('backButton')}</span>
                            </button>
                        </div>

                        {/* Contact Section */}
                        <div className="pt-6 border-t-2 border-gray-100">
                            <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('contactText')}{" "}
                                <a
                                    href={`mailto:${t('email')}`}
                                    className="text-panacea-accent hover:text-panacea-accent/80 font-bold underline decoration-2 underline-offset-2 hover:underline-offset-4 transition-all"
                                >
                                    {t('email')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}
