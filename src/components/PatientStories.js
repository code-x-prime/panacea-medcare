"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play } from "lucide-react";

export default function PatientStories({ locale }) {
    const t = useTranslations("patientStories");
    const isRTL = locale === "ar";

    // Placeholder YouTube video data - client will provide actual links later
    const videos = [
        {
            id: 1,
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            title: t("video1Title") || "Patient Success Story 1",
            youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual IDs
        },
        {
            id: 2,
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            title: t("video2Title") || "Patient Success Story 2",
            youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual IDs
        },
        {
            id: 3,
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            title: t("video3Title") || "Patient Success Story 3",
            youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual IDs
        },
        {
            id: 4,
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            title: t("video4Title") || "Patient Success Story 4",
            youtubeId: "dQw4w9WgXcQ", // Placeholder - replace with actual IDs
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
                        {t("title") || "Patient Stories"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle") || "Hear from our patients about their medical journey"}
                    </p>
                </div>

                {/* Video Thumbnails Grid - One Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                            onClick={() => handleVideoClick(video.youtubeId)}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
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

                            {/* Video Title */}
                            <div className={`p-4 ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-panacea-primary transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

