"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function BlogCarousel({ posts, locale }) {
    const t = useTranslations("common"); // Assuming 'common' has some generic keys, if not fallback

    if (!posts || posts.length === 0) {
        return null;
    }

    const plugins = [Autoplay({ delay: 5000, stopOnInteraction: true })];

    return (
        <div className="relative group">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={plugins}
                className="w-full"
            >
                <CarouselContent className="-ml-6">
                    {posts.map((post) => {
                        const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder-blog.png";
                        const date = new Date(post.date);

                        return (
                            <CarouselItem key={post.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                <Link
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full group/card"
                                >
                                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={post.title.rendered}
                                                fill
                                                className="object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Date */}
                                            <div className="flex items-center text-sm text-panacea-primary mb-3 font-medium">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <time dateTime={post.date}>
                                                    {format(date, 'MMMM d, yyyy')}
                                                </time>
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover/card:text-panacea-primary transition-colors"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />

                                            {/* Excerpt */}
                                            <div
                                                className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />

                                            {/* Read More */}
                                            <div className="flex items-center text-panacea-primary font-bold group-hover/card:translate-x-2 transition-transform duration-300 mt-auto">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-2 mt-8 md:absolute md:-top-16 md:right-0">
                    <CarouselPrevious className="static md:static translate-y-0 bg-white hover:bg-panacea-primary hover:text-white border border-gray-200" />
                    <CarouselNext className="static md:static translate-y-0 bg-white hover:bg-panacea-primary hover:text-white border border-gray-200" />
                </div>
            </Carousel>
        </div>
    );
}
