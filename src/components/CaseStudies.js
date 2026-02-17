"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link"; // Kept for potential future use

export default function CaseStudies() {
    const t = useTranslations("caseStudies");
    const [stories, setStories] = useState([]);

    useEffect(() => {
        // Constructing stories array from translations
        const loadedStories = [
            {
                id: "asfachew",
                name: t("stories.0.name"),
                location: t("stories.0.location"),
                title: t("stories.0.title"),
                image: "/case/mr-asfachew-2.jpeg",
                summary: t("stories.0.summary"),
                challenge: t("stories.0.challenge"),
                solution: t("stories.0.solution"),
                outcome: t("stories.0.outcome"),
            },
            {
                id: "peter",
                name: t("stories.1.name"),
                location: t("stories.1.location"),
                title: t("stories.1.title"),
                image: "/case/rr-asfachew.jpeg",
                summary: t("stories.1.summary"),
                challenge: t("stories.1.challenge"),
                solution: t("stories.1.solution"),
                outcome: t("stories.1.outcome"),
            }
        ];
        setStories(loadedStories);
    }, [t]);

    const plugin = Autoplay({ delay: 5000, stopOnInteraction: true });

    if (!stories.length) return null;

    return (
        <section className="py-8 md:py-12 bg-white overflow-hidden">
            {/* Forced LTR for the carousel structure itself if needed, or handle RTL classes properly.
                However, usually keeping the SECTION direction dynamic is better, but handling inner alignment manually.
                Let's use logical properties instead of forcing dir.
             */}

            {/* Actually, for Shadcn Carousel, mixing directions can be tricky.
                Let's try to stick to RTL specific classes.
             */}

            <div className="container mx-auto px-4 xl:max-w-7xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <p className="text-panacea-accent font-semibold mb-3 tracking-wide uppercase text-sm">
                        {t('title')}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-panacea-dark mb-6">
                        {t('subtitle')}
                    </h2>
                    <div className="w-24 h-1 bg-panacea-primary mx-auto rounded-full"></div>
                </div>

                {/* Carousel */}
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        direction: document.dir === 'rtl' ? 'rtl' : 'ltr', // Try to pass direction if possible, though strict mode issues might occur.
                        // Safest to just rely on CSS and standard behavior.
                    }}
                    plugins={[plugin]}
                    className="w-full relative"
                >
                    <CarouselContent className="-ml-4 rtl:-mr-4 rtl:ml-0">
                        {stories.map((story) => (
                            <CarouselItem key={story.id} className="pl-4 rtl:pr-4 rtl:pl-0 basis-full">
                                <div className="bg-panacea-light rounded-3xl overflow-hidden shadow-panacea hover:shadow-panacea-lg transition-all duration-300 border border-gray-100">
                                    <div className="flex flex-col lg:flex-row min-h-[500px]">
                                        {/* Image Section */}
                                        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                                            <Image
                                                src={story.image}
                                                alt={story.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10 rtl:lg:bg-gradient-to-l"></div>

                                            {/* Text Overlay on Image */}
                                            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-white z-10 drop-shadow-md">
                                                <div className="flex items-center gap-2 text-sm font-medium bg-panacea-accent/90 px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                                                    <MdLocationOn />
                                                    {story.location}
                                                </div>
                                                <h3 className="text-2xl font-bold">{story.name}</h3>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left rtl:text-right">
                                            <FaQuoteLeft className="text-4xl text-panacea-primary/20 mb-6 rtl:scale-x-[-1]" />
                                            {/* rtl:flip-x isn't standard tailwind, maybe scale-x-[-1] */}

                                            <h3 className="text-2xl md:text-3xl font-bold text-panacea-dark mb-4 leading-tight">
                                                {story.title}
                                            </h3>

                                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                                {story.summary}
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200/60">
                                                <div>
                                                    <h4 className="font-bold text-panacea-primary mb-2 text-sm uppercase tracking-wider">{t('diagnosisTitle')}</h4>
                                                    <p className="text-sm text-gray-600">{story.challenge}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-panacea-primary mb-2 text-sm uppercase tracking-wider">{t('outcomeTitle')}</h4>
                                                    <p className="text-sm text-gray-600">{story.outcome}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-center gap-4 mt-8">
                        <CarouselPrevious className="static translate-y-0 bg-white border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white" />
                        <CarouselNext className="static translate-y-0 bg-white border-panacea-primary text-panacea-primary hover:bg-panacea-primary hover:text-white" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
