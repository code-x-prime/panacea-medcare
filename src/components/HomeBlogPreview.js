"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function HomeBlogPreview({ locale }) {
  const t = useTranslations("blog");
  const isRTL = locale === "ar";

  const posts = [
    {
      id: "1",
      title: t("post1Title"),
      excerpt: t("post1Excerpt"),
      category: t("categoryTravelTips"),
      date: "2024-01-15",
      thumbnail:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",
    },
    {
      id: "2",
      title: t("post2Title"),
      excerpt: t("post2Excerpt"),
      category: t("categoryCancerCare"),
      date: "2024-01-10",
      thumbnail:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع المقالات" : "View all articles"}</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-panacea-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </div>
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"} p-5`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-panacea-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div
                  className={`flex items-center gap-2 text-xs text-gray-500 ${isRTL ? "flex-row-reverse" : ""
                    }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-panacea-primary text-white font-semibold hover:bg-panacea-dark transition-all"
          >
            <span>{isRTL ? "عرض جميع المقالات" : "View all articles"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
