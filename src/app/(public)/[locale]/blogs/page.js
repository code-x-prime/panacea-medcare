import { getMessages } from "@/lib/getMessages";
import BlogsContent from "./BlogsContent";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "blog");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `https://www.panaceamedcare.com/${locale}/blogs`,
            languages: {
                "en": "https://www.panaceamedcare.com/en/blogs",
                "fr": "https://www.panaceamedcare.com/fr/blogs",
                "ar": "https://www.panaceamedcare.com/ar/blogs",
            },
        },
    };
}

export default function BlogsPage({ params }) {
    return <BlogsContent locale={params.locale} />;
}
