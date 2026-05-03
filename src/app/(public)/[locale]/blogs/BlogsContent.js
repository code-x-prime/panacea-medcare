import TopBanner from "@/components/TopBanner";
import BlogSection from "@/components/BlogSection";
import { getTranslations } from "next-intl/server";

export default async function BlogsContent({ locale }) {
    const t = await getTranslations({ locale, namespace: 'blog' });
    const isRTL = locale === "ar";

    return (
        <main dir={isRTL ? "rtl" : "ltr"}>
            <TopBanner
                locale={locale}
                namespace="blog"
                variant="gradient"
                size="md"
            />

            <div className="py-8">
                <BlogSection locale={locale} />
            </div>

            <section className="container mx-auto px-4 xl:max-w-7xl sm:px-6 lg:px-8 py-12">
                <div className="bg-panacea-primary/5 rounded-2xl p-8 md:p-12 text-center border-2 border-panacea-primary/20">
                    <h2 className="text-3xl font-bold text-panacea-dark mb-4">
                        Looking for more?
                    </h2>
                    <p className="text-lg text-panacea-gray mb-8 max-w-2xl mx-auto">
                        Visit our official blog for more in-depth articles, patient stories, and medical guides.
                    </p>
                    <a
                        href="https://www.panaceamedcare.com/blog/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-panacea-primary text-white font-bold py-3 px-8 rounded-full hover:bg-panacea-dark transition-all shadow-lg hover:shadow-xl"
                    >
                        Visit WordPress Blog
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}
