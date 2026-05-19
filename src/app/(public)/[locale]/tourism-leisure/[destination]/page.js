import { siteUrl, alternateLanguages } from "@/lib/locale/routing";
import DestinationContent from "./DestinationContent";
import { destinations, getDestinationData } from "@/data/destinationsData";

export function generateStaticParams() {
    return Object.keys(destinations).map((destination) => ({ destination }));
}

export async function generateMetadata({ params: { locale, destination } }) {
    const dest = getDestinationData(destination, locale);

    return {
        title: dest.title,
        description: dest.description,
        alternates: {
            canonical: siteUrl(locale, `/tourism-leisure/${destination}`),
            languages: alternateLanguages(`/tourism-leisure/${destination}`),
        },
        openGraph: {
            title: dest.title,
            description: dest.description,
            url: `${siteUrl(locale, `/tourism-leisure/${destination}`)}`,
            type: "website",
            images: [
                {
                    url: dest.image,
                    width: 1200,
                    height: 630,
                    alt: dest.title,
                },
            ],
        },
    };
}

export default function DestinationPage({ params }) {
    return <DestinationContent locale={params.locale} destination={params.destination} />;
}
