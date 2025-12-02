"use client";

import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

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
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
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

    const plugins = autoplayEnabled ? [Autoplay({ delay: 4000, stopOnInteraction: false })] : [];
    const showNavigation = testimonials.length > 2;

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-panacea-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-panacea-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <p className="text-panacea-accent font-semibold mb-3 tracking-wide uppercase text-sm">
                        Testimonials
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-panacea-dark mb-4">
                        What our patients say
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Hear from our satisfied patients about their experiences with Panacea MedCare
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={plugins}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {showNavigation && (
                            <>
                                <CarouselPrevious className="hidden lg:flex -left-6 bg-white hover:bg-panacea-primary hover:text-white border-2 border-gray-200 hover:border-panacea-primary shadow-lg transition-all" />
                                <CarouselNext className="hidden lg:flex -right-6 bg-white hover:bg-panacea-primary hover:text-white border-2 border-gray-200 hover:border-panacea-primary shadow-lg transition-all" />
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

    const videoId = testimonial.videoUrl?.includes('embed/')
        ? testimonial.videoUrl.split('embed/')[1]?.split('?')[0]
        : null;

    // Layout with video on left, details on right
    if (testimonial.videoUrl && videoId) {
        return (
            <div className="group h-full">
                <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                    {/* Video Section - Left Side */}
                    <div className="relative md:w-2/5 flex-shrink-0 bg-gray-900">
                        <div className="aspect-video md:aspect-auto md:h-full relative">
                            {/* Embedded Video */}
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0`}
                                title="Video testimonial preview"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                className="w-full h-full absolute inset-0"
                            ></iframe>

                            {/* Play Button Overlay */}
                            <button
                                onClick={() => setShowVideo(true)}
                                className="absolute inset-0 flex items-center justify-center group/play bg-black/30 hover:bg-black/50 transition-all duration-300"
                                aria-label="Play video"
                            >
                                <div className="w-16 h-16 bg-panacea-accent rounded-full flex items-center justify-center shadow-2xl transform group-hover/play:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Details Section - Right Side */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4 text-panacea-accent/10">
                            <FaQuoteLeft className="w-10 h-10" />
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-4 relative z-10">
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
                        <div className="flex-1 mb-6 relative z-10">
                            {testimonial.description ? (
                                <p className="text-gray-700 leading-relaxed italic line-clamp-4">
                                    "{testimonial.description}"
                                </p>
                            ) : (
                                <p className="text-gray-400 italic">No description provided</p>
                            )}
                        </div>

                        {/* Author Section */}
                        <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                {testimonial.image ? (
                                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-panacea-primary/20">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name || "Patient"}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-panacea-primary to-panacea-dark text-white flex items-center justify-center font-bold text-lg ring-2 ring-panacea-primary/20">
                                        {testimonial.name?.charAt(0) || "?"}
                                    </div>
                                )}
                            </div>

                            {/* Name and Location */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-panacea-dark truncate">
                                    {testimonial.name || "Anonymous"}
                                </h4>
                                {testimonial.location && (
                                    <div className="flex items-center gap-1 text-sm text-panacea-accent mt-1">
                                        <MdLocationOn className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{testimonial.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Video Modal */}
                    {showVideo && (
                        <div
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                            onClick={() => setShowVideo(false)}
                        >
                            <div
                                className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                    title="Testimonial Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default layout for testimonials without video
    return (
        <div className="group h-full">
            <div className="bg-white rounded-2xl p-8 h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-panacea-accent/10">
                    <FaQuoteLeft className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex gap-1">
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
                </div>

                {/* Description */}
                <div className="flex-1 mb-6 relative z-10">
                    {testimonial.description ? (
                        <p className="text-gray-700 leading-relaxed italic">
                            "{testimonial.description}"
                        </p>
                    ) : (
                        <p className="text-gray-400 italic">No description provided</p>
                    )}
                </div>

                {/* Author Section */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        {testimonial.image ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-panacea-primary/20">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name || "Patient"}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-panacea-primary to-panacea-dark text-white flex items-center justify-center font-bold text-xl ring-2 ring-panacea-primary/20">
                                {testimonial.name?.charAt(0) || "?"}
                            </div>
                        )}
                    </div>

                    {/* Name and Location */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-panacea-dark truncate">
                            {testimonial.name || "Anonymous"}
                        </h4>
                        {testimonial.location && (
                            <div className="flex items-center gap-1 text-sm text-panacea-accent mt-1">
                                <MdLocationOn className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{testimonial.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
