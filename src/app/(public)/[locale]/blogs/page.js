import { getMessages } from "@/lib/getMessages";
import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import BlogsContent from "./BlogsContent";

export async function generateMetadata({ params }) {
    const { locale } = params;
    const messages = await getMessages(locale, "blog");

    return {
        title: messages.seo?.title,
        description: messages.seo?.description,
        alternates: {
            canonical: `${siteUrl(locale, `/blogs`)}`,
            languages: alternateLanguages("/blogs"),
        },
    };
}

export default function BlogsPage({ params }) {
    return <BlogsContent locale={params.locale} />;
}
