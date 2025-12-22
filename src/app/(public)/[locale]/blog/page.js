"use client";

import TopBanner from "@/components/TopBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

export default function BlogPage({ params }) {
    const { locale } = params;
    const isRTL = locale === "ar";
    const t = useTranslations("blog");

    // Sample blog posts - in production, this would come from a data file
    const blogPosts = [
        {
            id: "1",
            title: t("post1Title") || "Understanding Medical Tourism: A Complete Guide",
            excerpt: t("post1Excerpt") || "Learn everything you need to know about medical tourism and how it can benefit you.",
            category: t("categoryTravelTips") || "Medical Travel Tips",
            author: "Dr. Sarah Johnson",
            date: "2024-01-15",
            thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop"
        },
        {
            id: "2",
            title: t("post2Title") || "Cancer Care in India: Advanced Treatment Options",
            category: t("categoryCancerCare") || "Cancer Care",
            excerpt: t("post2Excerpt") || "Explore the latest cancer treatment options available in India's top hospitals.",
            author: "Dr. Rajesh Kumar",
            date: "2024-01-10",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
        },
        {
            id: "3",
            title: t("post3Title") || "Orthopedic Surgery: What to Expect",
            category: t("categoryOrthopedics") || "Orthopedics",
            excerpt: t("post3Excerpt") || "A comprehensive guide to orthopedic procedures and recovery.",
            author: "Dr. Michael Chen",
            date: "2024-01-05",
            thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop"
        }
    ];

    const categories = [
        { name: t("categoryCancerCare") || "Cancer Care", slug: "cancer-care" },
        { name: t("categoryOrthopedics") || "Orthopedics", slug: "orthopedics" },
        { name: t("categoryCardiology") || "Cardiology", slug: "cardiology" },
        { name: t("categoryTravelTips") || "Medical Travel Tips", slug: "travel-tips" }
    ];

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="blog"
                variant="gradient"
                size="md"
            />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* Categories */}
                <div className="mb-12">
                    <div className={`flex flex-wrap gap-3 justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/${locale}/blog?category=${category.slug}`}
                                className="px-6 py-2 bg-panacea-light hover:bg-panacea-primary text-panacea-primary hover:text-white rounded-full font-semibold transition-all duration-300"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/${locale}/blog/${post.id}`}
                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-panacea-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`p-6 ${isRTL ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-panacea-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta */}
                                <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
