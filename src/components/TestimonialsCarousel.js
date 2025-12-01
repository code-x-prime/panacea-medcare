"use client";

import { useEffect, useState } from "react";
import { FaStar, FaPlay } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function TestimonialsCarousel() {
    const [testimonials, setTestimonials] = useState([]);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch testimonials
                const testimonialsRes = await fetch('/api/testimonials');
                if (testimonialsRes.ok) {
                    const data = await testimonialsRes.json();
                    setTestimonials(data.filter(t => t.isVisible));
                }

                // Fetch autoplay setting
                const settingsRes = await fetch('/api/settings/public');
                if (settingsRes.ok) {
                    const settings = await settingsRes.json();
                    setAutoplayEnabled(settings.autoplayEnabled);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    const plugins = autoplayEnabled ? [Autoplay({ delay: 2000 })] : [];
    const showNavigation = testimonials.length > 3;

    return (
        <section className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Patient Testimonials
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from our satisfied patients about their experiences with Panacea MedCare
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative max-w-7xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={plugins}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {showNavigation && (
                            <>
                                <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-white hover:bg-panacea-primary hover:text-white border-2 border-panacea-primary" />
                                <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-white hover:bg-panacea-primary hover:text-white border-2 border-panacea-primary" />
                            </>
                        )}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial }) {
    const [showVideo, setShowVideo] = useState(false);

    const hasMedia = testimonial.image || testimonial.videoUrl;
    const videoId = testimonial.videoUrl?.includes('embed/')
        ? testimonial.videoUrl.split('embed/')[1]
        : null;

    return (
        <div className="group h-full">
            {/* Gradient Border Card */}
            <div className="relative bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 rounded-3xl p-[3px] h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <div className="bg-white rounded-3xl p-6 h-full flex flex-col">
                    {/* Media Section */}
                    {hasMedia && (
                        <div className="mb-4 relative">
                            {showVideo && videoId ? (
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                        title="Testimonial Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                                    {testimonial.image ? (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name || "Patient"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-panacea-primary to-panacea-dark">
                                            <span className="text-white text-5xl font-bold">
                                                {testimonial.name?.charAt(0) || "?"}
                                            </span>
                                        </div>
                                    )}

                                    {/* Play Button Overlay for Videos */}
                                    {testimonial.videoUrl && !showVideo && (
                                        <button
                                            onClick={() => setShowVideo(true)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all group"
                                        >
                                            <div className="bg-panacea-accent rounded-full p-5 group-hover:scale-110 transition-transform shadow-2xl">
                                                <FaPlay className="w-6 h-6 text-white ml-1" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Name and Title */}
                    <div className="mb-3">
                        <h3 className="font-bold text-lg text-panacea-dark mb-1 line-clamp-1">
                            {testimonial.name || "Patient Testimonial"}
                        </h3>
                        {testimonial.location && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MdLocationOn className="w-4 h-4 text-panacea-primary" />
                                <span>{testimonial.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`w-4 h-4 ${i < (testimonial.rating || 5)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Description */}
                    {testimonial.description && (
                        <p className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-3">
                            "{testimonial.description}"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
