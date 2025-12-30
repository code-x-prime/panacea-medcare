"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play } from "lucide-react";

export default function PatientStories({ locale }) {
    const t = useTranslations("patientStories");
    const isRTL = locale === "ar";

    // YouTube video data
    const videos = [
        {
            id: 1,
            thumbnail: "https://img.youtube.com/vi/DM590FH0STY/hqdefault.jpg",
            youtubeId: "DM590FH0STY",
        },
        {
            id: 2,
            thumbnail: "https://img.youtube.com/vi/5NcQ27O5CqU/hqdefault.jpg",
            youtubeId: "5NcQ27O5CqU",
        },
        {
            id: 3,
            thumbnail: "https://img.youtube.com/vi/5839F2rC6UY/hqdefault.jpg",
            youtubeId: "5839F2rC6UY",
        },
        {
            id: 4,
            thumbnail: "https://img.youtube.com/vi/j3JosXyoVEY/hqdefault.jpg",
            youtubeId: "j3JosXyoVEY",
        },
        {
            id: 5,
            thumbnail: "https://img.youtube.com/vi/yPGV6QvWr5Q/hqdefault.jpg",
            youtubeId: "yPGV6QvWr5Q",
        },
        {
            id: 6,
            thumbnail: "https://img.youtube.com/vi/vGdjss1V4k8/hqdefault.jpg",
            youtubeId: "vGdjss1V4k8",
        },
        {
            id: 7,
            thumbnail: "https://img.youtube.com/vi/wOGZh6fzkqA/hqdefault.jpg",
            youtubeId: "wOGZh6fzkqA",
        },
        {
            id: 8,
            thumbnail: "https://img.youtube.com/vi/Hwi5B2qsdCw/hqdefault.jpg",
            youtubeId: "Hwi5B2qsdCw",
        },
        {
            id: 9,
            thumbnail: "https://img.youtube.com/vi/_4QC2ESvE3E/hqdefault.jpg",
            youtubeId: "_4QC2ESvE3E",
        },
        {
            id: 10,
            thumbnail: "https://img.youtube.com/vi/d6l5iBGDJC8/hqdefault.jpg",
            youtubeId: "d6l5iBGDJC8",
        },
        {
            id: 11,
            thumbnail: "https://img.youtube.com/vi/lWXV3YUHuQY/hqdefault.jpg",
            youtubeId: "lWXV3YUHuQY",
        },
        {
            id: 12,
            thumbnail: "https://img.youtube.com/vi/DaeU7nJzTDg/hqdefault.jpg",
            youtubeId: "DaeU7nJzTDg",
        },
    ];

    const handleVideoClick = (youtubeId) => {
        window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
    };

    return (
        <section
            className="py-12 md:py-16 bg-gradient-to-br from-white via-gray-50 to-panacea-light/20"
            dir={isRTL ? "rtl" : "ltr"}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className={`text-center mb-12 md:mb-16 ${isRTL ? "rtl" : "ltr"}`}>
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                            {t("badge") || "Real Stories"}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Video Thumbnails Grid - One Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 max-w-7xl mx-auto mb-12">
                    {videos.slice(0, 4).map((video) => (
                        <div
                            key={video.id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                            onClick={() => handleVideoClick(video.youtubeId)}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title || "Patient Story"}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 bg-panacea-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <button
                        onClick={() => {
                            const element = document.getElementById('testimonials');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-panacea-primary text-white rounded-full font-semibold hover:bg-panacea-dark transition-all duration-300 shadow-lg hover:glare-effect"
                    >
                        {t("viewAll")}
                    </button>
                </div>
            </div>
        </section>
    );
}

