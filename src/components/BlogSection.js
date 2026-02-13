
import BlogCarousel from "./BlogCarousel";

async function getPosts() {
    try {
        const res = await fetch(
            "https://blog.panaceamedcare.com/wp-json/wp/v2/posts?_embed&per_page=6",
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            console.error("Failed to fetch blog posts:", res.status);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
}

export default async function BlogSection({ locale }) {
    const posts = await getPosts();

    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-panacea-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-panacea-accent/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 xl:max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-panacea-primary font-bold tracking-wider uppercase text-sm mb-3 block">
                            Health & Insights
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            Latest from Our Blog
                        </h2>
                        <p className="text-lg text-gray-600">
                            Expert medical advice, health tips, and success stories curated just for you.
                        </p>
                    </div>

                    <a
                        href="https://blog.panaceamedcare.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 text-panacea-primary font-bold hover:text-panacea-dark transition-colors"
                    >
                        View All Articles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <BlogCarousel posts={posts} locale={locale} />

                <div className="mt-8 text-center md:hidden">
                    <a
                        href="https://blog.panaceamedcare.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-panacea-primary font-bold hover:text-panacea-dark transition-colors"
                    >
                        View All Articles
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
