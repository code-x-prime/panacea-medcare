"use client";

import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TestimonialsPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("testimonials");

    // YouTube video URLs provided by client
    const youtubeVideos = [
        "https://youtu.be/DM590FH0STY?si=j5EtdCuwEmNX9qmW",
        "https://youtu.be/kA_19g5gu04?si=-BdV4aCZep9PRINw",
        "https://youtu.be/5NcQ27O5CqU?si=_3CtXrya87R6QIm8",
        "https://youtu.be/5839F2rC6UY?si=H3wE-HiRRWo9WD9p",
        "https://youtu.be/j3JosXyoVEY?si=ROX5v_0WiEgzw-N0",
        "https://youtu.be/yPGV6QvWr5Q?si=IN6B97GOMcXY9ERL",
        "https://youtu.be/vGdjss1V4k8?si=hNvT_mFIrY9Zozyj",
        "https://youtu.be/wOGZh6fzkqA?si=rOSyWZ0PkRwDLNjX",
        "https://youtu.be/Hwi5B2qsdCw?si=ovqyqF0ENrL5UjxO",
        "https://youtu.be/_4QC2ESvE3E?si=40sbJhqT4j9aYUUh",
        "https://youtu.be/d6l5iBGDJC8?si=ZJ5-JYwWduZ5R2qK",
        "https://youtu.be/lWXV3YUHuQY?si=ZwyaW6Ti6p-xw7z-",
        "https://youtu.be/DaeU7nJzTDg?si=otXK9gCzFpmUzNSZ",
        "https://youtu.be/kA_19g5gu04?si=0LA-d1KuZaRDhRX4"
    ];

    // Extract video ID from YouTube URL
    const extractVideoId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <PageHero
                locale={locale}
                namespace="heroSection"
                title={locale === "ar" ? "آراء المرضى" : locale === "fr" ? "Témoignages" : "Patient Testimonials"}
                subtitle={locale === "ar" ? "اقرأ قصص نجاح مرضانا" : locale === "fr" ? "Lisez les histoires de réussite de nos patients" : "Read our patients' success stories"}
                backgroundImage="/images/testimonials-hero.jpg"
                fallbackImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
                {/* Section Header */}
                <div className={`max-w-4xl mx-auto mb-12 md:mb-16 ${isRTL ? "text-right" : "text-left"}`}>
                    <p className="text-panacea-accent font-semibold mb-3 tracking-wide uppercase text-sm">
                        {locale === "ar" ? "شهادات المرضى" : locale === "fr" ? "Témoignages Vidéo" : "Video Testimonials"}
                    </p>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-panacea-dark mb-4 ${isRTL ? "font-arabic" : ""}`}>
                        {locale === "ar" ? "ماذا يقول مرضانا" : locale === "fr" ? "Ce que disent nos patients" : "What Our Patients Say"}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {locale === "ar" 
                            ? "شاهد قصص نجاح مرضانا من جميع أنحاء العالم" 
                            : locale === "fr" 
                            ? "Découvrez les histoires de réussite de nos patients du monde entier" 
                            : "Watch success stories from our patients around the world"}
                    </p>
                </div>

                {/* Scrollable Video Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {youtubeVideos.map((videoUrl, index) => {
                            const videoId = extractVideoId(videoUrl);
                            if (!videoId) return null;

                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Video Thumbnail Container */}
                                    <div className="relative aspect-video bg-gray-900 cursor-pointer" onClick={() => setSelectedVideo(videoId)}>
                                        {/* YouTube Thumbnail */}
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                            alt={`Testimonial ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                            }}
                                        />
                                        
                                        {/* Overlay with Play Button */}
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-panacea-accent rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                                                <svg 
                                                    className={`w-8 h-8 text-white ${isRTL ? "mr-0.5" : "ml-1"}`} 
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Video Number Badge */}
                                        <div className="absolute top-4 left-4 bg-panacea-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            #{index + 1}
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-4 md:p-6">
                                        <h3 className={`font-semibold text-panacea-dark mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                                            {locale === "ar" 
                                                ? `شهادة المريض ${index + 1}` 
                                                : locale === "fr" 
                                                ? `Témoignage Patient ${index + 1}` 
                                                : `Patient Testimonial ${index + 1}`}
                                        </h3>
                                        <p className={`text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                                            {locale === "ar" 
                                                ? "انقر لمشاهدة الفيديو الكامل" 
                                                : locale === "fr" 
                                                ? "Cliquez pour voir la vidéo complète" 
                                                : "Click to watch full video"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10 backdrop-blur-sm transition-all duration-300`}
                            aria-label="Close video"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* YouTube Embed */}
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                            title="Patient Testimonial Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
